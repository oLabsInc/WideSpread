const mongoose = require('mongoose');


const SpreadSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    target_audience: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    public: Boolean,
    only_intended_for: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    spread_type: String,
    generic_spread: {},
    poll_post: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Poll'
    },
    question_post: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Question'
    },
    event_post: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Event'
    },
    photo_post: {
        type: mongoose.Schema.Types.ObjectId, ref: 'UserPhoto',
        photo_url: String,
        caption: String,
    },
    audio_post: {
        type: mongoose.Schema.Types.ObjectId, ref: 'UserAudio'
    },
    video_post: {
        saved_video: {
            type: mongoose.Schema.Types.ObjectId, ref: 'UserVideo'
        },
        spread_movie: {
            title: String,
            genres: [String],
            director: String,
            cast: [String],
            rated: String,
            plot: String,
            year: String,
            runtime: String,
            poster: String,
            imdb_id: String,
            movie_photos: [String]
        }
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    container_image: String,
    single_image: String,
    images: [String],
    tags: [String],
    business: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    comments: [{}],
    comment_images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CommentImage' }],
    reactions: [
        {
            /* Includes: likes, dislikes, funny, amazed, angry, applause, sad, annoyed, etc. */
            reacted_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            reaction_type: String,
        }
    ],
    string_post: String,
    video_ref: { type: mongoose.Schema.Types.ObjectId, ref: 'UserVideo' },
    references: [String]

});

const Spread = mongoose.model('Spread', SpreadSchema);

module.exports = Spread;