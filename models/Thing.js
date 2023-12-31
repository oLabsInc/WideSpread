<<<<<<< HEAD
const mongoose = require('mongoose');


const ThingSchema = new mongoose.Schema({
    for_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    device_information: {
        device_name: String,
        device_type: String,
        ip_address: String,
        device_password: String,
        zone: Number
    },
    device_location: { type: mongoose.Schema.Types.ObjectId, ref: 'Place' },
    schedule: [
        {
            device_on: Date,
            device_off: Date
        }
    ],
    current_state: {
        listening: Boolean,
        state: String,
    },
    available_actions: [String],
    history: [String],
    added_on: {
        type: Date,
        default: Date.now()
    }
});

const Thing = mongoose.model('Thing', ThingSchema);

=======
const mongoose = require('mongoose');


const ThingSchema = new mongoose.Schema({
    for_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    device_information: {
        device_name: String,
        device_type: String,
        ip_address: String,
        device_password: String,
        zone: Number
    },
    device_location: { type: mongoose.Schema.Types.ObjectId, ref: 'Place' },
    schedule: [
        {
            device_on: Date,
            device_off: Date
        }
    ],
    current_state: {
        listening: Boolean,
        state: String,
    },
    available_actions: [String],
    history: [String],
    added_on: {
        type: Date,
        default: Date.now()
    }
});

const Thing = mongoose.model('Thing', ThingSchema);

>>>>>>> a8a8b4650a974eeda356f271e4e38c9b4cab5fa3
module.exports = Thing;