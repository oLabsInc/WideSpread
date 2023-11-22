const mongoose = require('mongoose');


const GolfCourseSchema = new mongoose.Schema({
    name: String,
    logo: String,
    fees: [
        {
            fee_name: String,
            fee_amount: Number

        }
    ],
    address: {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String
    },
    ll: {
        lat: String,
        long: String
    },
    driving_range: Boolean
});

const GolfCourse = mongoose.model('GolfCourse', GolfCourseSchema);

module.exports = GolfCourse;