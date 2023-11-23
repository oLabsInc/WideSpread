<<<<<<< HEAD
const express = require('express');
const router = express.Router();
// const { ensureAuthenticated } = require('../config/auth');
const connectEnsureLogin = require('connect-ensure-login')
const ensureAuthenticated = connectEnsureLogin.ensureLoggedIn({ redirectTo: '/users/login' })


/* Models */
const User = require('../models/User');
const Company = require('../models/Company');
const Course = require('../models/Course');
const Class = require('../models/Class');
const Question = require('../models/Question');
const Answer = require('../models/Answer');


router.post('/', async (req, res) => {
    const queryString = req.body.query;
    res.redirect(`/search/results/${queryString}`)
})
router.get('/results/:query', async (req, res) => {
    const queryString = req.params.query;
    console.log(`User searched for: ${queryString}`)
    // const userFn = await User.find({ "fname": { "$regex": queryString, "$options": "i" }})
    // const userLn = await User.find({ "lname": { "$regex": queryString, "$options": "i" }})
    const courses = await Course.find({ "course": { "$regex": queryString, "$options": "i" }}).populate('classes').exec()
    const classes = await Class.find({ "name": { "$regex": queryString, "$options": "i" }}).populate('in_course').exec()
    const companies = await Company.find({ "company_name": { "$regex": queryString, "$options": "i" }})
    const questions = await Question.find({ "question_body": { "$regex": queryString, "$options": "i" }}).populate('answers').exec()
    // const allResults = [companies, userFn, userLn, courses, classes, questions]
    const allResults = [companies, courses, classes, questions]
    console.log(`All results: \n \n \n ${allResults.length}`)
    res.render('search/results', { subZone: 'Search', zone: 'Search', subZonePage: 'Results', queryString, allResults, courses, classes, companies, questions })
});






=======
const express = require('express');
const router = express.Router();
// const { ensureAuthenticated } = require('../config/auth');
const connectEnsureLogin = require('connect-ensure-login')
const ensureAuthenticated = connectEnsureLogin.ensureLoggedIn({ redirectTo: '/users/login' })


/* Models */
const User = require('../models/User');
const Company = require('../models/Company');
const Course = require('../models/Course');
const Class = require('../models/Class');
const Question = require('../models/Question');
const Answer = require('../models/Answer');


router.post('/', async (req, res) => {
    const queryString = req.body.query;
    res.redirect(`/search/results/${queryString}`)
})
router.get('/results/:query', async (req, res) => {
    const queryString = req.params.query;
    console.log(`User searched for: ${queryString}`)
    // const userFn = await User.find({ "fname": { "$regex": queryString, "$options": "i" }})
    // const userLn = await User.find({ "lname": { "$regex": queryString, "$options": "i" }})
    const courses = await Course.find({ "course": { "$regex": queryString, "$options": "i" }}).populate('classes').exec()
    const classes = await Class.find({ "name": { "$regex": queryString, "$options": "i" }}).populate('in_course').exec()
    const companies = await Company.find({ "company_name": { "$regex": queryString, "$options": "i" }})
    const questions = await Question.find({ "question_body": { "$regex": queryString, "$options": "i" }}).populate('answers').exec()
    // const allResults = [companies, userFn, userLn, courses, classes, questions]
    const allResults = [companies, courses, classes, questions]
    console.log(`All results: \n \n \n ${allResults.length}`)
    res.render('search/results', { subZone: 'Search', zone: 'Search', subZonePage: 'Results', queryString, allResults, courses, classes, companies, questions })
});






>>>>>>> a8a8b4650a974eeda356f271e4e38c9b4cab5fa3
module.exports = router;