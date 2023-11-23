<<<<<<< HEAD
const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
// const { ensureAuthenticated } = require('../config/auth');

const axios = require('axios')

/* Models */
const User = require('../models/User');
const Course = require('../models/Course');
const CurrentCourse = require('../models/CurrentCourse');
const Class = require('../models/Class');
const LearningPoint = require('../models/LearningPoint');
const Flashcard = require('../models/Flashcard');
const Quiz = require('../models/Quiz');
const QuizAnswers = require('../models/QuizAnswers');
const Note = require('../models/Note');
const Notebook = require('../models/Notebook');
const NotebookSection = require('../models/NotebookSection');

const connectEnsureLogin = require('connect-ensure-login')
const ensureAuthenticated = connectEnsureLogin.ensureLoggedIn({ redirectTo: '/users/login' })


router.get('/', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id
    const allCourses = await Course.find()
    const savedCourses = await CurrentCourse.find({"user_id": {$eq: userId}}).populate('course_id').exec()
    const allQuizzes = await QuizAnswers.find({ user_id: userId })
    console.log('ALL QUIZZEZ')
    console.log(allQuizzes)
    res.render('academy/home', {subZone: 'Home', zone: 'Academy', savedCourses, allQuizzes, allCourses})
});

router.get('/create-new-course', ensureAuthenticated, async (req, res) => {
    const allCourses = await Course.find()
    res.render('academy/courses/create-new-course', {allCourses})
})

 router.post('/create/course', ensureAuthenticated, async (req, res) => {
     const courseData = req.body
     const newCourse = new Course({
         course_creator: req.user.id,
         name: courseData.name,
         subject: courseData.subject,
         prerequisites: courseData.prerequisites,
         description: courseData.description,
         difficulty: courseData.difficulty,
         credit_value: courseData.credit_value,
         "course_colors.main": courseData.color,
     })
     newCourse.save()
     const newCourseId = newCourse.id
     res.redirect(`/academy/course/${newCourseId}`)
 })
/* COURSES */

router.get('/all-courses', ensureAuthenticated, async (req, res) => {
    const courses = await Course.find().populate(['classes', 'prerequisites']).exec();
    const currentCourses = await CurrentCourse.find({user_id: req.user.id})
    console.log(courses)
    res.render('academy/courses/all-courses', { subZone: 'Courses', zone: 'Academy', subZonePage: 'Home', courses, currentCourses})
});

router.get('/explore/course/:courseId', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id
    const courseId = req.params.courseId
    const course = await Course.findById(courseId).populate('classes').exec()
    const thisCourse = await CurrentCourse.findOne({ user_id: userId, course_id: courseId })
    res.render('academy/courses/explore-course', { subZone: 'Courses', zone: 'Academy', subZonePage: 'Explore', currentPage: `Explore ${course.name}`, course, thisCourse})
})
router.get('/saved-courses', async (req, res) => {
    const userId = req.user
    const courses = await CurrentCourse.find({"user_id": {$eq: userId}}).populate({
        path: 'course_id',
        model: 'Course',
        populate: {
            path: 'classes',
            model: 'Class'
        }
    }).exec();
    console.log(courses)
    res.render('academy/courses/saved-courses', { subZone: 'Courses', zone: 'Academy', subZonePage: 'Home', courses})
});

router.get('/course/:courseId', ensureAuthenticated, async (req, res) => {
    const userId = req.user
    const user = await User.findById(userId)
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId).populate(['classes', 'course_creator']).exec();
    const classes = await Class.find({"in_course": {$eq: courseId}})
    const courses = await Course.find()
    const notebook = await Notebook.findOne({notebook_owner: userId, for_course: courseId})

    if (notebook) {
        const notebookSections = await NotebookSection.find({notebook_id: notebook.id})
        const currentCourses = await CurrentCourse.find({user_id: {$eq: userId}}).populate('user_id').exec()
        const thisCourse = await CurrentCourse.findOne({user_id: userId, course_id: courseId})
        const allQuizzes = await QuizAnswers.find({user_id: userId, course_id: courseId})
        console.log('All Quizzes: ' + allQuizzes)
        console.log(thisCourse)
        
        
        res.render('academy/courses/course-main', { subZone: 'Courses', zone: 'Academy', subZonePage: course.course, currentPage: 'Home', course, currentCourses, thisCourse, courseId, classes, user, allQuizzes, notebook, notebookSections})
        
    } else {
        const notebookSections = null
        const currentCourses = await CurrentCourse.find({user_id: {$eq: userId}}).populate('user_id').exec()
        const thisCourse = await CurrentCourse.findOne({user_id: userId, course_id: courseId})
        const allQuizzes = await QuizAnswers.find({user_id: userId, course_id: courseId})
        console.log('All Quizzes: ' + allQuizzes)
        console.log(thisCourse)
        
    
        res.render('academy/courses/course-main', { subZone: 'Courses', zone: 'Academy', subZonePage: course.course, currentPage: 'Home', course, currentCourses, thisCourse, courseId, classes, user, allQuizzes, notebook, notebookSections})

    }
});



