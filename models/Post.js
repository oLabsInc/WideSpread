const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    postBody: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    container_image: String,
    single_image: String,
    images: [String],
    business: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    comment_images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CommentImage' }],
    likes: Number

});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;