<<<<<<< HEAD
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    commentBody: String,
    likes: Number,
    fromPost: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    video_id: { type: mongoose.Schema.Types.ObjectId, ref: 'UserVideo' },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Comment = mongoose.model('Comment', CommentSchema);

=======
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    commentBody: String,
    likes: Number,
    fromPost: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    video_id: { type: mongoose.Schema.Types.ObjectId, ref: 'UserVideo' },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Comment = mongoose.model('Comment', CommentSchema);

>>>>>>> a8a8b4650a974eeda356f271e4e38c9b4cab5fa3
module.exports = Comment;