router.get('/course/:courseId/action/add', ensureAuthenticated, async (req, res) => {
    const courseId = req.params.courseId;
    const userId = req.user.id

    const courseData = await Course.findById(courseId)
    const addCourse = new CurrentCourse({
        course_id: courseId,
        user_id: userId,
    })
    console.log(addCourse.academy_info)
    addCourse.save();    

    const newNotebook = await new Notebook({
        notebook_owner: userId,
        for_course: courseId,
        name: courseData.name,
        description: courseData.description,
        color: courseData.course_colors.main,
        tags: courseData.tags
    })
    newNotebook.save()
    res.redirect(`/academy/course/${courseId}`)
})

router.get('/course/:courseId/class/:classId/notebook/:notebookId/action/notebook-section/create', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id
    const courseId = req.params.courseId
    const classId = req.params.classId
    const notebookId = req.params.notebookId

    const className = await Class.findById(classId)
    const newSection = new NotebookSection({
        notebook_id: notebookId,
        title: className.name
    })
    newSection.save()
    res.redirect(req.get('referer'));
})

router.post('/:notebookId/:sectionId/add/note/title/:noteTitle', ensureAuthenticated, async (req, res) => {
    const notebookId = req.params.notebookId
    const sectionId = req.params.sectionId
    console.log('sectionId: ', sectionId)
    const spreadData = req.body
    console.log(spreadData)
    const noteTitleChain = req.params.noteTitle
    const noteTitle = noteTitleChain.replaceAll('+', ' ');
    const newNote = new Note({
        notebook_id: notebookId,
        section_id: sectionId,
        title: noteTitle,
        body: req.body.noteBody,
        tags: req.body.tags,
        references: req.body.references
    })
    newNote.save()
    console.log('newNote: ', newNote)

    res.redirect(req.get('referer'));
})


/* CLASSES */

router.get('/course/:courseId/action/class/add', ensureAuthenticated, async (req, res) => {
    const courseId = req.params.courseId
    const course = await Course.findById(courseId)
    res.render('admin/academy/add-class', {course})
})

router.post('/course/:courseId/action/class/add', ensureAuthenticated, async (req, res) => {
    const courseId = req.params.courseId
    const course = await Course.findById(courseId)
    const newClass = await new Class({
        class_creator: req.user.id,
        name: req.body.name,
        description: req.body.description,
        toolbox: req.body.toolbox,
        class_color: req.body.class_color
    })
    newClass.save()

    await Course.findByIdAndUpdate(courseId, 
        {$addToSet: {"classes": newClass.id}},
        {safe: true, upsert: true},
        function (err, doc) {
            if (err) {
                console.log(err)
            } else {
                return
            }
        }
    )

    res.redirect(`/academy/course/${courseId}`)
})


