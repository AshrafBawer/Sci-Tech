const mongoose = require('mongoose');
const Populate = require('../util/autopopulate');

const postSchema = mongoose.Schema({
    title: { type:String, required: true},
    date: {type:Date, default: Date.now},
    author: { type:String, required: true},
    body: { type:String, required: true},
    img: { type:String, required: true},
    intro: { type:String, required: true},
    comments: [
        {type: mongoose.Schema.Types.ObjectId, ref: "Comment"}
    ]
});

postSchema
    .pre('findOne', Populate('comments'))
    .pre('find', Populate('comments'));

module.exports = mongoose.model('Post', postSchema);
