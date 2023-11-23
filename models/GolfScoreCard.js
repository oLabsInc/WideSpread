<<<<<<< HEAD
const mongoose = require('mongoose');


const GolfScoreCardSchema = new mongoose.Schema({
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'GolfCourse' },
    single_score_cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GolfScoreCardSingle' }],
    winner: { type: mongoose.Schema.Types.ObjectId, ref: 'GolfScoreCardSingle' },

});

const GolfScoreCard = mongoose.model('GolfScoreCard', GolfScoreCardSchema);

=======
const mongoose = require('mongoose');


const GolfScoreCardSchema = new mongoose.Schema({
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'GolfCourse' },
    single_score_cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GolfScoreCardSingle' }],
    winner: { type: mongoose.Schema.Types.ObjectId, ref: 'GolfScoreCardSingle' },

});

const GolfScoreCard = mongoose.model('GolfScoreCard', GolfScoreCardSchema);

>>>>>>> a8a8b4650a974eeda356f271e4e38c9b4cab5fa3
module.exports = GolfScoreCard;