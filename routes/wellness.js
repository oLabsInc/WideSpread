const express = require('express');
const router = express.Router();
const axios = require('axios')
// const { ensureAuthenticated } = require('../config/auth');
const connectEnsureLogin = require('connect-ensure-login')
const ensureAuthenticated = connectEnsureLogin.ensureLoggedIn({ redirectTo: '/users/login' })


/* Models */
const User = require('../models/User');
const UserAudio = require('../models/UserAudio');
const Exercise = require('../models/Exercise');
const Workout = require('../models/Workout');
const WorkoutSchedule = require('../models/WorkoutSchedule');

/* HOME */

router.get('/', async (req, res) => {
    res.render('wellness/home', {subZone: "Home", zone: 'Wellness'})
});




/* FITNESS */

router.get('/fitness', async (req, res) => {
    res.render('wellness/fitness', {subZone: "Fitness", zone: 'Wellness', subZonePage: 'Home'})
});

router.get('/fitness/workout', ensureAuthenticated, async (req, res) => {
    console.log('user: ', res)
    const workouts = await Workout.find({});
    const workoutSchedule = await WorkoutSchedule.findOne({ user: { $eq: req.user } }).populate('sunday').populate('monday').populate('monday').populate('tuesday').populate('wednesday').populate('thursday').populate('friday').populate('saturday').exec()
    res.render('wellness/fitness/workout-home', {subZone: "Fitness", zone: 'Wellness', subZonePage: 'Workout', workouts, workoutSchedule})
    
});

router.get('/fitness/workout/user/:id', ensureAuthenticated, async (req, res) => {
    const user = req.user.id;
    const workouts = await Workout.find({});
    const workoutSchedule = await WorkoutSchedule.findOne({ user: { $eq: user } }).populate('sunday').populate('monday').populate('monday').populate('tuesday').populate('wednesday').populate('thursday').populate('friday').populate('saturday').exec()
    res.render('wellness/fitness/workout', {subZone: "Fitness", zone: 'Wellness', subZonePage: 'Workout', workouts, workoutSchedule})
});







router.get('/fitness/exercises', ensureAuthenticated, async (req, res) => {
    const user = req.user
    const allExercises = await Workout.find().sort({ exercise: -1 })
    const workoutSchedule = await WorkoutSchedule.findOne({ user: { $eq: user } }).populate('sunday').populate('monday').populate('monday').populate('tuesday').populate('wednesday').populate('thursday').populate('friday').populate('saturday').exec()
    res.render('wellness/fitness/exercises', {workoutSchedule, allExercises, subZone: "Fitness", zone: 'Wellness', subZonePage: 'Exercises'})
});

router.get('/fitness/exercises/add', async (req, res) => {
    res.render('wellness/fitness/exercises-add', {subZone: "Fitness", zone: 'Wellness', subZonePage: 'Add Exercises'})
});

router.post('/fitness/exercises/add', async (req, res) => {
    const data = req.body
    const newExercise = new Workout(data)
    newExercise.save()
    res.redirect('/wellness/fitness/exercises')
});


router.post('/fitness/plans/add-schedule', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id;
    const newSchedule = new WorkoutSchedule({
        user: userId
    });
    newSchedule.save();
    res.redirect(`/wellness/fitness/workout`);
})




router.get('/fitness/plan', async (req, res) => {
    res.render('wellness/fitness/plan', {subZone: "Fitness", zone: 'Wellness', subZonePage: 'Plan'})
});




// router.get('/fitness/plan/session/day/:day', async (req, res) => {
//     const day = req.params.day
//     const userId = req.user
//     let workout
//     const sessions = await WorkoutSchedule.find({ user: userId }).populate(['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']).exec()
//     res.render('wellness/fitness/session', {sessions, workout, subZone: "Fitness", zone: 'Wellness', subZonePage: 'Sessions'})
// });



router.get('/fitness/plan/session/day/sunday', ensureAuthenticated, async (req, res) => {
    const user = req.user.id;
    const workout = await WorkoutSchedule.findOne({user: {$eq: user}}).select('sunday').populate('sunday').exec()
    console.log('workout: ', workout)
    res.render('wellness/fitness/session', {workout, day: "Sunday", subZone: "Fitness", zone: 'Wellness', subZonePage: 'Plan'})
});

router.get('/fitness/plan/session/day/monday', ensureAuthenticated, async (req, res) => {
    const user = req.user.id;

    const workout = await WorkoutSchedule.findOne({user: {$eq: user}}).select('monday').populate('monday').exec()

    res.render('wellness/fitness/session', {workout, day: "Monday", subZone: "Fitness", zone: 'Wellness', subZonePage: 'Plan'})
});

