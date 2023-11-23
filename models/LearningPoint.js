<<<<<<< HEAD
const mongoose = require('mongoose');


const LearningPointSchema = new mongoose.Schema({
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    section_header: String,
    section_body: {},
    section_notes: [{}],
    difficulty: Number,
    flashcards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Flashcard' }],
    references: [String]
});

const LearningPoint = mongoose.model('LearningPoint', LearningPointSchema);

=======
const mongoose = require('mongoose');


const LearningPointSchema = new mongoose.Schema({
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    section_header: String,
    section_body: {},
    section_notes: [{}],
    difficulty: Number,
    flashcards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Flashcard' }],
    references: [String]
});

const LearningPoint = mongoose.model('LearningPoint', LearningPointSchema);

>>>>>>> a8a8b4650a974eeda356f271e4e38c9b4cab5fa3
module.exports = LearningPoint;