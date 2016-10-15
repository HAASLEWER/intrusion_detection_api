var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var Validator = require('jsonschema').Validator;
var v = new Validator();
var config = require('../../config.js');
var _ = require('underscore');

exports.getAll = function(req, cb) {	
	MongoClient.connect(config.mongo_host, function(err, db) {		
		if (err) { cb({success: false, error: err}, null); return; }

		var collection = db.collection('users');
		collection.find({}).toArray(function(err, rows) {			
			if (err) { cb({success: false, error: err}, null); return; }

			cb(null, rows);
		});	
	});		
}

exports.getById = function(req, cb) {
	var id = new mongo.ObjectID(req.params.id);

	MongoClient.connect(config.mongo_host, function(err, db) {		
		if (err) { cb({success: false, error: err}, null); return; }

		var collection = db.collection('users');
		collection.find({_id: id}).toArray(function(err, rows) {			
			if (err) { cb({success: false, error: err}, null); return; }

			cb(null, rows);
		});	
	});	
}

exports.create = function(req, cb) {	
	var payload = req.body;
	var schema = {
		"id": "sensor_schema",
		"type": "object",
		"properties": {
			"name": {"type": "string"},
			"surname": {"type": "string", "minLength": 1},
			"email": {"type": "email", "minLength": 1},
			"password": {"type": "string", "minLength": 1},
			"admin": {"type": "string", "minLength": 1},
			"system_id": {"type": "string"}
		},
		"required": ["name", "surname", "email", "password", "admin", "system_id"]
	};

	var validator = v.validate(payload, schema);

	if (validator.errors.length > 0) {
		cb(validator.errors, null);
	} else {
		MongoClient.connect(config.mongo_host, function(err, db) {		
			if (err) { cb({success: false, error: err}, null); return; }

			var collection = db.collection('users');
			collection.insert(payload, function(err, result) {
				if (err) { cb({success: false, error: err}, null); return; }

				cb(null, result);
			});
		});		
	}
}

exports.update = function(req, cb) {
	var id = new mongo.ObjectID(req.params.id);
	var payload  = req.body;

	var schema = {
		"id": "actuator_schema",
		"type": "object",
		"properties": {
			"name": {"type": "string"},
			"surname": {"type": "string", "minLength": 1},
			"email": {"type": "string", "minLength": 1},
			"password": {"type": "string", "minLength": 1},
			"admin": {"type": "string"},
			"system_id": {"type": "required_interval"},
		},
		"required": ["name"]
	};

	var validator = v.validate(payload, schema);

	if (validator.errors.length > 0) {
		cb({success: false, errors: validator.errors}, null);
	} else {
		MongoClient.connect(config.mongo_host, function(err, db) {		
			if (err) { cb({success: false, error: err}, null); return; }

			var collection = db.collection('users');
			collection.update({'_id': id}, payload, function(err, result) {				
				if (err) { cb({success: false, error: err}, null); return; }

				cb(null, result);
			});
		});	
	}	
}

exports.delete = function(req, cb) {
	var id = new mongo.ObjectID(req.params.id);

	MongoClient.connect(config.mongo_host, function(err, db) {		
		if (err) { cb({success: false, error: err}, null); return; }

		var collection = db.collection('users');
		collection.deleteOne({'_id': id}, function(err, result) {
			if (err) { cb({success: false, error: err}, null); return; }

			cb(null, result);
		});
	});	
}