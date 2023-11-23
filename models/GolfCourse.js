<<<<<<< HEAD
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

=======
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

>>>>>>> a8a8b4650a974eeda356f271e4e38c9b4cab5fa3
module.exports = GolfCourse;