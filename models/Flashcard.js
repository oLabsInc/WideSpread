<<<<<<< HEAD
const mongoose = require('mongoose');


const FlashcardSchema = new mongoose.Schema({
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    question: String,
    answer: String,
    difficulty: Number
});

const Flashcard = mongoose.model('Flashcard', FlashcardSchema);

=======
const mongoose = require('mongoose');


const FlashcardSchema = new mongoose.Schema({
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    question: String,
    answer: String,
    difficulty: Number
});

const Flashcard = mongoose.model('Flashcard', FlashcardSchema);

>>>>>>> a8a8b4650a974eeda356f271e4e38c9b4cab5fa3
module.exports = Flashcard;