const mongoose = require('mongoose');


const FlashcardSchema = new mongoose.Schema({
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    question: String,
    answer: String,
    difficulty: Number
});

const Flashcard = mongoose.model('Flashcard', FlashcardSchema);

module.exports = Flashcard;