const mongoose = require('mongoose');

const SearchSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
});

const Search = mongoose.model('Search', SearchSchema);

module.exports = Search;