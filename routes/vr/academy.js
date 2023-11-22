const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { ensureAuthenticated } = require('../../config/auth');

const { readUserData, allUserPosts, getUserPosts } = require("../../modules/user/user-data");

/* Models */
const User = require('../../models/User');
const Post = require('../../models/Post');
const UserPhoto = require('../../models/UserPhoto');
const Company = require('../../models/Company');
const Course = require('../../models/Course');
const Class = require('../../models/Class');
const LearningPoint = require('../../models/LearningPoint');





// Academy
router.get('/', async (req, res) => {
    const courses = await Course.find()
    res.render('vr/academy/home', { layout: 'vr', currentPageTitle: 'VR Academy', courses })
});



// Help
router.get('/help', async (req, res) => {

    res.render('vr/academy/help', { layout: 'vr', currentPageTitle: 'VR Academy Help' })
});



module.exports = router;