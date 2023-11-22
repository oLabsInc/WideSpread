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

module.exports = new mongoose.model('PhotoAlbum', photoAlbumSchema); 