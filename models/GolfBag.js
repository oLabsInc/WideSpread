<<<<<<< HEAD
const mongoose = require('mongoose');


const GolfBagSchema = new mongoose.Schema({
    for_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    clubs: [
        {
            club_type: String,
            club_number: Number
        }
    ]

});

const GolfBag = mongoose.model('GolfBag', GolfBagSchema);

=======
const mongoose = require('mongoose');


const GolfBagSchema = new mongoose.Schema({
    for_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    clubs: [
        {
            club_type: String,
            club_number: Number
        }
    ]

});

const GolfBag = mongoose.model('GolfBag', GolfBagSchema);

>>>>>>> a8a8b4650a974eeda356f271e4e38c9b4cab5fa3
module.exports = GolfBag;