router.get('/fitness/plan/session/day/tuesday', ensureAuthenticated, async (req, res) => {
    const user = req.user.id;

    const workout = await WorkoutSchedule.findOne({user: {$eq: user}}).select('tuesday').populate('tuesday').exec()

    res.render('wellness/fitness/session', {workout, day: "Tuesday", subZone: "Fitness", zone: 'Wellness', subZonePage: 'Plan'})
});

router.get('/fitness/plan/session/day/wednesday', ensureAuthenticated, async (req, res) => {
    const user = req.user.id;

    const workout = await WorkoutSchedule.findOne({user: {$eq: user}}).select('wednesday').populate('wednesday').exec()

    res.render('wellness/fitness/session', {workout, day: "Wednesday", subZone: "Fitness", zone: 'Wellness', subZonePage: 'Plan'})
});

router.get('/fitness/plan/session/day/thursday', ensureAuthenticated, async (req, res) => {
    const user = req.user.id;

    const workout = await WorkoutSchedule.findOne({user: {$eq: user}}).select('thursday').populate('thursday').exec()

    res.render('wellness/fitness/session', {workout, day: "Thursday", subZone: "Fitness", zone: 'Wellness', subZonePage: 'Plan'})
});

router.get('/fitness/plan/session/day/friday', ensureAuthenticated, async (req, res) => {
    const user = req.user.id;

    const workout = await WorkoutSchedule.findOne({user: {$eq: user}}).select('friday').populate('friday').exec()

    res.render('wellness/fitness/session', {workout, day: "Friday", subZone: "Fitness", zone: 'Wellness', subZonePage: 'Plan'})
});

router.get('/fitness/plan/session/day/saturday', ensureAuthenticated, async (req, res) => {
    const user = req.user.id;

    const workout = await WorkoutSchedule.findOne({user: {$eq: user}}).select('saturday').populate('saturday').exec()

    res.render('wellness/fitness/session', {workout, day: "Saturday", subZone: "Fitness", zone: 'Wellness', subZonePage: 'Plan'})
});

router.get('/fitness/plan/session/day/:day/edit', ensureAuthenticated, async (req, res) => {
    const day = req.params.day
    const user = req.user.id
    const exercises = await Workout.find()
    const workouts = await WorkoutSchedule.findOne({ user: { $eq: user } }).select(day.toString()).populate(day.toString()).exec()
    
        res.render('wellness/fitness/workout-edit', {exercises, workouts, day, subZone: "Fitness", zone: 'Wellness', subZonePage: 'Edit Workout'})
    
})
router.patch('/fitness/plan/session/day/sunday/add', async (req, res) => {
    const userId = req.user.id;
    const exercisesAdded = req.body.sunday;
    console.log(req.body)
    const added = await WorkoutSchedule.findOneAndUpdate({user: userId},
                { $addToSet: { sunday: exercisesAdded } },
                {safe: true, upsert: true},
                function(err, doc) {
                    if(err){
                        console.log(err);
                    }else{
                        0
                        return
                    }
                }
            )
    added.save()
    res.redirect('/wellness/fitness/workout')
});

router.patch('/fitness/plan/session/day/monday/add', async (req, res) => {
    const userId = req.user.id;
    const exercisesAdded = req.body.monday;
    const added = await WorkoutSchedule.findOneAndUpdate({user: userId},
                { $addToSet: { monday: exercisesAdded } },
                {safe: true, upsert: true},
                function(err, doc) {
                    if(err){
                        console.log(err);
                    }else{
                        0
                        return
                    }
                }
            )
    added.save()
    res.redirect('/wellness/fitness/workout')
});

router.patch('/fitness/plan/session/day/tuesday/add', async (req, res) => {
    const userId = req.user.id;
    const exercisesAdded = req.body.tuesday;
    const added = await WorkoutSchedule.findOneAndUpdate({user: userId},
                { $addToSet: { tuesday: exercisesAdded } },
                {safe: true, upsert: true},
                function(err, doc) {
                    if(err){
                        console.log(err);
                    }else{
                        0
                        return
                    }
                }
            )
    added.save()
    res.redirect('/wellness/fitness/workout')
});

router.patch('/fitness/plan/session/day/wednesday/add', async (req, res) => {
    const userId = req.user.id;
    const exercisesAdded = req.body.wednesday;
    const added = await WorkoutSchedule.findOneAndUpdate({user: userId},
                { $addToSet: { wednesday: exercisesAdded } },
                {safe: true, upsert: true},
                function(err, doc) {
                    if(err){
                        console.log(err);
                    }else{
                        0
                        return
                    }
                }
            )
    added.save()
    res.redirect('/wellness/fitness/workout')
});

