const mongoose = require('mongoose');


const UserVideoSchema = new mongoose.Schema({
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    description: String,
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    video_type: String,
    likes: Number,
    dislikes: Number,
    source: String,
    url_source: String,
    thumbnail: String,
    video_length: String,
    upload_id: String,
    metadata: String,
    asset: String,
    filename: String,
    tags: [String],
    cast: [{
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        f_name: String,
        l_name: String
        
    }],
    created_at: {
        type: Date,
        default: Date.now()
    }

});

const UserVideo = mongoose.model('UserVideo', UserVideoSchema);

module.exports = UserVideo;