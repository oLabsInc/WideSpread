const mongoose = require('mongoose');


const QuizSchema = new mongoose.Schema({
    for_class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    questions: [
        {
            question: String,
            options: {
                option1: {
                    possible_answer: String,
                    option_number: Number
                },
                option2: {
                    possible_answer: String,
                    option_number: Number
                },
                option3: {
                    possible_answer: String,
                    option_number: Number
                },
                option4: {
                    possible_answer: String,
                    option_number: Number
                },
            },
            answer: Number,
            correct: Boolean
        }
    ],
    score: Number
});

const Quiz = mongoose.model('Quiz', QuizSchema);

module.exports = Quiz;