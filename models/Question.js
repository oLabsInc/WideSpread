<<<<<<< HEAD
const mongoose = require('mongoose');


const QuestionSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    question_body: String,
    category: String,
    answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }],
    tags: [String],
    resolved: Boolean,
    created_at: {
        type: Date,
        default: Date.now()
    }
});

const Question = mongoose.model('Question', QuestionSchema);

=======
const mongoose = require('mongoose');


const QuestionSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    question_body: String,
    category: String,
    answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }],
    tags: [String],
    resolved: Boolean,
    created_at: {
        type: Date,
        default: Date.now()
    }
});

const Question = mongoose.model('Question', QuestionSchema);

>>>>>>> a8a8b4650a974eeda356f271e4e38c9b4cab5fa3
module.exports = Question;