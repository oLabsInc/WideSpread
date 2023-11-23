<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// const { ensureAuthenticated } = require('../config/auth');
const connectEnsureLogin = require('connect-ensure-login')
const ensureAuthenticated = connectEnsureLogin.ensureLoggedIn({ redirectTo: '/users/login' })

const axios = require('axios')
const { readUserData, allUserPosts, getUserPosts } = require("../modules/user/user-data");

/* Models */
const User = require('../models/User');
const Post = require('../models/Post');
const UserPhoto = require('../models/UserPhoto');
const UserVideo = require('../models/UserVideo');
const Company = require('../models/Company');
const Course = require('../models/Course');
const Class = require('../models/Class');
const LearningPoint = require('../models/LearningPoint');
const Show = require('../models/Show');
const Movie = require('../models/Movie');



// VR Dashboard Page
router.get('/users/dashboard', ensureAuthenticated, async (req, res) => {
    const currentUser = req.user;
    const userId = req.user.id;
    const posts = await Post.find({ 'author': { $eq: userId } }).sort({ createdAt: 'desc' }).limit(5)
    console.log(`Posts: ${posts}`)
    const user = await User.findById(userId).populate('friends').exec()
    const userPhotos = await UserPhoto.find({'image_owner': {$eq: currentUser.id}})
    console.log(user.movie_list)

    res.render('vr/dashboard', { layout: 'vr', currentPageTitle: 'VR', currentUser, userPhotos, user, posts
 });
})


// Academy
router.get('/academy', async (req, res) => {
    const courses = await Course.find().populate('classes').exec()
    console.log(courses)
    res.render('vr/academy/home', { layout: 'vr', currentPageTitle: 'VR Academy', courses})
});

// Academy - Course ID
router.get('/academy/course/:courseId', async (req, res) => {
    const courseId = req.params.courseId
    const course = await Course.findById(courseId).populate('classes').exec()
    console.log(course)
    res.render('vr/academy/course-home', { layout: 'vr', currentPageTitle: 'VR Academy', course})
});

// Academy - Course ID - Class ID
router.get('/academy/course/:courseId/classes/:classId', async (req, res) => {
    const courseId = req.params.courseId
    const classId = req.params.classId
    const currentClass = await Class.findById(classId).populate('in_course').exec()
    const learningPoints = await LearningPoint.find({'class': {$eq: classId}})
    console.log(learningPoints)
    console.log(currentClass)
    res.render('vr/academy/class-home', { layout: 'vr', currentPageTitle: 'VR Academy', currentClass, learningPoints})
});


// Business
router.get('/business', async (req, res) => {
    const companies = await Company.find()
    console.log(companies)
    res.render('vr/business/home', { layout: 'vr', currentPageTitle: 'VR Business', companies })
});

// News
router.get('/news', async (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://newscatcher.p.rapidapi.com/v1/latest_headlines',
        params: { lang: 'en', media: 'True' },
        headers: {
            'x-rapidapi-host': 'newscatcher.p.rapidapi.com',
            'x-rapidapi-key': '7e45ec5e4fmsh4f3dac417f9eaa7p179a33jsnbfe4cb2e4c79'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
        const returnedData = response.data;
        res.render('vr/news/home', { layout: 'vr', currentPageTitle: 'VR News', returnedData })
    }).catch(function (error) {
        console.error(error);
    });
});

// Entertainment
router.get('/entertainment', async (req, res) => {

    res.render('vr/entertainment/home', { layout: 'vr', currentPageTitle: 'VR Entertainment' })
});

// Entertainment
router.get('/entertainment/tv', async (req, res) => {
    const shows = await Show.find()
    res.render('vr/entertainment/tv', { shows, layout: 'vr', currentPageTitle: 'VR Entertainment' })
});

router.get('/entertainment/rabbit-hole/video/:id', async (req, res) => {
    const id = req.params.id
    const video = await UserVideo.findById(id)
    res.render('vr/entertainment/rabbit-hole', {layout: 'vr', video})
})
// Leisure
router.get('/leisure', async (req, res) => {

    res.render('vr/leisure/home', { layout: 'vr', currentPageTitle: 'VR Leisure' })
});

// Wellness
router.get('/wellness', async (req, res) => {

    res.render('vr/wellness/home', { layout: 'vr', currentPageTitle: 'VR Wellness' })
});

// Things
router.get('/things', async (req, res) => {

    res.render('vr/things/home', { layout: 'vr', currentPageTitle: 'VR Things' })
});

// Help
router.get('/help', async (req, res) => {

    res.render('vr/help/home', { layout: 'vr', currentPageTitle: 'VR Help' })
});



