const express = require('express');
const router = express.Router();
// const { ensureAuthenticated } = require('../config/auth');
const connectEnsureLogin = require('connect-ensure-login')
const ensureAuthenticated = connectEnsureLogin.ensureLoggedIn({ redirectTo: '/users/login' })

const axios = require('axios');

/* Models */
const User = require('../models/User');
const UserAudio = require('../models/UserAudio');
const Movie = require('../models/Movie');
const Show = require('../models/Show');
const MusicPlaylist = require('../models/MusicPlaylist');
const SpreadChat = require('../models/SpreadChat');
const Spread = require('../models/Spread');
const Comment = require('../models/Comment');
const UserVideo = require('../models/UserVideo');


router.get('/', ensureAuthenticated, async (req, res) => {
    const user = req.user
    const userSpreadChats = await SpreadChat.find({ 'user_list': { $in: req.user.id.split(',') } },
        function (err, userSpreadChats) {
            // console.log("User: " + userSpreadChats);
        }).populate('user_list').exec()
    res.render('entertainment/home', { subZone: "Home", zone: 'Entertainment', userSpreadChats, user})
});





/* TV */

router.get('/tv', ensureAuthenticated, async (req, res) => {
    const shows = await Show.find()
    const userId = req.user.id;
    const userSpreadChats = await SpreadChat.find({ 'user_list': { $in: userId.split(',') } },
        function (err, userSpreadChats) {
            // console.log("User: " + userSpreadChats);
        }).populate(['user_list', 'conversation.sent_by']).exec()
    console.log(userSpreadChats)
    console.log(shows)
    const apiKey = process.env.TMDB_API_KEY
    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`
    };

    axios.request(options).then(function (response) {
        const returnedData = response.data.results;
        res.render('entertainment/tv/home', { subZone: "TV", zone: 'Entertainment', subZonePage: 'Home', returnedData, shows, userSpreadChats });
    }).catch(function (error) {
        console.error(error);
    });
});



/* ADD TV SHOW TO USER LIST*/


router.post('/tv/save', ensureAuthenticated, async (req, res) => {
    const user = req.user._id;
    const showLink = req.body.link;
    const showName = req.body.name;
    const showPoster = req.body.poster;
    await User.findByIdAndUpdate(user,
        { $addToSet: { show_list: { show_link: showLink, show_name: showName, show_poster: showPoster } } },
    )
    res.redirect(`/entertainment/tv/show/${showLink}`)
});



/* ADD TV SHOW TO WIDESPREAD LIST*/


router.post('/tv/add-to-recommended', ensureAuthenticated, (req, res) => {
    const showString = req.body.name;
    const convertedString = showString.replace(/\s/g, '+');
    const show = new Show({
        name: showString,
        link: req.body.link,
        poster: req.body.poster,
    })
    show.save()
    res.redirect('/entertainment/tv');
});

/* TV SEARCH */


router.post('/tv/search', (req, res) => {
    const showString = req.body.show;
    const convertedString = showString.replace(/\s/g, '+')
    res.redirect(`/entertainment/tv/search/${convertedString}`);
});

router.get('/tv/search/:show', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id;
    const userSpreadChats = await SpreadChat.find({ 'user_list': { $in: userId.split(',') } },
        function (err, userSpreadChats) {
            // console.log("User: " + userSpreadChats);
        }).populate(['user_list', 'conversation.sent_by']).exec()
    console.log(userSpreadChats)
    const show = req.params.show;
    const convertedString = show.split('+').join(' ');
    const apiKey = process.env.TMDB_API_KEY
    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${show}`
    };

    axios.request(options).then(function (response) {
        const returnedData = response.data;
        console.log(returnedData)
        res.render('entertainment/tv/search-results', { returnedData, show, convertedString, userSpreadChats });
    }).catch(function (error) {
        console.error(error);
    });

});





/* SHOW MAIN */