router.patch('/fitness/plan/session/day/thursday/add', async (req, res) => {
    const userId = req.user.id;
    const exercisesAdded = req.body.thursday;
    const added = await WorkoutSchedule.findOneAndUpdate({user: userId},
                { $addToSet: { thursday: exercisesAdded } },
                {safe: true, upsert: true},
                function(err, doc) {
                    if(err){
                        console.log(err);
                    }else{
                        0
                        return
                    }
                }
            )
    added.save()
    res.redirect('/wellness/fitness/workout')
});

router.patch('/fitness/plan/session/day/friday/add', async (req, res) => {
    const userId = req.user.id;
    const exercisesAdded = req.body.friday;
    const added = await WorkoutSchedule.findOneAndUpdate({user: userId},
                { $addToSet: { friday: exercisesAdded } },
                {safe: true, upsert: true},
                function(err, doc) {
                    if(err){
                        console.log(err);
                    }else{
                        0
                        return
                    }
                }
            )
    added.save()
    res.redirect('/wellness/fitness/workout')
});

router.patch('/fitness/plan/session/day/saturday/add', async (req, res) => {
    const userId = req.user.id;
    const exercisesAdded = req.body.saturday;
    const added = await WorkoutSchedule.findOneAndUpdate({user: userId},
                { $addToSet: { saturday: exercisesAdded } },
                {safe: true, upsert: true},
                function(err, doc) {
                    if(err){
                        console.log(err);
                    }else{
                        0
                        return
                    }
                }
            )
    added.save()
    res.redirect('/wellness/fitness/workout')
});


router.post('/fitness/plan/session/day/sunday/update/:exerciseId', async (req, res) => {
    const exerciseId = req.params.exerciseId
    const userId = req.user.id

    const newExerciseSession = new Exercise({
        for_user: userId,
        exercise: req.body.exercise,
        exercise_id: exerciseId,
        set1: {
            weight: req.body.weight1,
            reps: req.body.reps1
        },
        set2: {
            weight: req.body.weight2,
            reps: req.body.reps2
        },
        set3: {
            weight: req.body.weight3,
            reps: req.body.reps3
        },
        set4: {
            weight: req.body.weight4,
            reps: req.body.reps4
        },
        set5: {
            weight: req.body.weight5,
            reps: req.body.reps5
        },
        date: Date.now()

    })
    newExerciseSession.save()
    res.redirect(`/wellness/fitness/plan/session/day/sunday`)
})


router.post('/fitness/plan/session/day/monday/update/:exerciseId', async (req, res) => {
    const exerciseId = req.params.exerciseId
    const userId = req.user.id

    const newExerciseSession = new Exercise({
        for_user: userId,
        exercise: req.body.exercise,
        exercise_id: exerciseId,
        set1: {
            weight: req.body.weight1,
            reps: req.body.reps1
        },
        set2: {
            weight: req.body.weight2,
            reps: req.body.reps2
        },
        set3: {
            weight: req.body.weight3,
            reps: req.body.reps3
        },
        set4: {
            weight: req.body.weight4,
            reps: req.body.reps4
        },
        set5: {
            weight: req.body.weight5,
            reps: req.body.reps5
        },
        date: Date.now()

    })
    newExerciseSession.save()
    res.redirect(`/wellness/fitness/plan/session/day/monday`)
})



router.post('/fitness/plan/session/day/wednesday/update/:exerciseId', async (req, res) => {
    const exerciseId = req.params.exerciseId
    const userId = req.user.id

    const newExerciseSession = new Exercise({
        for_user: userId,
        exercise: req.body.exercise,
        exercise_id: exerciseId,
        set1: {
            weight: req.body.weight1,
            reps: req.body.reps1
        },
        set2: {
            weight: req.body.weight2,
            reps: req.body.reps2
        },
        set3: {
            weight: req.body.weight3,
            reps: req.body.reps3
        },
        set4: {
            weight: req.body.weight4,
            reps: req.body.reps4
        },
        set5: {
            weight: req.body.weight5,
            reps: req.body.reps5
        },
        date: Date.now()

    })
    newExerciseSession.save()
    res.redirect(`/wellness/fitness/plan/session/day/wednesday`)
})


