<<<<<<< HEAD
const express = require('express');
const router = express.Router();

const connectEnsureLogin = require('connect-ensure-login')
const ensureAuthenticated = connectEnsureLogin.ensureLoggedIn({ redirectTo: '/users/login' })

const mongoose = require('mongoose');

// Welcome Page
router.get('/', (req, res) => {
    let currentUser = null
      res.render('welcome', {page: 'Welcome to WideSpread'});
  });


router.get('/chat', (req, res) => {
  res.render('spreadchat/home')
})
router.get('/icons', (req, res) => {
  res.render('icons')
});

router.get('/cora', async (req, res) => {
  res.render('cora-main')
})
router.get('/cora-general', async (req, res) => {
  res.render('cora-general')
})


=======
const express = require('express');
const router = express.Router();

const connectEnsureLogin = require('connect-ensure-login')
const ensureAuthenticated = connectEnsureLogin.ensureLoggedIn({ redirectTo: '/users/login' })

const mongoose = require('mongoose');

// Welcome Page
router.get('/', (req, res) => {
    let currentUser = null
      res.render('welcome', {page: 'Welcome to WideSpread'});
  });


router.get('/chat', (req, res) => {
  res.render('spreadchat/home')
})
router.get('/icons', (req, res) => {
  res.render('icons')
});

router.get('/cora', async (req, res) => {
  res.render('cora-main')
})
router.get('/cora-general', async (req, res) => {
  res.render('cora-general')
})


>>>>>>> a8a8b4650a974eeda356f271e4e38c9b4cab5fa3
  module.exports = router;