const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    context: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    id: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'new'
    },
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;