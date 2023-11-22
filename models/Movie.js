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


module.exports = new mongoose.model('Movie', movieSchema);