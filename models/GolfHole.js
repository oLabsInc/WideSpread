<<<<<<< HEAD
const mongoose = require('mongoose');


const GolfHoleSchema = new mongoose.Schema({
    for_course: { type: mongoose.Schema.Types.ObjectId, ref: 'GolfCourse' },
    hole_number: {
        type: Number

    },
    par: Number,
    handicap: Number,
    slope: Number,
    tees: [
        {
            color: String,
            ll: {
                lat: String,
                long: String
            },
            distance: Number
        }
    ],
    pin: {
        lat: String,
        long: String
    }

});

const GolfHole = mongoose.model('GolfHole', GolfHoleSchema);

=======
const mongoose = require('mongoose');


const GolfHoleSchema = new mongoose.Schema({
    for_course: { type: mongoose.Schema.Types.ObjectId, ref: 'GolfCourse' },
    hole_number: {
        type: Number

    },
    par: Number,
    handicap: Number,
    slope: Number,
    tees: [
        {
            color: String,
            ll: {
                lat: String,
                long: String
            },
            distance: Number
        }
    ],
    pin: {
        lat: String,
        long: String
    }

});

const GolfHole = mongoose.model('GolfHole', GolfHoleSchema);

>>>>>>> a8a8b4650a974eeda356f271e4e38c9b4cab5fa3
module.exports = GolfHole;