router.post('/fitness/plan/session/day/thursday/update/:exerciseId', async (req, res) => {
    const exerciseId = req.params.exerciseId
    const userId = req.user.id

    const newExerciseSession = new Exercise({
        for_user: userId,
        exercise: req.body.exercise,
        exercise_id: exerciseId,
        set1: {
            weight: req.body.weight1,
            reps: req.body.reps1
        },
        set2: {
            weight: req.body.weight2,
            reps: req.body.reps2
        },
        set3: {
            weight: req.body.weight3,
            reps: req.body.reps3
        },
        set4: {
            weight: req.body.weight4,
            reps: req.body.reps4
        },
        set5: {
            weight: req.body.weight5,
            reps: req.body.reps5
        },
        date: Date.now()

    })
    newExerciseSession.save()
    res.redirect(`/wellness/fitness/plan/session/day/thursday`)
})


router.post('/fitness/plan/session/day/friday/update/:exerciseId', async (req, res) => {
    const exerciseId = req.params.exerciseId
    const userId = req.user.id

    const newExerciseSession = new Exercise({
        for_user: userId,
        exercise: req.body.exercise,
        exercise_id: exerciseId,
        set1: {
            weight: req.body.weight1,
            reps: req.body.reps1
        },
        set2: {
            weight: req.body.weight2,
            reps: req.body.reps2
        },
        set3: {
            weight: req.body.weight3,
            reps: req.body.reps3
        },
        set4: {
            weight: req.body.weight4,
            reps: req.body.reps4
        },
        set5: {
            weight: req.body.weight5,
            reps: req.body.reps5
        },
        date: Date.now()

    })
    newExerciseSession.save()
    res.redirect(`/wellness/fitness/plan/session/day/friday`)
})


router.post('/fitness/plan/session/day/tuesday/update/:exerciseId', async (req, res) => {
    const exerciseId = req.params.exerciseId
    const userId = req.user.id

    const newExerciseSession = new Exercise({
        for_user: userId,
        exercise: req.body.exercise,
        exercise_id: exerciseId,
        set1: {
            weight: req.body.weight1,
            reps: req.body.reps1
        },
        set2: {
            weight: req.body.weight2,
            reps: req.body.reps2
        },
        set3: {
            weight: req.body.weight3,
            reps: req.body.reps3
        },
        set4: {
            weight: req.body.weight4,
            reps: req.body.reps4
        },
        set5: {
            weight: req.body.weight5,
            reps: req.body.reps5
        },
        date: Date.now()

    })
    newExerciseSession.save()
    res.redirect(`/wellness/fitness/plan/session/day/tuesday`)
})


router.post('/fitness/plan/session/day/saturday/update/:exerciseId', async (req, res) => {
    const exerciseId = req.params.exerciseId
    const userId = req.user.id

    const newExerciseSession = new Exercise({
        for_user: userId,
        exercise: req.body.exercise,
        exercise_id: exerciseId,
        set1: {
            weight: req.body.weight1,
            reps: req.body.reps1
        },
        set2: {
            weight: req.body.weight2,
            reps: req.body.reps2
        },
        set3: {
            weight: req.body.weight3,
            reps: req.body.reps3
        },
        set4: {
            weight: req.body.weight4,
            reps: req.body.reps4
        },
        set5: {
            weight: req.body.weight5,
            reps: req.body.reps5
        },
        date: Date.now()

    })
    newExerciseSession.save()
    res.redirect(`/wellness/fitness/plan/session/day/saturday`)
})




router.get('/fitness/history', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id
    const workoutHistory = await Exercise.find({for_user: userId}).populate('exercise_id').exec()
    res.render('wellness/fitness/history', { subZone: "Fitness", zone: 'Wellness', subZonePage: 'History', workoutHistory })
});

router.get('/fitness/help', async (req, res) => {
    res.render('wellness/fitness/help', {subZone: "Fitness", zone: 'Wellness', subZonePage: 'Help'})
});



/* YOGA */

router.get('/yoga', async (req, res) => {
    res.render('wellness/yoga', {subZone: "Yoga", zone: 'Wellness', subZonePage: 'Home'})
});

router.get('/yoga/learn', async (req, res) => {
    res.render('wellness/yoga/learn', {subZone: "Yoga", zone: 'Wellness', subZonePage: 'Learn'})
});

router.get('/yoga/classes', async (req, res) => {
    res.render('wellness/yoga/classes', {subZone: "Yoga", zone: 'Wellness', subZonePage: 'Classes'})
});

router.get('/yoga/news', async (req, res) => {
    res.render('wellness/yoga/news', {subZone: "Yoga", zone: 'Wellness', subZonePage: 'News'})
});

router.get('/yoga/history', async (req, res) => {
    res.render('wellness/yoga/history', {subZone: "Yoga", zone: 'Wellness', subZonePage: 'History'})
});

