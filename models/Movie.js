<<<<<<< HEAD
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: String,
    link: String,
    poster: String,
    genre: String,
    genres: [String],
    rated: String,
    spread_genre: String,
    imdb_id: String,
    for_kids: Boolean
});


=======
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: String,
    link: String,
    poster: String,
    genre: String,
    genres: [String],
    rated: String,
    spread_genre: String,
    imdb_id: String,
    for_kids: Boolean
});


>>>>>>> a8a8b4650a974eeda356f271e4e38c9b4cab5fa3
module.exports = new mongoose.model('Movie', movieSchema);