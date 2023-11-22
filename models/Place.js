const mongoose = require('mongoose');


const PlaceSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    place_type: String,
    address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' },
    phone: [{
        line_name: String,
        line_number: String
    }],
    website: String,
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    current_occupants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    max_occupancy: Number,
    coordinates: {
        x: String,
        y: String
    },
    blueprints: [String],
    tags: [String],

});

const Place = mongoose.model('Place', PlaceSchema);

module.exports = Place;