const mongoose = require('mongoose');

const notebookSectionSchema = new mongoose.Schema({
    notebook_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Notebook' },
    title: String,
    category: String,
    tags: [String],
    color: String,
    created_at: { type: Date, default: Date.now() }
});


module.exports = new mongoose.model('NotebookSection', notebookSectionSchema);