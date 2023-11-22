const express = require('express');
const router = express.Router();
// const { ensureAuthenticated } = require('../config/auth');
const connectEnsureLogin = require('connect-ensure-login')
const ensureAuthenticated = connectEnsureLogin.ensureLoggedIn({ redirectTo: '/users/login' })

const axios = require('axios')

/* Models */
const User = require('../models/User');


/* NEWS */

router.get('/', async (req, res) => {

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
        res.render('news/home', { subZone: "Home", zone: 'News', subZonePage: 'Home', returnedData })
    }).catch(function (error) {
        console.error(error);
    });
});

router.post('/search', (req, res) => {
    const term = req.body.searchQuery;
    res.redirect(`/news/search/${term}`);
});

router.get('/search/:searchTerm', (req, res) => {
    const searchTerm = req.params.searchTerm
    const options = {
        method: 'GET',
        url: 'https://newscatcher.p.rapidapi.com/v1/search_free',
        params: { q: `${searchTerm}`, lang: 'en', media: 'True' },
        headers: {
            'x-rapidapi-host': 'newscatcher.p.rapidapi.com',
            'x-rapidapi-key': '7e45ec5e4fmsh4f3dac417f9eaa7p179a33jsnbfe4cb2e4c79'
        }
    };

    axios.request(options).then(function (response) {
        const returnedData = response.data;
        res.render('news/search-results', { zone: 'News', subZone: null, returnedData, searchTerm })
    }).catch(function (error) {
        console.error(error);
    });
});



router.get('/sports', async (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://newscatcher.p.rapidapi.com/v1/latest_headlines',
        params: { lang: 'en', media: 'True', topic: 'sport' },
        headers: {
            'x-rapidapi-host': 'newscatcher.p.rapidapi.com',
            'x-rapidapi-key': '7e45ec5e4fmsh4f3dac417f9eaa7p179a33jsnbfe4cb2e4c79'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
        const returnedData = response.data;
        res.render('news/sports', { subZone: "Sports", zone: 'News', subZonePage: 'Sports', returnedData })
    }).catch(function (error) {
        console.error(error);
    });
});

router.get('/finance', async (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://newscatcher.p.rapidapi.com/v1/latest_headlines',
        params: { lang: 'en', media: 'True', topic: 'finance' },
        headers: {
            'x-rapidapi-host': 'newscatcher.p.rapidapi.com',
            'x-rapidapi-key': '7e45ec5e4fmsh4f3dac417f9eaa7p179a33jsnbfe4cb2e4c79'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
        const returnedData = response.data;
        res.render('news/finance', { subZone: "Finance", zone: 'News', subZonePage: 'Finance', returnedData })
    }).catch(function (error) {
        console.error(error);
    });
});

router.get('/international', async (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://newscatcher.p.rapidapi.com/v1/latest_headlines',
        params: { lang: 'en', media: 'True', topic: 'world' },
        headers: {
            'x-rapidapi-host': 'newscatcher.p.rapidapi.com',
            'x-rapidapi-key': '7e45ec5e4fmsh4f3dac417f9eaa7p179a33jsnbfe4cb2e4c79'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
        const returnedData = response.data;
        res.render('news/international', { subZone: "International", zone: 'News', subZonePage: 'International', returnedData })
    }).catch(function (error) {
        console.error(error);
    });
});

router.get('/business', async (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://newscatcher.p.rapidapi.com/v1/latest_headlines',
        params: { lang: 'en', media: 'True', topic: 'business' },
        headers: {
            'x-rapidapi-host': 'newscatcher.p.rapidapi.com',
            'x-rapidapi-key': '7e45ec5e4fmsh4f3dac417f9eaa7p179a33jsnbfe4cb2e4c79'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
        const returnedData = response.data;
        res.render('news/business', { subZone: "Business", zone: 'News', subZonePage: 'Business', returnedData })
    }).catch(function (error) {
        console.error(error);
    });
});



router.get('/entertainment', async (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://newscatcher.p.rapidapi.com/v1/latest_headlines',
        params: { lang: 'en', media: 'True', topic: 'entertainment' },
        headers: {
            'x-rapidapi-host': 'newscatcher.p.rapidapi.com',
            'x-rapidapi-key': '7e45ec5e4fmsh4f3dac417f9eaa7p179a33jsnbfe4cb2e4c79'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
        const returnedData = response.data;
        res.render('news/entertainment', { subZone: "Entertainment", zone: 'News', subZonePage: 'Entertainment', returnedData })
    }).catch(function (error) {
        console.error(error);
    });
});

router.get('/health', async (req, res) => {
    res.render('news/health', { subZone: "Health", zone: 'News', subZonePage: 'Health' })
});

router.get('/technology', async (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://newscatcher.p.rapidapi.com/v1/latest_headlines',
        params: { lang: 'en', media: 'True', topic: 'tech' },
        headers: {
            'x-rapidapi-host': 'newscatcher.p.rapidapi.com',
            'x-rapidapi-key': '7e45ec5e4fmsh4f3dac417f9eaa7p179a33jsnbfe4cb2e4c79'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
        const returnedData = response.data;
        res.render('news/technology', { subZone: "Technology", zone: 'News', subZonePage: 'Technology', returnedData })
    }).catch(function (error) {
        console.error(error);
    });
});

router.get('/politics', async (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://newscatcher.p.rapidapi.com/v1/latest_headlines',
        params: { lang: 'en', media: 'True', topic: 'politics' },
        headers: {
            'x-rapidapi-host': 'newscatcher.p.rapidapi.com',
            'x-rapidapi-key': '7e45ec5e4fmsh4f3dac417f9eaa7p179a33jsnbfe4cb2e4c79'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
        const returnedData = response.data;
        res.render('news/politics', { subZone: "Politics", zone: 'News', subZonePage: 'Politics', returnedData })
    }).catch(function (error) {
        console.error(error);
    });
});

router.get('/events', async (req, res) => {
    res.render('news/events', { subZone: "Events", zone: 'News', subZonePage: 'Events' })
});


/* NEWS SEARCH */

router.get('/results', (req, res) => {
    res.render('news/results')
});


/* TV */

router.get('/local', async (req, res) => {
    res.render('news/local')
});



/* MOVIES */

router.get('/international', async (req, res) => {
    res.render('news/international')
});



/* AUDIO */

router.get('/health', (req, res) => {
    res.render('news/health')
});



/* NEWS */

router.get('/politics', (req, res) => {
    res.render('news/politics')
});

/* NEWS */

router.get('/sports', (req, res) => {
    res.render('news/sports')
});




/* HELP */

router.get('/help', (req, res) => {
    res.render('news/help')
});


module.exports = router;