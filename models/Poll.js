const mongoose = require('mongoose');


const PollSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    poll_image: String,
    poll_video: String,
    poll_audio: String,
    poll_body: String,
    poll_reply_1: {
        reply_option: String,
        reply_image: String,
        total_votes: Number,
        voters: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    poll_reply_2: {
        reply_option: String,
        reply_image: String,
        total_votes: Number,
        voters: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    poll_reply_3: {
        reply_option: String,
        reply_image: String,
        total_votes: Number,
        voters: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    poll_reply_4: {
        reply_option: String,
        reply_image: String,
        total_votes: Number,
        voters: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    poll_reply_5: {
        reply_option: String,
        reply_image: String,
        total_votes: Number,
        voters: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    poll_reply_6: {
        reply_option: String,
        reply_image: String,
        total_votes: Number,
        voters: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    votes: [
        {
            vote_total: String
        }
    ],
    created_at: {
        type: Date,
        default: Date.now()
    }
});

const Poll = mongoose.model('Poll', PollSchema);

module.exports = Poll;