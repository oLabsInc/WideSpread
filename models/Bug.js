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


module.exports = new mongoose.model('Bug', bugSchema); 