router.get('/tv/show/:showId', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id;
    const userSpreadChats = await SpreadChat.find({ 'user_list': { $in: userId.split(',') } },
        function (err, userSpreadChats) {
            // console.log("User: " + userSpreadChats);
        }).populate(['user_list', 'conversation.sent_by']).exec()
    console.log(userSpreadChats)
    console.log(userId)
    const showId = req.params.showId;
    const apiKey = process.env.TMDB_API_KEY
    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/tv/${showId}?api_key=${apiKey}`
    };

    axios.request(options).then(function (response) {
        const returnedData = response.data;
        const showName = returnedData.name;
        console.log(returnedData)
        res.render('entertainment/tv/show', { subZone: "TV", zone: 'Entertainment', subZonePage: showName, returnedData, showId, userId, userSpreadChats });
    }).catch(function (error) {
        console.error(error);
    });
})



/* SHOW SEASON */

router.get('/tv/show/:showId/:seasonId', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id;
    const userSpreadChats = await SpreadChat.find({ 'user_list': { $in: userId.split(',') } },
        function (err, userSpreadChats) {
            // console.log("User: " + userSpreadChats);
        }).populate(['user_list', 'conversation.sent_by']).exec()
    console.log(userSpreadChats)
    const showId = req.params.showId;
    const seasonId = req.params.seasonId;
    const apiKey = process.env.TMDB_API_KEY

    axios.all([
        // Show Name
        axios.get(`https://api.themoviedb.org/3/tv/${showId}?api_key=${apiKey}`),
        // Season Data
        axios.get(`https://api.themoviedb.org/3/tv/${showId}/season/${seasonId}?api_key=${apiKey}`)
    ]).then(axios.spread((showData, seasonData) => {
        console.log(showData.data.name)
        const show = showData.data;
        const showName = show.name;
        const season = seasonData.data;
        const seasonName = season.name;
        console.log(`Show: ${showName} \n \n \n \n`)
        console.log(`Season: ${season} \n \n \n \n`)
        res.render('entertainment/tv/season', { subZone: "TV", zone: 'Entertainment', subZonePage: showName, currentPage: seasonName, show, season, showId, userSpreadChats });
    }))


})



/* SHOW EPISODE */

router.get('/tv/show/:showId/:seasonId/:episodeId', ensureAuthenticated, async (req, res) => {
    const showId = req.params.showId;
    const userId = req.user.id;
    const userSpreadChats = await SpreadChat.find({ 'user_list': { $in: userId.split(',') } },
        function (err, userSpreadChats) {
            // console.log("User: " + userSpreadChats);
        }).populate(['user_list', 'conversation.sent_by']).exec()
    console.log(userSpreadChats)
    const seasonId = req.params.seasonId;
    const episodeId = req.params.episodeId;
    const apiKey = process.env.TMDB_API_KEY
    console.log('seasonId: ', seasonId)
    console.log('showId: ', showId)
    axios.all([
        // Show Name
        axios.get(`https://api.themoviedb.org/3/tv/${showId}?api_key=${apiKey}`),
        // Season Data
        axios.get(`https://api.themoviedb.org/3/tv/${showId}/season/${seasonId}?api_key=${apiKey}`),
        // Episode Data
        axios.get(`https://api.themoviedb.org/3/tv/${showId}/season/${seasonId}/episode/${episodeId}?api_key=${apiKey}`)

    ]).then(axios.spread((showData, seasonData, episodeData) => {
        console.log('showData.data.name')
        console.log(showData.data.name)
        console.log('episodeData')
        console.log(episodeData)
        const show = showData.data;
        const showName = show.name;
        const season = seasonData.data;
        const seasonName = season.name;
        const episode = episodeData.data;
        
        const videoUrl = `https://www.tmdbapi.xyz/tmdb/series/?video_id=${showId}&s=${seasonId}&e=${episodeId}&c=000000`

        console.log(`Episode: ${episode} \n \n \n \n`)
        res.render('entertainment/tv/episode', { subZone: "TV", zone: 'Entertainment', videoUrl, subZonePage: showName, currentPage: seasonName, show, showId, season, seasonId, showId, episode, episodeId, userSpreadChats });

    }))
    
})






/* MOVIES */

