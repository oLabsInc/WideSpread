const mongoose = require('mongoose');


const GolfScoreCardSchema = new mongoose.Schema({
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'GolfCourse' },
    single_score_cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GolfScoreCardSingle' }],
    winner: { type: mongoose.Schema.Types.ObjectId, ref: 'GolfScoreCardSingle' },

});

const GolfScoreCard = mongoose.model('GolfScoreCard', GolfScoreCardSchema);

module.exports = GolfScoreCard;