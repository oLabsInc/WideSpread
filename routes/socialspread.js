const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
// const { ensureAuthenticated } = require('../config/auth');
const connectEnsureLogin = require('connect-ensure-login')
const ensureAuthenticated = connectEnsureLogin.ensureLoggedIn({ redirectTo: '/users/login' })

const axios = require('axios')



/* Models */
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const Spread = require('../models/Spread');
const Company = require('../models/Company');
const SpreadChat = require('../models/SpreadChat');
const UserAudio = require('../models/UserAudio');



router.get('/', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id
    const userSpreadChats = await SpreadChat.find({ 'user_list': { $in: req.user.id.split(',') } },
        function (err, userSpreadChats) {
            // console.log("User: " + userSpreadChats);
        }).populate('user_list').exec()
    const comments = await Comment.find().populate('author').exec()
    const user = await User.findById(userId).populate('friends').populate('author').exec()
    const audioSpreads = await Spread.find({ spread_type: 'audio' }).populate('audio_post').sort({ createdAt: "descending" }).exec()
    const spreads = await Spread.find().populate(['author', 'audio_post']).sort({ createdAt: "descending" }).exec()
    res.render('socialspread/home', { subZone: "Home", zone: 'SocialSpread', user, spreads, audioSpreads, userSpreadChats, comments })
});







router.get('/view/:spreadId', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id
    const user = await User.findById(userId).populate('spread_notifications.from').exec()
    const spreadId = req.params.spreadId
    const spread = await Spread.findById(spreadId).populate('author').exec()
    const comments = await Comment.find().populate('author').exec()
    const allSpreads = await Spread.find().populate('video_ref').exec()
    console.log('\n\n\nspread: ', spread)
    res.render('socialspread/single', { subZone: "SingleSpread", zone: 'SocialSpread', user, spread, comments, allSpreads })
})

router.get('/data/:spreadId', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id
    const user = await User.findById(userId).populate('friends').populate('author').exec()
    const spreadId = req.params.spreadId
    const spread = await Spread.findById(spreadId).populate('author').exec()
    res.json(spread)
})


router.get('/business', ensureAuthenticated, async (req, res) => {
    const companies = await Company.find()
    const userSpreadChats = await SpreadChat.find({ 'user_list': { $in: req.user.id.split(',') } },
        function (err, userSpreadChats) {
            // console.log("User: " + userSpreadChats);
        }).populate('user_list').exec()
    const spreads = await Spread.find().populate('author').exec()
    res.render('socialspread/business', { subZone: "Business", zone: 'SocialSpread', subZonePage: 'Home', companies, spreads, userSpreadChats })
});

router.post('/social/spread-it', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id
    console.log(userId)
    const spreadData = req.body
    console.log(spreadData)

    const newSpread = new Spread({
        author: req.user.id,
        spread_type: 'generic',
        generic_spread: req.body
    })
    newSpread.save()

    res.redirect('/socialspread')
})


// Original Spread Post ID
// `/socialspread/social/spread-it/comment/6346f9b582731a00160f5206`
// Spread ID For Comment 
// `/socialspread/social/spread-it/comment/6346f9b582731a00160f5206`
router.post('/social/spread-it/comment/:spreadId', ensureAuthenticated, async (req, res) => {
    const spreadId = req.params.spreadId
    const userId = req.user.id
    console.log(userId)
    const spreadData = req.body
    console.log(spreadData)

    const originalSpread = await Spread.findById(spreadId).populate('author').exec()
    
    const newSpread = new Comment({
        author: req.user.id,
        commentBody: spreadData.commentBody,
        fromPost: spreadId
    })
    newSpread.save()

    const originalSpreaderId = originalSpread.author.id

    // const fromUser = toString(newSpread.author)
    // const spreadIdString = toString(spreadId)

    const fromUser = newSpread.author
    const spreadIdString = spreadId

    const notificationData = {
        spread_type: 'Comment',
        from: fromUser,
        spread_id: spreadId
    }
    console.log('notificationData: ', notificationData)

    await User.findByIdAndUpdate(originalSpreaderId,
        { $addToSet: { spread_notifications: notificationData } },
        { safe: true, upsert: true },
        function (err, doc) {
            if (err) {
                console.log(err);
            } else {

                console.log(doc)
            }
        })


    res.redirect('/socialspread')
})
router.get('/social/spread/:spreadId/delete', ensureAuthenticated, async (req, res) => {
    const spreadId = req.params.spreadId
    await Spread.findByIdAndDelete(spreadId)
    res.redirect('/socialspread')
})
router.post('/business/spread-it', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id
    console.log(userId)
    const spreadData = req.body
    console.log(spreadData)

    const newSpread = new Spread({
        author: req.user.id,
        spread_type: 'generic',
        generic_spread: req.body
    })
    newSpread.save()

    res.redirect('/socialspread/business')
    
})

router.get('/music/share/:songId', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id
    console.log(userId)
    const songId = req.params.songId
    const spreadData = req.body
    console.log(spreadData)

    const newSpread = new Spread({
        author: req.user.id,
        spread_type: 'audio',
        audio_post: songId
    })
    newSpread.save()

    res.redirect('/entertainment/audio/music')
    
})

