const express = require('express');
const router = express.Router();
// const { ensureAuthenticated } = require('../config/auth');
const connectEnsureLogin = require('connect-ensure-login')
const ensureAuthenticated = connectEnsureLogin.ensureLoggedIn({ redirectTo: '/users/login' })


const Amadeus = require('amadeus');
const sdk = require('api')('@fsq-docs/v1.0#39rivyvkzr89i46');



/* Models */
const User = require('../models/User');
const GolfCourse = require('../models/GolfCourse');
const GolfHole = require('../models/GolfHole');
const GolfBag = require('../models/GolfBag');
const GolfScoreCardSingle = require('../models/GolfScoreCardSingle');
const GolfScoreCard = require('../models/GolfScoreCard');



// AR Golf Home Page
router.get('/sports/golf',  async (req, res) => {
    const currentUser = req.user;



    res.render('ar/leisure/golf', {
         currentPageTitle: 'AR', currentUser
    });
})

// AR All Golf Courses Page
router.get('/sports/golf/courses',  async (req, res) => {
    const currentUser = req.user;
    const allCourses = await GolfCourse.find()


    res.render('ar/leisure/all-courses', {
         currentPageTitle: 'AR', currentUser, allCourses
    });
})
router.post('/sports/golf/courses/add',  async (req, res) => {
    const newCourse = new GolfCourse({
        name: req.body.name,
        'address.street': req.body.street,
        'address.city': req.body.city,
        'address.state': req.body.state,
        'address.zip': req.body.zip,
        'address.country': req.body.country,
        'll.lat': req.body.lat,
        'll.long': req.body.long,
        driving_range: req.body.driving_range
    })
    newCourse.save()
    res.redirect('/ar/sports/golf/courses')
})

router.get('/sports/golf/courses/view/:courseId', async (req, res) => {
    const courseId = req.params.courseId
    const currentUser = req.user;
    const course = await GolfCourse.findById(courseId)
    const holes = await GolfHole.find({'for_course': courseId})
    console.log(course)
    res.render('ar/leisure/single-course', {
        currentPageTitle: 'AR', currentUser, course, holes
    });
})



router.post('/sports/golf/courses/view/:courseId/holes/add', async (req, res) => {
    const courseId = req.params.courseId
    const newHole = new GolfHole({
        for_course: courseId,
        hole_number: req.body.hole_number,
        par: req.body.par,
        handicap: req.body.handicap,
        'pin.lat': req.body.lat,
        'pin.long': req.body.long,
    })
    newHole.save()


    res.redirect(`/ar/sports/golf/courses/view/${courseId}`)
})



router.get('/sports/golf/courses/view/:courseId/holes/play/:holeId', async (req, res) => {
    const courseId = req.params.courseId
    const holeId = req.params.holeId
    const currentUser = req.user;
    const hole = await GolfHole.findById(holeId)
    const course = await GolfCourse.findById(courseId)
    console.log(hole)
    res.render('ar/leisure/single-hole', {
        currentPageTitle: 'AR', currentUser, hole, courseId, course
    });
})



router.post('/sports/golf/courses/view/:courseId/holes/:holeId/play/tee/add', async (req, res) => {
    const holeId = req.params.holeId
    const courseId = req.params.courseId

    GolfHole.findByIdAndUpdate(req.params.holeId,
        { $addToSet: { tees: {
            color: req.body.color,
            'll.lat': req.body.lat,
            'll.long': req.body.long,
            distance: req.body.distance
        } } },
        { safe: true, upsert: true },
        function (err, doc) {
            if (err) {
                console.log(err)
            } else {
                return
            }
        }
    )
    res.redirect(`/ar/sports/golf/courses/view/${courseId}/holes/play/${holeId}`)
})




router.get('/sports/golf/courses/view/:courseId/holes/play/:holeId/tee/color/:teeColor', async (req, res) => {
    const teeColor = req.params.teeColor
    const courseId = req.params.courseId
    const holeId = req.params.holeId
    const currentUser = req.user;
    const hole = await GolfHole.findById(holeId)
    const course = await GolfCourse.findById(courseId)
    const allHoles = await GolfHole.find({'for_course': courseId})
    console.log(allHoles)
    console.log(hole)
    res.render('ar/leisure/play-hole', {
        layout: 'ar', currentPageTitle: 'AR', currentUser, hole, courseId, teeColor, allHoles, course
    });
})





router.post('/sports/golf/courses/view/:courseId/holes/play/:holeId/tee/color/:teeColor/add-score', async (req, res) => {
    const teeColor = req.params.teeColor
    const courseId = req.params.courseId
    const holeId = req.params.holeId
    const nextHole = req.body.next_hole
    console.log(nextHole)
    const currentUser = req.user;
    res.redirect(`/ar/sports/golf/courses/view/${courseId}/holes/play/${nextHole}/tee/color/${teeColor}`)

})









