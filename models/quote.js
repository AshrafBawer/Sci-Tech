const mongoose = require('mongoose');

const quoteSchema = mongoose.Schema({
    author: { type:String, required: true},
    body: { type:String, required: true},
    img: String
});

module.exports = mongoose.model('Quote', quoteSchema);