router.get('/movies', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id;
    const userSpreadChats = await SpreadChat.find({ 'user_list': { $in: userId.split(',') } },
        function (err, userSpreadChats) {
            // console.log("User: " + userSpreadChats);
        }).populate(['user_list', 'conversation.sent_by']).exec()
    console.log(userSpreadChats)
    const movies = await Movie.find()

    res.render('entertainment/movies/home', { subZone: "Movies", zone: 'Entertainment', subZonePage: 'Home', movies, userSpreadChats })
});

/* Movie by Category */
router.get('/category', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id;
    const userSpreadChats = await SpreadChat.find({ 'user_list': { $in: userId.split(',') } },
        function (err, userSpreadChats) {
            // console.log("User: " + userSpreadChats);
        }).populate(['user_list', 'conversation.sent_by']).exec()
    console.log(userSpreadChats)
    let genre = req.query.genre

    const movies = await Movie.find({genres: [{$eq: genre}]})
    console.log(genre, movies)
    res.render('entertainment/movies/home', { subZone: "Movies", zone: 'Entertainment', subZonePage: 'Home', movies, userSpreadChats })
});


/* Movie Search */


router.post('/movies/search', ensureAuthenticated, (req, res) => {
    const movieString = req.body.movie;
    const convertedString = movieString.replace(/\s/g, '+')
    res.redirect(`/entertainment/search/movies/${convertedString}`);
});

router.get('/search/movies/:query', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id;
    const userSpreadChats = await SpreadChat.find({ 'user_list': { $in: userId.split(',') } },
        function (err, userSpreadChats) {
            // console.log("User: " + userSpreadChats);
        }).populate(['user_list', 'conversation.sent_by']).exec()
    console.log(userSpreadChats)
    const query = req.params.query;
    console.log(query)
    const convertedString = query.split('+').join(' ');
    const apiKey = 'd3722e71'
    const options = {
        method: 'GET',
        url: `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`
    };

    axios.request(options).then(function (response) {
        const returnedData = response.data;
        console.log(returnedData)
        res.render('entertainment/movies/movie-search-results', { returnedData, convertedString, userSpreadChats });
    }).catch(function (error) {
        console.error(error);
    });
});


router.get('/movies/title/:movie', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id;
    const userSpreadChats = await SpreadChat.find({ 'user_list': { $in: userId.split(',') } },
        function (err, userSpreadChats) {
            // console.log("User: " + userSpreadChats);
        }).populate(['user_list', 'conversation.sent_by']).exec()
    console.log(userSpreadChats)
    console.log(userId)
    const movie = req.params.movie;
    const apiKey = 'd3722e71'
    const options = {
        method: 'GET',
        url: `http://www.omdbapi.com/?apikey=${apiKey}&t=${movie}`
        
    };
    axios.request(options).then(function (response) {
        const returnedData = response.data;
        console.log(returnedData)
        const videoUrl = `https://www.tmdbapi.xyz/imdb/films/?video_id=${returnedData.imdbID}&c=000000`
        res.render('entertainment/movies/title', { subZone: "Movies", zone: 'Entertainment', subZonePage: returnedData.Title, videoUrl, returnedData, movie, userId, userSpreadChats })
    }).catch(function (error) {
        console.error(error);
    });
});

router.get('/photos/movies/:imdbID', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id;
    const userSpreadChats = await SpreadChat.find({ 'user_list': { $in: userId.split(',') } },
        function (err, userSpreadChats) {
            // console.log("User: " + userSpreadChats);
        }).populate(['user_list', 'conversation.sent_by']).exec()
    console.log(userSpreadChats)
    const imdbID = req.params.imdbID;

    var options = {
        method: 'GET',
        url: 'https://imdb8.p.rapidapi.com/title/get-all-images',
        params: { tconst: imdbID },
        headers: {
            'x-rapidapi-host': 'imdb8.p.rapidapi.com',
            'x-rapidapi-key': '7e45ec5e4fmsh4f3dac417f9eaa7p179a33jsnbfe4cb2e4c79'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
        const returnedData = response.data;
        res.render('entertainment/movies/movie-info-photos', { returnedData, userSpreadChats })
    }).catch(function (error) {
        console.error(error);
    });
});


