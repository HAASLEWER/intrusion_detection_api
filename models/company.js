// Company Model
// Represents a client running a system

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Company', new Schema({ 
    company: String,
    address: String,
    contact_number: String,
    email: String,
    system_id: String
}));