router.get('/yoga/help', async (req, res) => {
    res.render('wellness/yoga/help', {subZone: "Yoga", zone: 'Wellness', subZonePage: 'Help'})
});




/* NUTRITION */

router.get('/nutrition', async (req, res) => {
    res.render('wellness/nutrition', {subZonePage: 'Home', subZone: "Nutrition", zone: 'Wellness'})
});



router.post('/nutrition/search', (req, res) => {
    const query = req.body.search;
    const convertedString = query.replace(/\s/g, '%20');

    res.redirect(`/wellness/nutrition/search/${convertedString}`);
});

router.get('/nutrition/search/:query', (req, res) => {
    const query = req.params.query;
    const apiKey = process.env.DATA_GOV_API_KEY;
    const options = {
        method: 'GET',
        url: `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}&query=${query}`
    };
    axios.request(options).then(function (response) {
        const returnedData = response.data;

        res.render('wellness/nutrition/search-results', { subZonePage: 'Food', subZone: "Nutrition", zone: 'Wellness', returnedData });
    }).catch(function (error) {
        console.error(error);
    });

})



router.get('/nutrition/food', async (req, res) => {
    res.render('wellness/nutrition/food', { subZonePage: 'Food', subZone: "Nutrition", zone: 'Wellness' })
});

router.get('/nutrition/food/:foodId', (req, res) => {
    const foodId = req.params.foodId;
    const apiKey = process.env.DATA_GOV_API_KEY;
    const options = {
        method: 'GET',
        url: `https://api.nal.usda.gov/fdc/v1/food/${foodId}?api_key=${apiKey}`
    };

    axios.request(options).then(function (response) {
        const returnedData = response.data;

        res.render('wellness/nutrition/item', { subZonePage: 'Food', subZone: "Nutrition", zone: 'Wellness', returnedData });
    }).catch(function (error) {
        console.error(error);
    });


})




router.get('/nutrition/diet', async (req, res) => {
    res.render('wellness/nutrition/diet', {subZonePage: 'Diet', subZone: "Nutrition", zone: 'Wellness'})
});



router.get('/nutrition/menu', async (req, res) => {
    res.render('wellness/nutrition/menu', {subZonePage: 'Menu', subZone: "Nutrition", zone: 'Wellness'})
});


router.get('/nutrition/history', async (req, res) => {
    res.render('wellness/nutrition/history', {subZonePage: 'History', subZone: "Nutrition", zone: 'Wellness'})
});


router.get('/nutrition/help', async (req, res) => {
    res.render('wellness/nutrition/help', {subZonePage: 'Help', subZone: "Nutrition", zone: 'Wellness'})
});




/* HEALTH */

router.get('/health', (req, res) => {
    res.render('wellness/health', {subZone: "Health", zone: 'Wellness', subZonePage: 'Your Health'})
});

router.get('/health/appointments', (req, res) => {
    res.render('wellness/health/appointments', {subZone: "Health", zone: 'Wellness', subZonePage: 'Appointments'})
});

router.get('/health/specialists', (req, res) => {
    res.render('wellness/health/specialists', {subZone: "Health", zone: 'Wellness', subZonePage: 'Specialists'})
});

router.get('/health/research', (req, res) => {
    res.render('wellness/health/research', {subZone: "Health", zone: 'Wellness', subZonePage: 'Research'})
});

router.get('/health/learn', (req, res) => {
    res.render('wellness/health/learn', {subZone: "Health", zone: 'Wellness', subZonePage: 'Learn'})
});

router.get('/health/history', (req, res) => {
    res.render('wellness/health/history', {subZone: "Health", zone: 'Wellness', subZonePage: 'History'})
});

router.get('/health/help', (req, res) => {
    res.render('wellness/health/help', {subZone: "Health", zone: 'Wellness', subZonePage: 'Help'})
});



/* NEWS */

router.get('/news', (req, res) => {
    res.render('wellness/news', {subZone: "News", zone: 'Wellness', subZonePage: 'Top'})
});

router.get('/news/new', (req, res) => {
    res.render('wellness/news/new', {subZone: "News", zone: 'Wellness', subZonePage: 'New'})
});

router.get('/news/categories', (req, res) => {
    res.render('wellness/news/categories', {subZone: "News", zone: 'Wellness', subZonePage: 'Categories'})
});




/* HELP */

router.get('/help', (req, res) => {
    res.render('wellness/help/all-categories', {subZone: "Help", zone: 'Wellness', subZonePage: 'Categories'})
});

router.get('/help/request', (req, res) => {
    res.render('wellness/help/request', {subZone: "Help", zone: 'Wellness', subZonePage: 'Contact Us'})
});


module.exports = router;