/* Play Round */

router.get('/sports/golf/courses/view/:courseId/start-round', async (req, res) => {
    const courseId = req.params.courseId
    const course = await GolfCourse.findById(courseId)
    const playerId = req.user.id
    const newScoreCard = new GolfScoreCardSingle({
        golf_course: courseId,
        player: playerId,
        player_name: req.body.player_name
    })
    await newScoreCard.save()
    res.redirect(`/ar/sports/golf/courses/view/${courseId}/round/${newScoreCard.id}/holes`)

})

router.post('/sports/golf/courses/view/:courseId/start-round', async (req, res) => {
    const courseId = req.params.courseId

    const newScoreCard = new GolfScoreCardSingle({
        golf_course: courseId,
        player: req.body.player,
        player_name: req.body.player_name
    })
    await newScoreCard.save()
    res.redirect(`/ar/sports/golf/courses/view/${courseId}/round/${newScoreCard.id}/holes`)

})
router.get('/sports/golf/courses/view/:courseId/round/:scoreCardId/delete', async (req, res) => {
    const courseId = req.params.courseId
    const scoreCardId = req.params.scoreCardId
    await GolfScoreCardSingle.findByIdAndDelete(scoreCardId)
    res.redirect(`/ar/sports/golf/courses/view/${courseId}`)

})
router.get('/sports/golf/courses/view/:courseId/round/:scoreId/holes', async (req, res) => {
    const courseId = req.params.courseId
    const scoreId = req.params.scoreId
    const scoreCard = await GolfScoreCardSingle.findById(scoreId)
    const course = await GolfCourse.findById(courseId)
    const holes = await GolfHole.find({'for_course': courseId})
    console.log(holes)
    res.render('ar/leisure/new-round', {scoreCard, course, holes})

})
router.get('/sports/golf/courses/view/:courseId/round/:scoreId/final', async (req, res) => {
    const courseId = req.params.courseId
    const scoreId = req.params.scoreId
    const scoreCard = await GolfScoreCardSingle.findById(scoreId)
    const course = await GolfCourse.findById(courseId)
    const holes = await GolfHole.find({'for_course': courseId})
    console.log(holes)
    res.render('ar/leisure/scorecard', {scoreCard, course, holes})

})
router.get('/sports/golf/courses/view/:courseId/round/:scoreId/holes/:holeId', async (req, res) => {
    const teeColor = req.params.teeColor
    const courseId = req.params.courseId
    const holeId = req.params.holeId
    const scoreCardId = req.params.scoreId
    const currentUser = req.user;
    const hole = await GolfHole.findById(holeId)
    const course = await GolfCourse.findById(courseId).populate('holes')
    const allHoles = course.holes
    console.log(allHoles)
    console.log(hole)
    res.render('ar/leisure/score-select-tee', {
         currentPageTitle: 'AR', currentUser, hole, courseId, teeColor, allHoles, scoreCardId
    });

})
router.get('/sports/golf/courses/view/:courseId/round/:scoreId/holes/:holeId/tee/color/:teeColor', async (req, res) => {
    const teeColor = req.params.teeColor
    const courseId = req.params.courseId
    const holeId = req.params.holeId
    const scoreCardId = req.params.scoreId
    const currentUser = req.user;
    const hole = await GolfHole.findById(holeId)
    const course = await GolfCourse.findById(courseId)
    const holes = await GolfHole.find({'for_course': courseId})
    const score = await GolfScoreCardSingle.findById(scoreCardId).populate({
            path: 'holes',
            model: 'GolfHole'
    }).exec()
    const scoreHoles = score.holes.forEach(hole => {
        console.log(hole)
    })
    console.log(scoreHoles)
    const allHoles = holes
    const lastHole = holes.length

    console.log('LAST HOLE: ', lastHole)
    console.log(allHoles)
    console.log(hole)
    res.render('ar/leisure/score-hole', {
        layout: 'ar', currentPageTitle: 'AR', currentUser, hole, courseId, teeColor, allHoles, scoreCardId, score, course, lastHole, holes
    });

})

