const mongoose = require('mongoose');
const Populate = require('../util/autopopulate');

const commentSchema = mongoose.Schema({
    author: { type:String, required: true},
    date: {type:Date, default: Date.now},
    body: { type:String, required: true},
    comments: [
        {type: mongoose.Schema.Types.ObjectId, ref: "Comment"}
    ],
    seen: false,
});

commentSchema
    .pre('findOne', Populate('comments'))
    .pre('find', Populate('comments'));

module.exports = mongoose.model('Comment', commentSchema);