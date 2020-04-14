const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const adminSchema = mongoose.Schema({
    username: {type:String, required:true},
    email: { type:String, required: true},
    password: { type:String, required: true},
});

adminSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Admin', adminSchema);