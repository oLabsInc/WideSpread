<<<<<<< HEAD
const mongoose = require('mongoose');

const notebookSchema = new mongoose.Schema({
    notebook_owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    for_course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    name: String,
    description: String,
    tags: [String],
    color: String,
    image: String,
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
    created_at: { type: Date, default: Date.now() }
});


=======
const mongoose = require('mongoose');

const notebookSchema = new mongoose.Schema({
    notebook_owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    for_course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    name: String,
    description: String,
    tags: [String],
    color: String,
    image: String,
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
    created_at: { type: Date, default: Date.now() }
});


>>>>>>> a8a8b4650a974eeda356f271e4e38c9b4cab5fa3
module.exports = new mongoose.model('Notebook', notebookSchema); 