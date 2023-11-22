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

module.exports = GolfHole;