router.post('/movies/share', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id
    console.log(userId)
    const spreadData = req.body
    console.log(spreadData)

    const newSpread = new Spread({
        author: req.user.id,
        spread_type: 'video',
        'video_post.spread_movie.title': spreadData.title,
        'video_post.spread_movie.genres': spreadData.genres,
        'video_post.spread_movie.director': spreadData.director,
        'video_post.spread_movie.cast': spreadData.cast,
        'video_post.spread_movie.rated': spreadData.rated,
        'video_post.spread_movie.plot': spreadData.plot,
        'video_post.spread_movie.year': spreadData.year,
        'video_post.spread_movie.runtime': spreadData.runtime,
        'video_post.spread_movie.poster': spreadData.poster,
        'video_post.spread_movie.imdb_id': spreadData.imdb_id,
    })
    newSpread.save()

    res.redirect(`/entertainment/photos/movies/add-photos/${newSpread.video_post.spread_movie.imdb_id}/${newSpread.id}`)
    
})
// /movies/add-photos
router.patch('/movies/add-photos/:spreadId', ensureAuthenticated, async (req, res) => {
    const spreadId = req.params.spreadId

    const moviePhotos = req.body.movie_photos

    await Spread.findByIdAndUpdate(spreadId,
        {
            $addToSet: {
                "video_post.spread_movie.movie_photos": moviePhotos
            }
        },
        { multi: true }, function (err, result) {
            console.log(result)
        }
    )
    const spread = await Spread.findById(spreadId)
    const movieTitle = spread.video_post.spread_movie.title
    const movieTitleToString = movieTitle.replace(/\s/g, '+')
    res.redirect(`/entertainment/movies/title/${movieTitleToString}`)
})

router.get('/news', async (req, res) => {
    if (!req.user) {
        const userSpreadChats = null
        const searchTerm = 'News'
        const options = {
            method: 'GET',
            url: 'https://newscatcher.p.rapidapi.com/v1/search_free',
            params: { q: `${searchTerm}`, lang: 'en', media: 'True', page_size: 100 },
            headers: {
                'x-rapidapi-host': 'newscatcher.p.rapidapi.com',
                'x-rapidapi-key': '7e45ec5e4fmsh4f3dac417f9eaa7p179a33jsnbfe4cb2e4c79'
            }
        };

        axios.request(options).then(function (response) {
            const returnedData = response.data;
            res.render('socialspread/news', { subZone: "News", zone: 'SocialSpread', subZonePage: 'Home', returnedData, userSpreadChats })

        }).catch(function (error) {
            console.error(error);
        });
    } else {
        const userSpreadChats = await SpreadChat.find({ 'user_list': { $in: req.user.id.split(',') } },
            function (err, userSpreadChats) {
                // console.log("User: " + userSpreadChats);
            }).populate('user_list').exec()
            const searchTerm = 'News'
            const options = {
                method: 'GET',
                url: 'https://newscatcher.p.rapidapi.com/v1/search_free',
                params: { q: `${searchTerm}`, lang: 'en', media: 'True', page_size: 100 },
                headers: {
                    'x-rapidapi-host': 'newscatcher.p.rapidapi.com',
                    'x-rapidapi-key': '7e45ec5e4fmsh4f3dac417f9eaa7p179a33jsnbfe4cb2e4c79'
                }
            };
        
            axios.request(options).then(function (response) {
                const returnedData = response.data;
                res.render('socialspread/news', { subZone: "News", zone: 'SocialSpread', subZonePage: 'Home', returnedData, userSpreadChats })
        
            }).catch(function (error) {
                console.error(error);
            });
    }



    
});

router.get('/hobbies', async (req, res) => {
    if (req.user) {
        const userSpreadChats = await SpreadChat.find({ 'user_list': { $in: req.user.id.split(',') } },
            function (err, userSpreadChats) {
                // console.log("User: " + userSpreadChats);
            }).populate('user_list').exec()
    } else {
        const userSpreadChats = null
    }
    
    res.render('socialspread/hobbies', { subZone: "Hobbies", zone: 'SocialSpread', subZonePage: 'Home', userSpreadChats })
});

router.get('/learning', async (req, res) => {
    if (req.user) {
        const userSpreadChats = await SpreadChat.find({ 'user_list': { $in: req.user.id.split(',') } },
            function (err, userSpreadChats) {
                // console.log("User: " + userSpreadChats);
            }).populate('user_list').exec()
    } else {
        const userSpreadChats = null
    }

    res.render('socialspread/learning', { subZone: "Learning", zone: 'SocialSpread', subZonePage: 'Home', userSpreadChats })
});

/* HELP */

router.get('/help', async (req, res) => {
    if (!req.user) {
        const userSpreadChats = null
        res.render('socialspread/help', { subZone: "Help", zone: 'SocialSpread', subZonePage: 'Home', userSpreadChats })
    } else {
        const userSpreadChats = await SpreadChat.find({ 'user_list': { $in: req.user.id.split(',') } },
        function (err, userSpreadChats) {
            // console.log("User: " + userSpreadChats);
        }).populate('user_list').exec()
        
        res.render('socialspread/help', { subZone: "Help", zone: 'SocialSpread', subZonePage: 'Home', userSpreadChats })
    }
});




module.exports = router;