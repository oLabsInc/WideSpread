const mongoose = require('mongoose');


const GroupSchema = new mongoose.Schema({
    group_name: String,
    description: String,
    focus: String,
    public: String,
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    admins: [{
        admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        role: String
    }],
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    fees: {
        free: String,
        price: String,
        recurring: String,
        frequency: String,
    },
    colors: {
        main: String,
        accent: String
    },
    logo: String,
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
    main_images: [String],
    createdAt: {
        type: Date,
        default: Date.now()
    }

});

const Group = mongoose.model('Group', GroupSchema);

module.exports = Group;