var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var Validator = require('jsonschema').Validator;
var v = new Validator();
var config = require('../../config.js');
var _ = require('underscore');
var uuid = require('node-uuid');

exports.getAll = function(req, cb) {	
	MongoClient.connect(config.mongo_host, function(err, db) {		
		if (err) { cb({success: false, error: err}, null); return; }

		var collection = db.collection('events');
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

		var collection = db.collection('events');
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
			"image": {"type": "string", "minLength": 1}
		},
		"required": ["image"]
	};

	var validator = v.validate(payload, schema);

	if (validator.errors.length > 0) {
		cb(validator.errors, null);
	} else {
		var base64Data = payload.image.replace(/^data:image\/png;base64,/, "");

		path = '/var/www/html/event_images/' + uuid.v1() + '.png';
		require("fs").writeFile(path, base64Data, 'base64', function(err) {
  			console.log(err);

  			payload.image = path;
			payload.datetime = new Date();
			MongoClient.connect(config.mongo_host, function(err, db) {		
				if (err) { cb({success: false, error: err}, null); return; }

				var collection = db.collection('events');
				collection.insert(payload, function(err, result) {
					if (err) { cb({success: false, error: err}, null); return; }

					cb(null, result);
				});
			});  			
		});		
	}
}

exports.delete = function(req, cb) {
	var id = new mongo.ObjectID(req.params.id);

	MongoClient.connect(config.mongo_host, function(err, db) {		
		if (err) { cb({success: false, error: err}, null); return; }

		var collection = db.collection('events');
		collection.deleteOne({'_id': id}, function(err, result) {
			if (err) { cb({success: false, error: err}, null); return; }

			cb(null, result);
		});
	});	
}