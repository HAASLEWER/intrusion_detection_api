// Video Model
// Represents the videos that belong to each system

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Video', new Schema({ 
    type: String // To be defined, thinking something like 0 for the day video log, 1 for the event compilation for the day etc.
}));