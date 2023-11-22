const mongoose = require('mongoose');

const QuizAnswersSchema = new mongoose.Schema({
    quiz_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    grade: Number
})

const QuizAnswers = mongoose.model('QuizAnswers', QuizAnswersSchema);

module.exports = QuizAnswers;