router.patch('/sports/golf/courses/view/:courseId/round/:scoreCardId/holes/:holeId/tee/color/:teeColor/add-score', async (req, res) => {
    const courseId = req.params.courseId
    const holeId = req.params.holeId
    const teeColor = req.params.teeColor
    const scoreCardId = req.params.scoreCardId
    const hole = await GolfHole.findById(holeId)
    const lastHole = req.body.last_hole

    const nextHole = req.body.next_hole
    const scoreData = {
        hole_id: holeId,
        tee: teeColor,
        strokes: req.body.strokes
    }

    await GolfScoreCardSingle.findByIdAndUpdate(scoreCardId, {
         $addToSet: { holes: scoreData }},
        { safe: true, upsert: true },
        function (err, doc) {
            if (err) {
                console.log(err)
            } else {
                return
            }
        }
    )
    if (hole.hole_number == lastHole) {
        res.redirect(`/ar/sports/golf/courses/view/${courseId}/round/${scoreCardId}/final`)
    } else {
        res.redirect(`/ar/sports/golf/courses/view/${courseId}/round/${scoreCardId}/holes/${nextHole}/tee/color/${teeColor}`)
    }

})



router.get('/sports/golf/user/:userId', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id
    console.log(userId)
    const allScoreCards = await GolfScoreCardSingle.find({"player": userId}).populate('holes.hole_id').populate('golf_course').exec()
    console.log(allScoreCards)
    allScoreCards.forEach(card => {
        console.log(card.holes)
    })
    res.render('ar/leisure/golf-user', {userId, allScoreCards})
})

router.get('/sports/golf/user/:userId/scorecard/:scorecardId/delete', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id
    const scorecardId = req.params.scorecardId

    await GolfScoreCardSingle.findByIdAndDelete(scorecardId)

    res.redirect(`/ar/sports/golf/user/${userId}`)
})

// SpreadShield Nearby Places Page
router.get('/spreadshield/nearby', async (req, res) => {
    let placesArray = []
/*     try {

        let amadeus = new Amadeus({
            clientId: process.env.AMADEUS_API_KEY,
            clientSecret: process.env.AMADEUS_API_SECRET
        });
        
        await amadeus.referenceData.locations.pointsOfInterest.get({
            // longitude: 28.847137,
            // latitude: -82.004051
              longitude: 2.160873,
            latitude: 41.397158
        }).then(function (response) {

            response.data.forEach(place => {
                
                // console.log(place)
                // console.log('Place: ' + place.name )
                // console.log(`Latitude: ${place.geoCode.latitude}`)
                // console.log(`Longitute: ${place.geoCode.longitude}`)
                placesArray.push({
                    place: place.name,
                    lat: place.geoCode.latitude,
                    long: place.geoCode.longitude
                })
            })
            return amadeus.next(response);
        }).then(function (nextPage) {
            //console.log(nextPage);
        });
    } catch (error) {
        //console.log(error);
    }
    
    console.table(placesArray)     */

    /* const dotenv = require('dotenv').config();
    const CLIENT_ID = dotenv.FOURSQUARE_CLIENT_ID;
    const CLIENT_SECRET = dotenv.FOURSQUARE_CLIENT_SECRET; */


/* FOURSQUARE_CLIENT_ID="BAVW34WNTJEZ2HC1HIB4R5VCGAORU2N0GNGZ1OOPCYWSBD1Y",
FOURSQUARE_CLIENT_SECRET="5AEIKFIMLUVNRTWXDLOVWHE3BVMXIOCQH2DX4BGXLLEIW0H4"
    FOURSQUARE_API_KEY ="fsq3JlyvV30Lm9ZN7+HNXFk86n1/iswy59C+VMufKYlV4rc=" */
/* 
     sdk['places-nearby']({
         ll: '28.84,-82.00',
        // Authorization: 'fsq3WJl5PYQg1Hie12BgyP7EhQ9hRSdoVo0SWdsD5jJWPUE='
         Authorization: 'fsq3JlyvV30Lm9ZN7+HNXFk86n1/iswy59C+VMufKYlV4rc='
        // Authorization: process.env.FOURSQUARE_API_KEY
    })
        .then(res => {

            
            console.log(res)
        })
        .catch(err => console.error(err)); */

/* 
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: 'fsq3JlyvV30Lm9ZN7+HNXFk86n1/iswy59C+VMufKYlV4rc='
        }
    };

    fetch('https://api.foursquare.com/v3/places/nearby?ll=28.84%2C-82.00&limit=30', options)
        .then(response => response.json())
        .then(places => {
            console.log(places.results)
            const nearbyPlaces = places.results
            categories = places.results[0].categories[0]
            console.log('Categories: ', categories)
        })
        .catch(err => console.error(err));
        */
 res.render('ar/spreadshield/nearby-places', { layout: 'ar/spreadshield/nearby-places', currentPageTitle: 'SpreadShield' });
/*      const options = {
        method: 'GET',
        url: 'https://api.foursquare.com/v3/places/nearby',
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
 */
 



})


module.exports = router;