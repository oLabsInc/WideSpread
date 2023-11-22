const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    notebook_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Notebook' },
    section_id: { type: mongoose.Schema.Types.ObjectId, ref: 'NotebookSection' },
    title: {
        type: String,
        unique: true
    },
    tags: [String],
    images: [String],
    body: {},
    references: [String],
    flashcards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Flashcard' }],
    created_at: { type: Date, default: Date.now() }
});


module.exports = new mongoose.model('Note', noteSchema); 