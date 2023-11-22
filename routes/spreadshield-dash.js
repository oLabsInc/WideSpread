const express = require('express');
const router = express.Router();
// const { ensureAuthenticated } = require('../config/auth');
const connectEnsureLogin = require('connect-ensure-login')
const ensureAuthenticated = connectEnsureLogin.ensureLoggedIn({ redirectTo: '/users/login' })


/* Models */
const User = require('../models/User');
const Company = require('../models/Company');
const UserVideo = require('../models/UserVideo');



router.get('/', async (req, res) => {
    const user = req.user
    const videos = await UserVideo.find()
    console.log(videos)
    res.render('spreadshield/dash', {user, videos})
})


router.get('/passenger', async (req, res) => {
    const user = req.user
    const videos = await UserVideo.find()
    console.log(videos)
    res.render('spreadshield/passenger-tablet', {user, videos})
})




module.exports = router;