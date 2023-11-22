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

module.exports = GolfBag;