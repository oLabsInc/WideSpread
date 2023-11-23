<<<<<<< HEAD
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

=======
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

>>>>>>> a8a8b4650a974eeda356f271e4e38c9b4cab5fa3
module.exports = Post;