router.get('/course/:courseId/class/:classId', ensureAuthenticated, async (req, res) => {
    const courseId = req.params.courseId;
    const userId = req.user.id;
    const notebook = await Notebook.findOne({ notebook_owner: userId, for_course: courseId })
    const notebookSection = await NotebookSection.findOne({ notebook_id: notebook.id })
    if (!notebookSection) {
        const courseId = req.params.courseId;
        const userId = req.user.id;
        const classId = req.params.classId;
        const course = await Course.findById(courseId).populate('classes').exec();
        const className = await Class.findById(classId).populate('class_creator').exec();
        const flashcards = await Flashcard.find({'class': {$eq: classId}})
        const notebook = await Notebook.findOne({ notebook_owner: userId, for_course: courseId })
        console.log('notebook.id: ', notebook.id)
        const notebookSection = await NotebookSection.findOne({ notebook_id: notebook.id })
        const learningPoints = await LearningPoint.find({"class": { $eq: classId } })
        const quizzes = await Quiz.findOne({'for_class': {$eq: classId}})
        const allQuizzes = await QuizAnswers.findOne({ user_id: userId, course_id: courseId, class_id: classId })
        const notes = null
        res.render('academy/courses/class-main', { subZone: 'Courses', zone: 'Academy', subZonePage: course.course, currentPage: className.name, course, className, learningPoints, quizzes, allQuizzes, userId, flashcards, notebook, notebookSection, notes })

    } else {
        const courseId = req.params.courseId;
        const userId = req.user.id;
        const classId = req.params.classId;
        const course = await Course.findById(courseId).populate('classes').exec();
        const className = await Class.findById(classId).populate('class_creator').exec();
        const flashcards = await Flashcard.find({ 'class': { $eq: classId } })
        const notebook = await Notebook.findOne({ notebook_owner: userId, for_course: courseId })
        console.log('notebook.id: ', notebook.id)
        const notebookSection = await NotebookSection.findOne({ notebook_id: notebook.id })
        const learningPoints = await LearningPoint.find({ "class": { $eq: classId } })
        const quizzes = await Quiz.findOne({ 'for_class': { $eq: classId } })
        const allQuizzes = await QuizAnswers.findOne({ user_id: userId, course_id: courseId, class_id: classId })
        const notes = await Note.find({section_id: notebookSection.id}).populate('flashcards').exec()
        res.render('academy/courses/class-main', { subZone: 'Courses', zone: 'Academy', subZonePage: course.course, currentPage: className.name, course, className, learningPoints, quizzes, allQuizzes, userId, flashcards, notebook, notebookSection, notes})
    }

});

router.post('/course/:courseId/class/:classId', ensureAuthenticated, async (req, res) => {
    const courseId = req.params.courseId;
    const userId = req.user;
    const classId = req.params.classId;
    console.table(flashcards)
    const course = await Course.findById(courseId).populate('classes').exec();
    const className = await Class.findById(classId);
    console.log(className)
    const learningPoints = await LearningPoint.find({"class": { $eq: classId } })
    const quizzes = await Quiz.findOne({'for_class': {$eq: classId}})
    const allQuizzes = await QuizAnswers.findOne({ user_id: userId, course_id: courseId, class_id: classId })
    console.log(allQuizzes)
    res.render('academy/courses/class-main', { subZone: 'Courses', zone: 'Academy', subZonePage: course.course, currentPage: className.name, course, className, learningPoints, quizzes, allQuizzes, userId, flashcards})

});



router.get('/course/:courseId/class/:classId/quiz/:quizId/take', ensureAuthenticated, async (req, res) => {
    const courseId = req.params.courseId;
    const classId = req.params.classId;
    const quizId = req.params.quizId;
    const course = await Course.findById(courseId).populate('classes').exec();
    const className = await Class.findById(classId);
    const quiz = await Quiz.findById(quizId);
    console.log(className)
    res.render('academy/courses/class-quiz', { subZone: 'Courses', zone: 'Academy', subZonePage: course.course, currentPage: className.name, course, className, quiz})

});

router.post('/course/:courseId/class/:classId/quiz/:quizId/submit', ensureAuthenticated, async (req, res) => {
    const courseId = req.params.courseId;
    const classId = req.params.classId;
    const quizId = req.params.quizId;
    const userId = req.user.id

    const allQuizzes = await QuizAnswers.find({ user_id: userId, course_id: courseId, quiz_id: quizId  })
    if (allQuizzes.length <= 0) {

    const takenQuiz = new QuizAnswers({
        quiz_id: quizId,
        user_id: userId,
        course_id: courseId,
        class_id: classId,
        grade: req.body.grade
    });
    await takenQuiz.save()
    res.redirect(`/academy/course/${courseId}/class/${classId}/quiz/${quizId}/submit/update-grade`)
    } else {
        const updateQuiz = await QuizAnswers.findOneAndUpdate({ user_id: userId, course_id: courseId, quiz_id: quizId },
            { $push: { quiz_scores: quizId } },
            { safe: true, upsert: true },
            function (err, doc) {
                if (err) {
                    console.log(err)
                } else {
                    return
                }
            }
        )
        updateQuiz.save()
        res.redirect(`/academy/course/${courseId}/class/${classId}/quiz/${quizId}/submit/update-grade`)
    }
})

