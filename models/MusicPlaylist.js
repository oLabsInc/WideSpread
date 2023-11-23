<<<<<<< HEAD
const mongoose = require('mongoose');

const musicPlaylistSchema = new mongoose.Schema({
    playlist_owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserAudio' }],

});

=======
const mongoose = require('mongoose');

const musicPlaylistSchema = new mongoose.Schema({
    playlist_owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserAudio' }],

});

>>>>>>> a8a8b4650a974eeda356f271e4e38c9b4cab5fa3
module.exports = new mongoose.model('MusicPlaylist', musicPlaylistSchema);