=======
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// const { ensureAuthenticated } = require('../config/auth');
const connectEnsureLogin = require('connect-ensure-login')
const ensureAuthenticated = connectEnsureLogin.ensureLoggedIn({ redirectTo: '/users/login' })

const axios = require('axios')
const { readUserData, allUserPosts, getUserPosts } = require("../modules/user/user-data");

/* Models */
const User = require('../models/User');
const Post = require('../models/Post');
const UserPhoto = require('../models/UserPhoto');
const UserVideo = require('../models/UserVideo');
const Company = require('../models/Company');
const Course = require('../models/Course');
const Class = require('../models/Class');
const LearningPoint = require('../models/LearningPoint');
const Show = require('../models/Show');
const Movie = require('../models/Movie');



// VR Dashboard Page
router.get('/users/dashboard', ensureAuthenticated, async (req, res) => {
    const currentUser = req.user;
    const userId = req.user.id;
    const posts = await Post.find({ 'author': { $eq: userId } }).sort({ createdAt: 'desc' }).limit(5)
    console.log(`Posts: ${posts}`)
    const user = await User.findById(userId).populate('friends').exec()
    const userPhotos = await UserPhoto.find({'image_owner': {$eq: currentUser.id}})
    console.log(user.movie_list)

    res.render('vr/dashboard', { layout: 'vr', currentPageTitle: 'VR', currentUser, userPhotos, user, posts
 });
})


// Academy
router.get('/academy', async (req, res) => {
    const courses = await Course.find().populate('classes').exec()
    console.log(courses)
    res.render('vr/academy/home', { layout: 'vr', currentPageTitle: 'VR Academy', courses})
});

// Academy - Course ID
router.get('/academy/course/:courseId', async (req, res) => {
    const courseId = req.params.courseId
    const course = await Course.findById(courseId).populate('classes').exec()
    console.log(course)
    res.render('vr/academy/course-home', { layout: 'vr', currentPageTitle: 'VR Academy', course})
});

// Academy - Course ID - Class ID
router.get('/academy/course/:courseId/classes/:classId', async (req, res) => {
    const courseId = req.params.courseId
    const classId = req.params.classId
    const currentClass = await Class.findById(classId).populate('in_course').exec()
    const learningPoints = await LearningPoint.find({'class': {$eq: classId}})
    console.log(learningPoints)
    console.log(currentClass)
    res.render('vr/academy/class-home', { layout: 'vr', currentPageTitle: 'VR Academy', currentClass, learningPoints})
});


// Business
router.get('/business', async (req, res) => {
    const companies = await Company.find()
    console.log(companies)
    res.render('vr/business/home', { layout: 'vr', currentPageTitle: 'VR Business', companies })
});

// News
router.get('/news', async (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://newscatcher.p.rapidapi.com/v1/latest_headlines',
        params: { lang: 'en', media: 'True' },
        headers: {
            'x-rapidapi-host': 'newscatcher.p.rapidapi.com',
            'x-rapidapi-key': '7e45ec5e4fmsh4f3dac417f9eaa7p179a33jsnbfe4cb2e4c79'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
        const returnedData = response.data;
        res.render('vr/news/home', { layout: 'vr', currentPageTitle: 'VR News', returnedData })
    }).catch(function (error) {
        console.error(error);
    });
});

// Entertainment
router.get('/entertainment', async (req, res) => {

    res.render('vr/entertainment/home', { layout: 'vr', currentPageTitle: 'VR Entertainment' })
});

// Entertainment
router.get('/entertainment/tv', async (req, res) => {
    const shows = await Show.find()
    res.render('vr/entertainment/tv', { shows, layout: 'vr', currentPageTitle: 'VR Entertainment' })
});

router.get('/entertainment/rabbit-hole/video/:id', async (req, res) => {
    const id = req.params.id
    const video = await UserVideo.findById(id)
    res.render('vr/entertainment/rabbit-hole', {layout: 'vr', video})
})
// Leisure
router.get('/leisure', async (req, res) => {

    res.render('vr/leisure/home', { layout: 'vr', currentPageTitle: 'VR Leisure' })
});

// Wellness
router.get('/wellness', async (req, res) => {

    res.render('vr/wellness/home', { layout: 'vr', currentPageTitle: 'VR Wellness' })
});

// Things
router.get('/things', async (req, res) => {

    res.render('vr/things/home', { layout: 'vr', currentPageTitle: 'VR Things' })
});

// Help
router.get('/help', async (req, res) => {

    res.render('vr/help/home', { layout: 'vr', currentPageTitle: 'VR Help' })
});



>>>>>>> a8a8b4650a974eeda356f271e4e38c9b4cab5fa3
module.exports = router;