router.get('/course/:courseId/class/:classId/quiz/:quizId/submit/update-grade', ensureAuthenticated, async (req, res) => {
    const courseId = req.params.courseId;
    const classId = req.params.classId;
    const quizId = req.params.quizId;
    const userId = req.user.id

    const quiz = await QuizAnswers.findOne({
        quiz_id: quizId,
        user_id: userId,
    });


    
    console.log(quiz)

    const addQuiz = await CurrentCourse.findOneAndUpdate({ course_id: courseId, user_id: userId }, 
        { $addToSet: { quiz_scores:quizId } },
        { safe: true, upsert: true, new: true },
        function (err, doc) {
            if (err) {
                console.log(err)
            } else {
                return
            }
        }
    )
    console.log('Quiz Added: ' + addQuiz)
    addQuiz.save()
    console.log('Quiz Added After Save: ' + addQuiz)
    res.redirect(`/academy/course/${courseId}/class/${classId}`)
})
/* RESOURCES */

router.get('/resources', (req, res) => {
    res.render('academy/resources/home', { subZone: 'Resources', zone: 'Academy' })
});

// Encyclopedia


router.get('/resources/encyclopedia', async (req, res) => {
    /* const searchTerm = req.params.term; */
    /* const options = {
        method: 'GET',
        url: `https://en.wikipedia.org/w/rest.php/v1/search/title?q=learn&limit=50`
    };

    await axios.request(options).then(function (response) {
        const returnedData = response.data;
        console.log(returnedData)
        res.render('academy/resources/encyclopedia', { returnedData, subZone: 'Resources', zone: 'Academy', subZonePage: 'Encyclopedia'});
    }).catch(function (error) {
        console.error(error);
    }); */
    const url = "https://en.wikipedia.org/w/api.php?" +
        new URLSearchParams({
            origin: "*",
            action: "parse",
            page: "Tensor calculus",
            format: "json",
        });

    try {
        const req = await fetch(url);
        const json = await req.json();
        const returnedData = json.parse.text["*"];
        res.render('academy/resources/encyclopedia', { returnedData, subZone: 'Resources', zone: 'Academy', subZonePage: 'Encyclopedia'});
    } catch (e) {
        console.error(e);
    }
});

router.post('/resources/encyclopedia/search', async (req, res) => {
    const searchTerm = req.body.search;
    const options = {
        method: 'GET',
        url: `https://en.wikipedia.org/w/rest.php/v1/search/title?q=${searchTerm}&limit=50`
    };

    await axios.request(options).then(function (response) {
        const returnedData = response.data;
        console.log(returnedData)
        res.render('academy/resources/encyclopedia', { returnedData, subZone: 'Resources', zone: 'Academy', subZonePage: 'Encyclopedia' });
    }).catch(function (error) {
        console.error(error);
    });
});

router.get('/resources/encyclopedia/:pageKey', async (req, res) => {
    const pageKey = req.params.pageKey;
    const options = {
        method: 'GET',
        url: `https://en.wikipedia.org/w/rest.php/v1/page/${pageKey}/html`
    };
    await axios.request(options).then(function (response) {
        const returnedData = response.data;
        console.log(returnedData)
        res.render('academy/resources/encyclopedia-result', { returnedData, subZone: 'Resources', zone: 'Academy', subZonePage: 'Encyclopedia' });
    }).catch(function (error) {
        console.error(error);
    });
});

router.get('/resources/encyclopedia/images/:pageKey', async (req, res) => {
    const pageKey = req.params.pageKey;
    const options = {
        method: 'GET',
        url: `https://en.wikipedia.org/w/rest.php/v1/page/${pageKey}/links/media`
    };
    await axios.request(options).then(function (response) {
        const returnedData = response.data;
        console.log(returnedData)
        res.render('academy/resources/encyclopedia-result', { returnedData, subZone: 'Resources', zone: 'Academy', subZonePage: 'Encyclopedia' });
    }).catch(function (error) {
        console.error(error);
    });
});
/* HOMEWORK */

router.get('/homework', (req, res) => {
    res.render('academy/homework/home', { subZone: 'Homework', zone: 'Academy' })
});


/* TESTS */

router.get('/tests', (req, res) => {
    res.render('academy/tests/home', { subZone: 'Tests', zone: 'Academy' })
});


/* STUDY */

router.get('/study', (req, res) => {
    res.render('academy/study/home', { subZone: 'Study', zone: 'Academy' })
});


/* HELP */

router.get('/help', (req, res) => {
    res.render('academy/help/home', { subZone: 'Help', zone: 'Academy' })
});

/* ICONS */
router.get('/icons', (req, res) => {
    res.render('academy/icons')
})




=======
const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
// const { ensureAuthenticated } = require('../config/auth');

