const express = require('express');
const router = express.Router();
// const { ensureAuthenticated } = require('../config/auth');
const connectEnsureLogin = require('connect-ensure-login')
const ensureAuthenticated = connectEnsureLogin.ensureLoggedIn({ redirectTo: '/users/login' })


/* Models */
const User = require('../models/User');


router.get('/', async (req, res) => {
    res.render('flexfloor/home', { subZone: 'Home', zone: 'FlexFloor', subZonePage: 'Home' })
});

router.get('/sizes', async (req, res) => {
    res.render('flexfloor/sizes', { subZone: 'Home', zone: 'FlexFloor', subZonePage: 'Sizes' })
});

router.get('/sizes/:size', async (req, res) => {
    const size = req.params.size
    res.render('flexfloor/chosen-size', { subZone: 'Units', zone: 'FlexFloor', subZonePage: `Size ${size}`, size })
});

router.get('/sizes/:size/active', async (req, res) => {
    const size = req.params.size
    const sizeMeters = (size / 3) / 1.0936133
    const wallPosition = sizeMeters/2
    res.render('flexfloor/chosen-size-active', { layout: 'flexfloor', subZone: 'Units', zone: 'FlexFloor', subZonePage: `Size ${size} Active`, size, sizeMeters, wallPosition})
});




router.get('/units', async (req, res) => {
    res.render('flexfloor/units', { subZone: 'Home', zone: 'FlexFloor', subZonePage: 'Units' })
});






module.exports = router;