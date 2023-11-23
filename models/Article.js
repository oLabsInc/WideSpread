<<<<<<< HEAD
const mongoose = require('mongoose');


const ArticleSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    articleTitle: String,
    articleHeader: String,
    articleBody: String,
    tags: [String],
    article_photos: [String],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]

});

const Article = mongoose.model('Article', ArticleSchema);

=======
const mongoose = require('mongoose');


const ArticleSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    articleTitle: String,
    articleHeader: String,
    articleBody: String,
    tags: [String],
    article_photos: [String],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]

});

const Article = mongoose.model('Article', ArticleSchema);

>>>>>>> a8a8b4650a974eeda356f271e4e38c9b4cab5fa3
module.exports = Article;