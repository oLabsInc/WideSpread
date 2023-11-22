const mongoose = require('mongoose');

const notebookCollectionSchema = new mongoose.Schema({
    notebookCollectionOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    notebooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notebook' }]
});


module.exports = new mongoose.model('NotebookCollection', notebookCollectionSchema); 