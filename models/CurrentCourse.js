<<<<<<< HEAD
const mongoose = require('mongoose');

const CurrentCourseSchema = new mongoose.Schema({
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    quiz_scores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'QuizAnswers' }],
    current_grade: {
        type: Number,
        default: 100
    },
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notebook' }],
    bookmarked_learning_points: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LearningPoint' }]


})

const CurrentCourse = mongoose.model('CurrentCourse', CurrentCourseSchema);

=======
const mongoose = require('mongoose');

const CurrentCourseSchema = new mongoose.Schema({
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    quiz_scores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'QuizAnswers' }],
    current_grade: {
        type: Number,
        default: 100
    },
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notebook' }],
    bookmarked_learning_points: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LearningPoint' }]


})

const CurrentCourse = mongoose.model('CurrentCourse', CurrentCourseSchema);

>>>>>>> a8a8b4650a974eeda356f271e4e38c9b4cab5fa3
module.exports = CurrentCourse;