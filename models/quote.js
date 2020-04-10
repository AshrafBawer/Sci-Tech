const mongoose = require('mongoose');

const quoteSchema = mongoose.Schema({
    author: String,
    body: String,
    img: String
});

module.exports = mongoose.model('Quote', quoteSchema);