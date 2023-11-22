const mongoose = require('mongoose');

const userPhotoSchema = new mongoose.Schema({
    image_owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    caption: String,
    location: String,
    tags: [String],
    img:
    {
        data: Buffer,
        contentType: String
    }
});

module.exports = new mongoose.model('UserPhoto', userPhotoSchema);