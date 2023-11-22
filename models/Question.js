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

module.exports = Question;