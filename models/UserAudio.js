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

module.exports = new mongoose.model('UserAudio', userAudioSchema);