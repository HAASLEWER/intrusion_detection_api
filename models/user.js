// User Model
// each user is tied to a system which authorizes them to view and edit that systems data

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new Schema({ 
    name: String, 
    password: String, 
    admin: Boolean,
    system_id: String 
}));