const axios = require('axios')

/* Models */
const User = require('../models/User');
const Course = require('../models/Course');
const CurrentCourse = require('../models/CurrentCourse');
const Class = require('../models/Class');
const LearningPoint = require('../models/LearningPoint');
const Flashcard = require('../models/Flashcard');
const Quiz = require('../models/Quiz');
const QuizAnswers = require('../models/QuizAnswers');
const Note = require('../models/Note');
const Notebook = require('../models/Notebook');
const NotebookSection = require('../models/NotebookSection');

const connectEnsureLogin = require('connect-ensure-login')
const ensureAuthenticated = connectEnsureLogin.ensureLoggedIn({ redirectTo: '/users/login' })


router.get('/', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id
    const allCourses = await Course.find()
    const savedCourses = await CurrentCourse.find({"user_id": {$eq: userId}}).populate('course_id').exec()
    const allQuizzes = await QuizAnswers.find({ user_id: userId })
    console.log('ALL QUIZZEZ')
    console.log(allQuizzes)
    res.render('academy/home', {subZone: 'Home', zone: 'Academy', savedCourses, allQuizzes, allCourses})
});

router.get('/create-new-course', ensureAuthenticated, async (req, res) => {
    const allCourses = await Course.find()
    res.render('academy/courses/create-new-course', {allCourses})
})

 router.post('/create/course', ensureAuthenticated, async (req, res) => {
     const courseData = req.body
     const newCourse = new Course({
         course_creator: req.user.id,
         name: courseData.name,
         subject: courseData.subject,
         prerequisites: courseData.prerequisites,
         description: courseData.description,
         difficulty: courseData.difficulty,
         credit_value: courseData.credit_value,
         "course_colors.main": courseData.color,
     })
     newCourse.save()
     const newCourseId = newCourse.id
     res.redirect(`/academy/course/${newCourseId}`)
 })
/* COURSES */

router.get('/all-courses', ensureAuthenticated, async (req, res) => {
    const courses = await Course.find().populate(['classes', 'prerequisites']).exec();
    const currentCourses = await CurrentCourse.find({user_id: req.user.id})
    console.log(courses)
    res.render('academy/courses/all-courses', { subZone: 'Courses', zone: 'Academy', subZonePage: 'Home', courses, currentCourses})
});

router.get('/explore/course/:courseId', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id
    const courseId = req.params.courseId
    const course = await Course.findById(courseId).populate('classes').exec()
    const thisCourse = await CurrentCourse.findOne({ user_id: userId, course_id: courseId })
    res.render('academy/courses/explore-course', { subZone: 'Courses', zone: 'Academy', subZonePage: 'Explore', currentPage: `Explore ${course.name}`, course, thisCourse})
})
router.get('/saved-courses', async (req, res) => {
    const userId = req.user
    const courses = await CurrentCourse.find({"user_id": {$eq: userId}}).populate({
        path: 'course_id',
        model: 'Course',
        populate: {
            path: 'classes',
            model: 'Class'
        }
    }).exec();
    console.log(courses)
    res.render('academy/courses/saved-courses', { subZone: 'Courses', zone: 'Academy', subZonePage: 'Home', courses})
});

router.get('/course/:courseId', ensureAuthenticated, async (req, res) => {
    const userId = req.user
    const user = await User.findById(userId)
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId).populate(['classes', 'course_creator']).exec();
    const classes = await Class.find({"in_course": {$eq: courseId}})
    const courses = await Course.find()
    const notebook = await Notebook.findOne({notebook_owner: userId, for_course: courseId})

    if (notebook) {
        const notebookSections = await NotebookSection.find({notebook_id: notebook.id})
        const currentCourses = await CurrentCourse.find({user_id: {$eq: userId}}).populate('user_id').exec()
        const thisCourse = await CurrentCourse.findOne({user_id: userId, course_id: courseId})
        const allQuizzes = await QuizAnswers.find({user_id: userId, course_id: courseId})
        console.log('All Quizzes: ' + allQuizzes)
        console.log(thisCourse)
        
        
        res.render('academy/courses/course-main', { subZone: 'Courses', zone: 'Academy', subZonePage: course.course, currentPage: 'Home', course, currentCourses, thisCourse, courseId, classes, user, allQuizzes, notebook, notebookSections})
        
    } else {
        const notebookSections = null
        const currentCourses = await CurrentCourse.find({user_id: {$eq: userId}}).populate('user_id').exec()
        const thisCourse = await CurrentCourse.findOne({user_id: userId, course_id: courseId})
        const allQuizzes = await QuizAnswers.find({user_id: userId, course_id: courseId})
        console.log('All Quizzes: ' + allQuizzes)
        console.log(thisCourse)
        
    
        res.render('academy/courses/course-main', { subZone: 'Courses', zone: 'Academy', subZonePage: course.course, currentPage: 'Home', course, currentCourses, thisCourse, courseId, classes, user, allQuizzes, notebook, notebookSections})

    }
});