// res.redirect(`/entertainment/photos/movies/add-photos/${newSpread.video_post.spread_movie.imdb_id}/${newSpread.id}`)


router.get('/photos/movies/add-photos/:imdbID/:spreadId', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id;
    const spreadId = req.params.spreadId
    const spreadObj = await Spread.findById(spreadId)

    const userSpreadChats = await SpreadChat.find({ 'user_list': { $in: userId.split(',') } },
        function (err, userSpreadChats) {
            // console.log("User: " + userSpreadChats);
        }).populate(['user_list', 'conversation.sent_by']).exec()
    console.log(userSpreadChats)
    const imdbID = req.params.imdbID;

    var options = {
        method: 'GET',
        url: 'https://imdb8.p.rapidapi.com/title/get-all-images',
        params: { tconst: imdbID },
        headers: {
            'x-rapidapi-host': 'imdb8.p.rapidapi.com',
            'x-rapidapi-key': '7e45ec5e4fmsh4f3dac417f9eaa7p179a33jsnbfe4cb2e4c79'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
        const returnedData = response.data;
        res.render('entertainment/movies/movie-add-photos', { returnedData, userSpreadChats, spreadObj })
    }).catch(function (error) {
        console.error(error);
    });
});



router.get('/vr/movies', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id;
    const userSpreadChats = await SpreadChat.find({ 'user_list': { $in: userId.split(',') } },
        function (err, userSpreadChats) {
            // console.log("User: " + userSpreadChats);
        }).populate(['user_list', 'conversation.sent_by']).exec()
    console.log(userSpreadChats)
    const movies = await Movie.find()

    res.render('entertainment/movies/vr-home', { subZone: "VR Movies", zone: 'Entertainment', subZonePage: 'Home', movies, userSpreadChats })
});







router.get('/vr/movies/:movie', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id;
    const userSpreadChats = await SpreadChat.find({ 'user_list': { $in: userId.split(',') } },
        function (err, userSpreadChats) {
            // console.log("User: " + userSpreadChats);
        }).populate(['user_list', 'conversation.sent_by']).exec()
    console.log(userSpreadChats)
    const movie = req.params.movie;
    const apiKey = 'd3722e71'
    const options = {
        method: 'GET',
        url: `http://www.omdbapi.com/?apikey=${apiKey}&t=${movie}`
    };

    axios.request(options).then(function (response) {
        const returnedData = response.data;
        console.log(returnedData)
        res.render('entertainment/movies/vr-title', { subZone: "Home", zone: 'Entertainment', returnedData, movie, userSpreadChats })
    }).catch(function (error) {
        console.error(error);
    });
});


router.post('/movies/save', ensureAuthenticated, async (req, res) => {
    const movieString = req.body.movie_title;
    const convertedString = movieString.replace(/\s/g, '+');
    const user = req.user._id;
    const movieLink = req.body.movie_title;
    const movieName = req.body.movie_name;
    const moviePoster = req.body.movie_poster;
    await User.findByIdAndUpdate(user,
        { $addToSet: { movie_list: { movie_link: movieLink, movie_name: movieName, movie_poster: moviePoster } } },
    )
    res.redirect(`/entertainment/movies/title/${convertedString}`)
});



router.post('/movies/add-to-recommended', ensureAuthenticated, (req, res) => {
    const movieString = req.body.name;
    const convertedString = movieString.replace(/\s/g, '+');
    let genres = [];
    let allGenres = req.body.genre;
    let allGenresArray = allGenres.split(', ')
    allGenresArray.forEach(genre => {
        genres.push(genre)
    })

    const movie = new Movie({
        name: movieString,
        link: convertedString,
        poster: req.body.poster,
        genre: req.body.genre,
        genres: genres,
        rated: req.body.rated,
        for_kids: req.body.for_kids
    })
    movie.save()
    res.redirect('/entertainment/movies');

})


/* THE RABBIT HOLE */

router.get('/rabbit-hole', async (req, res) => {
    const allVideos = await UserVideo.find()

    res.render('entertainment/rabbit-hole', {allVideos})
})

