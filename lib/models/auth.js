/*
	Auth Model
	Method: POST
	Route: /auth
	Payload: 
	{
		"email": "jannie@live.io",
	    "password": "1234"
	}
*/
var jwt = require('jsonwebtoken');
var MongoClient = require('mongodb').MongoClient;
var Validator = require('jsonschema').Validator;
var v = new Validator();
var config = require('../../config.js');

exports.authenticate = function(app, req, cb) {
	var email = req.body.email;
	var password = req.body.password;  

	var schema = {
		"id": "auth_schema",
		"type": "object",
		"properties": {
			"email": {"type": "string", "minLength": 1},
			"password": {"type": "string", "minLength": 1},
		},
		"required": ["email", "password"]
	};

	var validator = v.validate(req.body, schema);

	if (validator.errors.length > 0) {
		cb({success: false, error: validator.errors}, null);
		return;
	}

	MongoClient.connect(config.mongo_host, function(err, db) {		
		if (err) { cb({success: false, error: err}, null); return; }

		var collection = db.collection('users');
		collection.find({email: email, password: password}).toArray(function(err, rows) {			
			if (err) { cb({success: false, error: err}, null); return; }

			if (rows.length < 1 ) {
				cb({success: false, message: 'User could not be authenticated'});
				return;
			} else {
				var user = {id: rows[0]._id, name: rows[0].name, surname: rows[0].surname, email: rows[0].email, admin: rows[0].admin, system_id: rows[0].system_id };
			
		        var token = jwt.sign(user, app.get('superSecret'), {
		          //expiresIn: 3600 // 3600 seconds = 1 hour
		          expiresIn: 9999999 
		        });	

		        cb({success: true, message: 'User authenticated', 'token': token, 'user_id': user.id})				
			}
		});	
	});
}