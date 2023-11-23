<<<<<<< HEAD
const mongoose = require('mongoose');

const QuizAnswersSchema = new mongoose.Schema({
    quiz_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    grade: Number
})

const QuizAnswers = mongoose.model('QuizAnswers', QuizAnswersSchema);

=======
const mongoose = require('mongoose');

const QuizAnswersSchema = new mongoose.Schema({
    quiz_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    grade: Number
})

const QuizAnswers = mongoose.model('QuizAnswers', QuizAnswersSchema);

>>>>>>> a8a8b4650a974eeda356f271e4e38c9b4cab5fa3
module.exports = QuizAnswers;