<<<<<<< HEAD
const mongoose = require('mongoose');

const bugSchema = new mongoose.Schema({
    page_url: String,
    refering_page: String,
    fixed: {
        type: Boolean,
        default: false
    },
    created_at: { type: Date, default: Date.now() }
});


=======
const mongoose = require('mongoose');

const bugSchema = new mongoose.Schema({
    page_url: String,
    refering_page: String,
    fixed: {
        type: Boolean,
        default: false
    },
    created_at: { type: Date, default: Date.now() }
});


>>>>>>> a8a8b4650a974eeda356f271e4e38c9b4cab5fa3
module.exports = new mongoose.model('Bug', bugSchema); 