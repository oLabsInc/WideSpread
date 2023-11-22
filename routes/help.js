const express = require('express');
const router = express.Router();
// const { ensureAuthenticated } = require('../config/auth');
const connectEnsureLogin = require('connect-ensure-login')
const ensureAuthenticated = connectEnsureLogin.ensureLoggedIn({ redirectTo: '/users/login' })


/* Models */
const User = require('../models/User');


router.get('/', async (req, res) => {
    res.render('help/home', { subZone: 'Home', zone: 'Help', subZonePage: 'Home' })
});






module.exports = router;