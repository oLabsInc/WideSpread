<<<<<<< HEAD
const mongoose = require('mongoose');


const GolfScoreCardSingleSchema = new mongoose.Schema({
    golf_course: { type: mongoose.Schema.Types.ObjectId, ref: 'GolfCourse' },
    golf_bag: { type: mongoose.Schema.Types.ObjectId, ref: 'GolfBag' },
    player: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    player_name: String,
    handicap: Number,
    holes: [
        {
            hole_id: { type: mongoose.Schema.Types.ObjectId, ref: 'GolfHole' },
            tee: String,
            strokes: Number
        }
    ],
    date_played: {
        type: Date,
        default: Date.now()
    }
});

const GolfScoreCardSingle = mongoose.model('GolfScoreCardSingle', GolfScoreCardSingleSchema);

=======
const mongoose = require('mongoose');


const GolfScoreCardSingleSchema = new mongoose.Schema({
    golf_course: { type: mongoose.Schema.Types.ObjectId, ref: 'GolfCourse' },
    golf_bag: { type: mongoose.Schema.Types.ObjectId, ref: 'GolfBag' },
    player: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    player_name: String,
    handicap: Number,
    holes: [
        {
            hole_id: { type: mongoose.Schema.Types.ObjectId, ref: 'GolfHole' },
            tee: String,
            strokes: Number
        }
    ],
    date_played: {
        type: Date,
        default: Date.now()
    }
});

const GolfScoreCardSingle = mongoose.model('GolfScoreCardSingle', GolfScoreCardSingleSchema);

>>>>>>> a8a8b4650a974eeda356f271e4e38c9b4cab5fa3
module.exports = GolfScoreCardSingle;