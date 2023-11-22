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

module.exports = Article;