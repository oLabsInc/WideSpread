<<<<<<< HEAD
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

=======
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

>>>>>>> a8a8b4650a974eeda356f271e4e38c9b4cab5fa3
module.exports = new mongoose.model('UserPhoto', userPhotoSchema);