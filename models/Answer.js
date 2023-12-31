<<<<<<< HEAD
const mongoose = require('mongoose');


const AnswerSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    from_question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    answer_body: String,
    resources: [String],
    likes: Number,
    dislikes: Number,
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    createdAt: {
        type: Date,
        default: Date.now()
    }

});

const Answer = mongoose.model('Answer', AnswerSchema);

=======
const mongoose = require('mongoose');


const AnswerSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    from_question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    answer_body: String,
    resources: [String],
    likes: Number,
    dislikes: Number,
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    createdAt: {
        type: Date,
        default: Date.now()
    }

});

const Answer = mongoose.model('Answer', AnswerSchema);

>>>>>>> a8a8b4650a974eeda356f271e4e38c9b4cab5fa3
module.exports = Answer;