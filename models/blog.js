const mongoose = require('mongoose');
const Populate = require('../util/autopopulate');

const postSchema = mongoose.Schema({
    title: String,
    date: {type:Date, default: Date.now},
    author: String,
    body: String,
    img: String,
    intro: String,
    comments: [
        {type: mongoose.Schema.Types.ObjectId, ref: "Comment"}
    ]
});

postSchema
    .pre('findOne', Populate('comments'))
    .pre('find', Populate('comments'));

module.exports = mongoose.model('Post', postSchema);
