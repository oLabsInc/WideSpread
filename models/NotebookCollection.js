<<<<<<< HEAD
const mongoose = require('mongoose');

const notebookCollectionSchema = new mongoose.Schema({
    notebookCollectionOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    notebooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notebook' }]
});


=======
const mongoose = require('mongoose');

const notebookCollectionSchema = new mongoose.Schema({
    notebookCollectionOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    notebooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notebook' }]
});


>>>>>>> a8a8b4650a974eeda356f271e4e38c9b4cab5fa3
module.exports = new mongoose.model('NotebookCollection', notebookCollectionSchema); 