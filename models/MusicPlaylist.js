const mongoose = require('mongoose');

const musicPlaylistSchema = new mongoose.Schema({
    playlist_owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserAudio' }],

});

module.exports = new mongoose.model('MusicPlaylist', musicPlaylistSchema);