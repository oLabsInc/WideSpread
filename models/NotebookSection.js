<<<<<<< HEAD
const mongoose = require('mongoose');

const notebookSectionSchema = new mongoose.Schema({
    notebook_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Notebook' },
    title: String,
    category: String,
    tags: [String],
    color: String,
    created_at: { type: Date, default: Date.now() }
});


=======
const mongoose = require('mongoose');

const notebookSectionSchema = new mongoose.Schema({
    notebook_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Notebook' },
    title: String,
    category: String,
    tags: [String],
    color: String,
    created_at: { type: Date, default: Date.now() }
});


>>>>>>> a8a8b4650a974eeda356f271e4e38c9b4cab5fa3
module.exports = new mongoose.model('NotebookSection', notebookSectionSchema);