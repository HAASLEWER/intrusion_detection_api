// Video Model
// Represents the videos that belong to each system

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Video', new Schema({ 
    type: String, // 0 = day video log, 1 = event compilation
    date: { type: Date, default: Date.now },
    file_location: String,
    system_id: String
}));