router.get('/course/:courseId/action/add', ensureAuthenticated, async (req, res) => {
    const courseId = req.params.courseId;
    const userId = req.user.id

    const courseData = await Course.findById(courseId)
    const addCourse = new CurrentCourse({
        course_id: courseId,
        user_id: userId,
    })
    console.log(addCourse.academy_info)
    addCourse.save();    

    const newNotebook = await new Notebook({
        notebook_owner: userId,
        for_course: courseId,
        name: courseData.name,
        description: courseData.description,
        color: courseData.course_colors.main,
        tags: courseData.tags
    })
    newNotebook.save()
    res.redirect(`/academy/course/${courseId}`)
})

router.get('/course/:courseId/class/:classId/notebook/:notebookId/action/notebook-section/create', ensureAuthenticated, async (req, res) => {
    const userId = req.user.id
    const courseId = req.params.courseId
    const classId = req.params.classId
    const notebookId = req.params.notebookId

    const className = await Class.findById(classId)
    const newSection = new NotebookSection({
        notebook_id: notebookId,
        title: className.name
    })
    newSection.save()
    res.redirect(req.get('referer'));
})

router.post('/:notebookId/:sectionId/add/note/title/:noteTitle', ensureAuthenticated, async (req, res) => {
    const notebookId = req.params.notebookId
    const sectionId = req.params.sectionId
    console.log('sectionId: ', sectionId)
    const spreadData = req.body
    console.log(spreadData)
    const noteTitleChain = req.params.noteTitle
    const noteTitle = noteTitleChain.replaceAll('+', ' ');
    const newNote = new Note({
        notebook_id: notebookId,
        section_id: sectionId,
        title: noteTitle,
        body: req.body.noteBody,
        tags: req.body.tags,
        references: req.body.references
    })
    newNote.save()
    console.log('newNote: ', newNote)

    res.redirect(req.get('referer'));
})


/* CLASSES */

router.get('/course/:courseId/action/class/add', ensureAuthenticated, async (req, res) => {
    const courseId = req.params.courseId
    const course = await Course.findById(courseId)
    res.render('admin/academy/add-class', {course})
})

router.post('/course/:courseId/action/class/add', ensureAuthenticated, async (req, res) => {
    const courseId = req.params.courseId
    const course = await Course.findById(courseId)
    const newClass = await new Class({
        class_creator: req.user.id,
        name: req.body.name,
        description: req.body.description,
        toolbox: req.body.toolbox,
        class_color: req.body.class_color
    })
    newClass.save()

    await Course.findByIdAndUpdate(courseId, 
        {$addToSet: {"classes": newClass.id}},
        {safe: true, upsert: true},
        function (err, doc) {
            if (err) {
                console.log(err)
            } else {
                return
            }
        }
    )

    res.redirect(`/academy/course/${courseId}`)
})