router.get('/rabbit-hole/upload', async (req, res) => {

    res.render('entertainment/rabbit-hole-upload')
})


router.post('/rabbit-hole/upload', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id
    const newVideo = new UserVideo({
        creator: userId,
        video_type: 'url',
        title: req.body.title,
        description: req.body.description,
        url_source: req.body.url_source,
        thumbnail: req.body.thumbnail,
        video_length: req.body.video_length,
        tags: req.body.tags
    })
    newVideo.save()
    res.redirect('/entertainment/rabbit-hole')
})


router.get('/rabbit-hole/video/:videoId', async (req, res) => {
    const videoId = req.params.videoId
    const video = await UserVideo.findById(videoId)
    const allVideos = await UserVideo.find()
    const relatedVideos1 = await UserVideo.find({ "tags": video.tags[0] })
    const relatedVideos2 = await UserVideo.find({ "tags": video.tags[1] })
    const relatedVideos3 = await UserVideo.find({ "tags": video.tags[3] })
    const comments = await Spread.find({"video_ref": videoId}).populate('author').exec()
    const replys = await Comment.find({"video_id": videoId}).populate('author').exec()
    let allRelatedVideos = []
    relatedVideos1.forEach(video => {
        allRelatedVideos.push(video)
    })
    relatedVideos2.forEach(video => {
        allRelatedVideos.push(video)
    })
    relatedVideos3.forEach(video => {
        allRelatedVideos.push(video)
    })

    res.render('entertainment/rabbit-hole-video', { video, allRelatedVideos, allVideos, comments, replys })
})


router.post('/rabbit-hole/video/:videoId/post', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id
    const videoId = req.params.videoId
    console.log(userId)
    const spreadData = req.body
    console.log(spreadData)

    const newSpread = new Spread({
        author: req.user.id,
        spread_type: 'rabbit-hole',
        video_ref: videoId,
        string_post: req.body.string_post
    })
    newSpread.save()

    res.redirect(`/entertainment/rabbit-hole/video/${videoId}`)
})


router.post('/rabbit-hole/video/:videoId/comment/:commentId/reply', ensureAuthenticated, async (req, res) => {
    const videoId = req.params.videoId
    const commentId = req.params.commentId

    const newComment = new Comment({
        author: req.user.id,
        commentBody: req.body.commentBody,
        fromPost: commentId,
        video_id: videoId
    })
    newComment.save()
    res.redirect(`/entertainment/rabbit-hole/video/${videoId}`)
})

/* AUDIO */

router.get('/audio', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id;
    const userSpreadChats = await SpreadChat.find({ 'user_list': { $in: userId.split(',') } },
        function (err, userSpreadChats) {
            // console.log("User: " + userSpreadChats);
        }).populate(['user_list', 'conversation.sent_by']).exec()
    console.log(userSpreadChats)
    res.render('entertainment/audio/home', { subZone: "Audio", zone: 'Entertainment', subZonePage: 'Home', userSpreadChats })
});

router.get('/audio/music', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id;
    const userSpreadChats = await SpreadChat.find({ 'user_list': { $in: userId.split(',') } },
        function (err, userSpreadChats) {
            // console.log("User: " + userSpreadChats);
        }).populate(['user_list', 'conversation.sent_by']).exec()
    console.log(userSpreadChats)
    const audioFiles = await UserAudio.find()
    res.render('entertainment/audio/music', { subZone: "Audio", zone: 'Entertainment', subZonePage: 'Music', audioFiles, userSpreadChats})
});

router.get('/audio/music/add-to-playlist/song/:songId', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id;
    const userSpreadChats = await SpreadChat.find({ 'user_list': { $in: userId.split(',') } },
        function (err, userSpreadChats) {
            // console.log("User: " + userSpreadChats);
        }).populate(['user_list', 'conversation.sent_by']).exec()
    console.log(userSpreadChats)
    const songId = req.params.songId;
    const song = await UserAudio.findById(songId)
    const playlists = await MusicPlaylist.find({'playlist_owner': {$eq: req.user.id}})
    res.render('entertainment/audio/music/add-to-playlist', { subZone: "Audio", zone: 'Entertainment', subZonePage: 'Music', song, playlists, userSpreadChats})
});


