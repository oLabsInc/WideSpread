const express = require('express');
const router = express.Router();
// const { ensureAuthenticated } = require('../config/auth');
const connectEnsureLogin = require('connect-ensure-login')
const ensureAuthenticated = connectEnsureLogin.ensureLoggedIn({ redirectTo: '/users/login' })


/* Models */
const User = require('../models/User');
const Thing = require('../models/Thing');
const Place = require('../models/Place');
const Company = require('../models/Company');
const Zone = require('../models/Zone');
const SubZone = require('../models/SubZone');


router.get('/', ensureAuthenticated, async (req, res) => {
    const zone = await Zone.findOne({code: 2})
    console.log(zone)
    const subZones = await SubZone.find({zone: zone.id})
    res.render('things/home', { subZone: 'Home', zone: 'Things', subZonePage: 'Home', zone, subZones })
});

router.get('/user', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id
    const user = await User.findById(userId)
    const userThings = await Thing.find({for_user: {$eq: userId}})
    res.render('things/dashboard', { subZone: 'Home', zone: 'Things', subZonePage: 'Dashboard', user, userThings})
})


router.post('/user/:userId/devices/new/add', ensureAuthenticated, async (req, res) => {
    const userId = req.params.userId
    const deviceType = req.body.device_type

    if (deviceType === 'Garage Door') {
        const newDevice = new Thing({
            for_user: userId,
            "device_information.device_name": req.body.device_name,
            "device_information.device_type": req.body.device_type,
            "available_actions": ["Open", "Close", "Light On", "Light Off", "Check Status"]
        })

        newDevice.save()

        console.log('New Device: ', newDevice)
        res.redirect(`/things/user/${userId}/devices/id/${newDevice.id}/configure`)
    } else if (deviceType === 'Lighting Control') {
        const newDevice = new Thing({
            for_user: userId,
            "device_information.device_name": req.body.device_name,
            "device_information.device_type": req.body.device_type,
            "available_actions": ["All On", "All Off", "Dim", "Bright", "Select Color", "Set Timer", "Select Preset", "Add Preset"]
        })

        newDevice.save()

        console.log('New Device: ', newDevice)
        res.redirect(`/things/user/${userId}/devices/id/${newDevice.id}/configure`)
    } else if (deviceType === 'Thermostat') {
        const newDevice = new Thing({
            for_user: userId,
            "device_information.device_name": req.body.device_name,
            "device_information.device_type": req.body.device_type,
            "available_actions": ["Heat On", "Heat Off", "A/C On", "A/C Off", "Select Temperature", "Set Timer", "Set Schedule", "Fan On", "Fan Off"]
        })

        newDevice.save()

        console.log('New Device: ', newDevice)
        res.redirect(`/things/user/${userId}/devices/id/${newDevice.id}/configure`)
    } else if (deviceType === 'Security Camera') {
        const newDevice = new Thing({
            for_user: userId,
            "device_information.device_name": req.body.device_name,
            "device_information.device_type": req.body.device_type,
            "available_actions": ["Zoom In", "Zoom Out", "Pan Left", "Pan Right", "Pan Up", "Pan Down", "Record", "Share", "Use Intercom", "Turn On", "Turn Off"]
        })

        newDevice.save()

        console.log('New Device: ', newDevice)
        res.redirect(`/things/user/${userId}/devices/id/${newDevice.id}/configure`)
    } else if (deviceType === 'Door Lock') {
        const newDevice = new Thing({
            for_user: userId,
            "device_information.device_name": req.body.device_name,
            "device_information.device_type": req.body.device_type,
            "available_actions": ["Unlock", "Lock", "Sound Alarm"]
        })

        newDevice.save()

        console.log('New Device: ', newDevice)
        res.redirect(`/things/user/${userId}/devices/id/${newDevice.id}/configure`)
    } else if (deviceType === 'Blinds/Shades') {
        const newDevice = new Thing({
            for_user: userId,
            "device_information.device_name": req.body.device_name,
            "device_information.device_type": req.body.device_type,
            "available_actions": ["Blinds Down", "Blinds Up", "Blinds Open", "Blinds Close", "Shades Open", "Shades Close", "Blinds Auto On", "Blinds Auto Off", "Set Schedule Blinds", "Set Schedule Shades"]
        })

        newDevice.save()

        console.log('New Device: ', newDevice)
        res.redirect(`/things/user/${userId}/devices/id/${newDevice.id}/configure`)
    } else if (deviceType === 'Irrigation') {
        const newDevice = new Thing({
            for_user: userId,
            "device_information.device_name": req.body.device_name,
            "device_information.device_type": req.body.device_type,
            "available_actions": ["Set Schedule", "Turn On Zone 1", "Turn On Zone 2", "Turn On Zone 3", "Turn On Zone 4", "Turn On Zone 5", "Turn On Zone 6", "Turn Off All Zones", "Turn Off Until I Turn It On", "Maintence Mode", "Turn Off Until"]
        })

        newDevice.save()

        console.log('New Device: ', newDevice)
        res.redirect(`/things/user/${userId}/devices/id/${newDevice.id}/configure`)
    } else if (deviceType === 'SpreadShield') {
        const newDevice = new Thing({
            for_user: userId,
            "device_information.device_name": req.body.device_name,
            "device_information.device_type": req.body.device_type,
            "available_actions": ["Carpool Connect", "Autodrive"]
        })

        newDevice.save()

        console.log('New Device: ', newDevice)
        res.redirect(`/things/user/${userId}/devices/id/${newDevice.id}/configure`)
    } else if (deviceType === 'FlexFloor') {
        const newDevice = new Thing({
            for_user: userId,
            "device_information.device_name": req.body.device_name,
            "device_information.device_type": req.body.device_type,
            "available_actions": ["Calbrate Setup", "Test FlexFloor", "Maintence Mode", "Reconfigure FlexFloor Size"]
        })

        newDevice.save()

        console.log('New Device: ', newDevice)
        res.redirect(`/things/user/${userId}/devices/id/${newDevice.id}/configure`)
    } else {
        const newDevice = new Thing({
            for_user: userId,
            "device_information.device_name": req.body.device_name,
            "device_information.device_type": req.body.device_type,
            "available_actions": [null]
        })

        newDevice.save()

        console.log('New Device: ', newDevice)
        res.redirect(`/things/user/${userId}/devices/id/${newDevice.id}/configure`)
    }

})

router.get('/user/:userId/devices/id/:deviceId/configure', ensureAuthenticated, async (req, res) => {
    const userId = req.params.userId
    const deviceId = req.params.deviceId
    const user = await User.findById(userId)
    const thing = await Thing.findById(deviceId).populate('device_location').exec()
    const savedPlaces = await Place.find({owner: {$eq: userId}})
    console.log('Thing: ', thing)
    res.render('things/configure', { subZone: 'Home', zone: 'Things', subZonePage: 'Configure', user, thing, savedPlaces })

})

router.patch('/user/:userId/devices/id/:thingId/configure/update', ensureAuthenticated, async (req, res) => {
    const userId = req.params.userId
    const thingId = req.params.thingId
    console.log('req.body: ', req.body)
    await Thing.findByIdAndUpdate(thingId, req.body)
    res.redirect(req.get('referer'));
})

router.post('/user/:userId/places/new/add', ensureAuthenticated, async (req, res) => {
    const userId = req.params.userId
    const newPlace = new Place({
        owner: userId,
        name: req.body.place_name,
        "coordinates.x": req.body.lat,
        "coordinates.y": req.body.long
    })

    newPlace.save()
    res.redirect(req.get('referer'));
})
module.exports = router;