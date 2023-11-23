<<<<<<< HEAD
const mongoose = require('mongoose');

const photoAlbumSchema = new mongoose.Schema({
    albumOwner: String,
    album_name: String,
    album_description: String,
    photos: [String],
    private: Boolean,
    album_cover: String,
    album_color: String
});

=======
const mongoose = require('mongoose');

const photoAlbumSchema = new mongoose.Schema({
    albumOwner: String,
    album_name: String,
    album_description: String,
    photos: [String],
    private: Boolean,
    album_cover: String,
    album_color: String
});

>>>>>>> a8a8b4650a974eeda356f271e4e38c9b4cab5fa3
module.exports = new mongoose.model('PhotoAlbum', photoAlbumSchema); 