router.get('/course/:courseId/class/:classId', ensureAuthenticated, async (req, res) => {
    const courseId = req.params.courseId;
    const userId = req.user.id;
    const notebook = await Notebook.findOne({ notebook_owner: userId, for_course: courseId })
    const notebookSection = await NotebookSection.findOne({ notebook_id: notebook.id })
    if (!notebookSection) {
        const courseId = req.params.courseId;
        const userId = req.user.id;
        const classId = req.params.classId;
        const course = await Course.findById(courseId).populate('classes').exec();
        const className = await Class.findById(classId).populate('class_creator').exec();
        const flashcards = await Flashcard.find({'class': {$eq: classId}})
        const notebook = await Notebook.findOne({ notebook_owner: userId, for_course: courseId })
        console.log('notebook.id: ', notebook.id)
        const notebookSection = await NotebookSection.findOne({ notebook_id: notebook.id })
        const learningPoints = await LearningPoint.find({"class": { $eq: classId } })
        const quizzes = await Quiz.findOne({'for_class': {$eq: classId}})
        const allQuizzes = await QuizAnswers.findOne({ user_id: userId, course_id: courseId, class_id: classId })
        const notes = null
        res.render('academy/courses/class-main', { subZone: 'Courses', zone: 'Academy', subZonePage: course.course, currentPage: className.name, course, className, learningPoints, quizzes, allQuizzes, userId, flashcards, notebook, notebookSection, notes })

    } else {
        const courseId = req.params.courseId;
        const userId = req.user.id;
        const classId = req.params.classId;
        const course = await Course.findById(courseId).populate('classes').exec();
        const className = await Class.findById(classId).populate('class_creator').exec();
        const flashcards = await Flashcard.find({ 'class': { $eq: classId } })
        const notebook = await Notebook.findOne({ notebook_owner: userId, for_course: courseId })
        console.log('notebook.id: ', notebook.id)
        const notebookSection = await NotebookSection.findOne({ notebook_id: notebook.id })
        const learningPoints = await LearningPoint.find({ "class": { $eq: classId } })
        const quizzes = await Quiz.findOne({ 'for_class': { $eq: classId } })
        const allQuizzes = await QuizAnswers.findOne({ user_id: userId, course_id: courseId, class_id: classId })
        const notes = await Note.find({section_id: notebookSection.id}).populate('flashcards').exec()
        res.render('academy/courses/class-main', { subZone: 'Courses', zone: 'Academy', subZonePage: course.course, currentPage: className.name, course, className, learningPoints, quizzes, allQuizzes, userId, flashcards, notebook, notebookSection, notes})
    }

});

router.post('/course/:courseId/class/:classId', ensureAuthenticated, async (req, res) => {
    const courseId = req.params.courseId;
    const userId = req.user;
    const classId = req.params.classId;
    console.table(flashcards)
    const course = await Course.findById(courseId).populate('classes').exec();
    const className = await Class.findById(classId);
    console.log(className)
    const learningPoints = await LearningPoint.find({"class": { $eq: classId } })
    const quizzes = await Quiz.findOne({'for_class': {$eq: classId}})
    const allQuizzes = await QuizAnswers.findOne({ user_id: userId, course_id: courseId, class_id: classId })
    console.log(allQuizzes)
    res.render('academy/courses/class-main', { subZone: 'Courses', zone: 'Academy', subZonePage: course.course, currentPage: className.name, course, className, learningPoints, quizzes, allQuizzes, userId, flashcards})

});



router.get('/course/:courseId/class/:classId/quiz/:quizId/take', ensureAuthenticated, async (req, res) => {
    const courseId = req.params.courseId;
    const classId = req.params.classId;
    const quizId = req.params.quizId;
    const course = await Course.findById(courseId).populate('classes').exec();
    const className = await Class.findById(classId);
    const quiz = await Quiz.findById(quizId);
    console.log(className)
    res.render('academy/courses/class-quiz', { subZone: 'Courses', zone: 'Academy', subZonePage: course.course, currentPage: className.name, course, className, quiz})

});

router.post('/course/:courseId/class/:classId/quiz/:quizId/submit', ensureAuthenticated, async (req, res) => {
    const courseId = req.params.courseId;
    const classId = req.params.classId;
    const quizId = req.params.quizId;
    const userId = req.user.id

    const allQuizzes = await QuizAnswers.find({ user_id: userId, course_id: courseId, quiz_id: quizId  })
    if (allQuizzes.length <= 0) {

    const takenQuiz = new QuizAnswers({
        quiz_id: quizId,
        user_id: userId,
        course_id: courseId,
        class_id: classId,
        grade: req.body.grade
    });
    await takenQuiz.save()
    res.redirect(`/academy/course/${courseId}/class/${classId}/quiz/${quizId}/submit/update-grade`)
    } else {
        const updateQuiz = await QuizAnswers.findOneAndUpdate({ user_id: userId, course_id: courseId, quiz_id: quizId },
            { $push: { quiz_scores: quizId } },
            { safe: true, upsert: true },
            function (err, doc) {
                if (err) {
                    console.log(err)
                } else {
                    return
                }
            }
        )
        updateQuiz.save()
        res.redirect(`/academy/course/${courseId}/class/${classId}/quiz/${quizId}/submit/update-grade`)
    }
})

