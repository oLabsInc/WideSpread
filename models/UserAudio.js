<<<<<<< HEAD
const mongoose = require('mongoose');

const userAudioSchema = new mongoose.Schema({
    audio_owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    album: String,
    song: String,
    artist: String,
    genre: String,
    tags: [String],
    background_photo: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
});

=======
const mongoose = require('mongoose');

const userAudioSchema = new mongoose.Schema({
    audio_owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    album: String,
    song: String,
    artist: String,
    genre: String,
    tags: [String],
    background_photo: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
});

>>>>>>> a8a8b4650a974eeda356f271e4e38c9b4cab5fa3
module.exports = new mongoose.model('UserAudio', userAudioSchema);