router.get('/audio/music/playlists', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id;
    const userSpreadChats = await SpreadChat.find({ 'user_list': { $in: userId.split(',') } },
        function (err, userSpreadChats) {
            // console.log("User: " + userSpreadChats);
        }).populate(['user_list', 'conversation.sent_by']).exec()
    console.log(userSpreadChats)
    const playlists = await MusicPlaylist.find({'playlist_owner': {$eq: userId}})
    res.render('entertainment/audio/music/playlists', { subZone: "Audio", zone: 'Entertainment', subZonePage: 'Music', playlists, userSpreadChats})
});

router.get('/audio/music/playlist/:playlistId', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id;
    const userSpreadChats = await SpreadChat.find({ 'user_list': { $in: userId.split(',') } },
        function (err, userSpreadChats) {
            // console.log("User: " + userSpreadChats);
        }).populate(['user_list', 'conversation.sent_by']).exec()
    console.log(userSpreadChats)
    const playlistId = req.params.playlistId;
    const playlist = await MusicPlaylist.findById(playlistId).populate('songs').exec()
    console.log(playlist)
    res.render('entertainment/audio/music/playlist', { subZone: "Audio", zone: 'Entertainment', subZonePage: 'Music', playlist, userSpreadChats})
});

router.post('/audio/music/playlist/create', ensureAuthenticated, async (req, res) => {
    const songId = req.params.song
    const newPlaylist = new MusicPlaylist({
        playlist_owner: req.user.id,
        name: req.body.name
    })
    newPlaylist.save()
    res.redirect(`/entertainment/audio/music/add-to-playlist/song/${songId}`)
});
router.post('/audio/music/playlist/create-alone', ensureAuthenticated, async (req, res) => {
    const songId = req.params.song
    const newPlaylist = new MusicPlaylist({
        playlist_owner: req.user.id,
        name: req.body.name
    })
    newPlaylist.save()
    res.redirect(`/entertainment/audio/music/playlists`)
});

router.get('/audio/music/add-to-playlist/song/:songId/to/:playlistId', ensureAuthenticated, async (req, res) => {
    
    const songId = req.params.songId;
    const playlistId = req.params.playlistId;
    await MusicPlaylist.findByIdAndUpdate(playlistId,
        { $addToSet: { songs: songId }},
    )
    res.redirect(`/entertainment/audio/music/playlist/${playlistId}`)
});


/* NEWS */

router.get('/news', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id;
    const userSpreadChats = await SpreadChat.find({ 'user_list': { $in: userId.split(',') } },
        function (err, userSpreadChats) {
            // console.log("User: " + userSpreadChats);
        }).populate(['user_list', 'conversation.sent_by']).exec()
    console.log(userSpreadChats)
    res.render('entertainment/news/home', {userSpreadChats})
});


/* JOB SEARCH */

router.get('/job-search', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id;
    const userSpreadChats = await SpreadChat.find({ 'user_list': { $in: userId.split(',') } },
        function (err, userSpreadChats) {
            // console.log("User: " + userSpreadChats);
        }).populate(['user_list', 'conversation.sent_by']).exec()
    console.log(userSpreadChats)
    res.render('academy/job-search/home', {userSpreadChats})
});


/* INSIGHTS */

router.get('/insights', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id;
    const userSpreadChats = await SpreadChat.find({ 'user_list': { $in: userId.split(',') } },
        function (err, userSpreadChats) {
            // console.log("User: " + userSpreadChats);
        }).populate(['user_list', 'conversation.sent_by']).exec()
    console.log(userSpreadChats)
    res.render('entertainment/insights/home', {userSpreadChats})
});


/* HELP */

router.get('/help', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id;
    const userSpreadChats = await SpreadChat.find({ 'user_list': { $in: userId.split(',') } },
        function (err, userSpreadChats) {
            // console.log("User: " + userSpreadChats);
        }).populate(['user_list', 'conversation.sent_by']).exec()
    console.log(userSpreadChats)
    res.render('entertainment/help/home', {userSpreadChats})
});


module.exports = router;