router.get('/course/:courseId/class/:classId/quiz/:quizId/submit/update-grade', ensureAuthenticated, async (req, res) => {
    const courseId = req.params.courseId;
    const classId = req.params.classId;
    const quizId = req.params.quizId;
    const userId = req.user.id

    const quiz = await QuizAnswers.findOne({
        quiz_id: quizId,
        user_id: userId,
    });


    
    console.log(quiz)

    const addQuiz = await CurrentCourse.findOneAndUpdate({ course_id: courseId, user_id: userId }, 
        { $addToSet: { quiz_scores:quizId } },
        { safe: true, upsert: true, new: true },
        function (err, doc) {
            if (err) {
                console.log(err)
            } else {
                return
            }
        }
    )
    console.log('Quiz Added: ' + addQuiz)
    addQuiz.save()
    console.log('Quiz Added After Save: ' + addQuiz)
    res.redirect(`/academy/course/${courseId}/class/${classId}`)
})
/* RESOURCES */

router.get('/resources', (req, res) => {
    res.render('academy/resources/home', { subZone: 'Resources', zone: 'Academy' })
});

// Encyclopedia


router.get('/resources/encyclopedia', async (req, res) => {
    /* const searchTerm = req.params.term; */
    /* const options = {
        method: 'GET',
        url: `https://en.wikipedia.org/w/rest.php/v1/search/title?q=learn&limit=50`
    };

    await axios.request(options).then(function (response) {
        const returnedData = response.data;
        console.log(returnedData)
        res.render('academy/resources/encyclopedia', { returnedData, subZone: 'Resources', zone: 'Academy', subZonePage: 'Encyclopedia'});
    }).catch(function (error) {
        console.error(error);
    }); */
    const url = "https://en.wikipedia.org/w/api.php?" +
        new URLSearchParams({
            origin: "*",
            action: "parse",
            page: "Tensor calculus",
            format: "json",
        });

    try {
        const req = await fetch(url);
        const json = await req.json();
        const returnedData = json.parse.text["*"];
        res.render('academy/resources/encyclopedia', { returnedData, subZone: 'Resources', zone: 'Academy', subZonePage: 'Encyclopedia'});
    } catch (e) {
        console.error(e);
    }
});

router.post('/resources/encyclopedia/search', async (req, res) => {
    const searchTerm = req.body.search;
    const options = {
        method: 'GET',
        url: `https://en.wikipedia.org/w/rest.php/v1/search/title?q=${searchTerm}&limit=50`
    };

    await axios.request(options).then(function (response) {
        const returnedData = response.data;
        console.log(returnedData)
        res.render('academy/resources/encyclopedia', { returnedData, subZone: 'Resources', zone: 'Academy', subZonePage: 'Encyclopedia' });
    }).catch(function (error) {
        console.error(error);
    });
});

router.get('/resources/encyclopedia/:pageKey', async (req, res) => {
    const pageKey = req.params.pageKey;
    const options = {
        method: 'GET',
        url: `https://en.wikipedia.org/w/rest.php/v1/page/${pageKey}/html`
    };
    await axios.request(options).then(function (response) {
        const returnedData = response.data;
        console.log(returnedData)
        res.render('academy/resources/encyclopedia-result', { returnedData, subZone: 'Resources', zone: 'Academy', subZonePage: 'Encyclopedia' });
    }).catch(function (error) {
        console.error(error);
    });
});

router.get('/resources/encyclopedia/images/:pageKey', async (req, res) => {
    const pageKey = req.params.pageKey;
    const options = {
        method: 'GET',
        url: `https://en.wikipedia.org/w/rest.php/v1/page/${pageKey}/links/media`
    };
    await axios.request(options).then(function (response) {
        const returnedData = response.data;
        console.log(returnedData)
        res.render('academy/resources/encyclopedia-result', { returnedData, subZone: 'Resources', zone: 'Academy', subZonePage: 'Encyclopedia' });
    }).catch(function (error) {
        console.error(error);
    });
});
/* HOMEWORK */

router.get('/homework', (req, res) => {
    res.render('academy/homework/home', { subZone: 'Homework', zone: 'Academy' })
});


/* TESTS */

router.get('/tests', (req, res) => {
    res.render('academy/tests/home', { subZone: 'Tests', zone: 'Academy' })
});


/* STUDY */

router.get('/study', (req, res) => {
    res.render('academy/study/home', { subZone: 'Study', zone: 'Academy' })
});


/* HELP */

router.get('/help', (req, res) => {
    res.render('academy/help/home', { subZone: 'Help', zone: 'Academy' })
});

/* ICONS */
router.get('/icons', (req, res) => {
    res.render('academy/icons')
})




>>>>>>> a8a8b4650a974eeda356f271e4e38c9b4cab5fa3
module.exports = router;