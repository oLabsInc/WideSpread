const mongoose = require('mongoose');


const EventSchema = new mongoose.Schema({
    for_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    description: String,
    phone_number: String,
    invitation_body: String,
    event_notes: [String],
    category: String,
    private: Boolean,
    host: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    admins: [{
        admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        role: String
    }],
    schedule: {
        all_day: Boolean,
        start: String,
        end: String,
        raindate: {
            start: String,
            end: String
        }
    },
    reminders: [Date],
    repeat: Number,
    invited: [{
        person: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    }],
    attending: [{
        person: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        guests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    }],
    location: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' },
    colors: String,
    images: {
        background: String,
        album: [{
            name: String,
            description: String,
            images: [{
                image: String,
                description: String
            }]
        }]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;