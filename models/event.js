// Event Model
// Represents events identified on a system within the video stream

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Event', new Schema({ 
    system_id: String,
    video_id: String,
    type: String,
    date_time_occurred: { type: Date, default: Date.now }
}));