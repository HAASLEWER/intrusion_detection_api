// User Routes
var Events = require('../models/events');

module.exports = function(app) {
/**
 * @api {get} /sensor/ Get all events
 * @apiName GetEvents
 * @apiGroup Events
 *
 * @apiParam {String} token The valid authentication token.
 *
 * @apiSuccess {Boolean} success Whether the request was successful.
 * @apiSuccess {Array} result Array of sensors.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "result": [
 * 				{
 * 				"id":1,
 * 				"device_id":35,
 * 				"name":"api_test",
 * 				"topic":"api_test",
 * 				"format":"json",
 * 				"parameters":"",
 * 				"required_interval": 2,
 * 				"created_at":"0000-00-00 00:00:00",
 * 				"updated_at":"0000-00-00 00:00:00"
 * 				}
 * 			]
 *     }
 *
 */		
	app.get('/events', function(req, res) {		
		Events.getAll(req, function(err, result) {
			if (err) res.send({success: false, message: err});

			if (result !== null) {			
				res.send({success: true, result: result});
			}
		});
	});

/**
 * @api {get} /events/:id Get sensor by id
 * @apiName GetUserByID
 * @apiGroup Events
 *
 * @apiParam {Number} id The event id. 
 * @apiParam {String} token The valid authentication token.
 *
 * @apiSuccess {Boolean} success Whether the request was successful.
 * @apiSuccess {Array} result Array of sensors.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "result": [
 * 				{
 * 				"id":1,
 * 				"device_id":35,
 * 				"name":"api_test",
 * 				"topic":"api_test",
 * 				"format":"json",
 * 				"parameters":"",
 *				"required_interval": 2
 * 				"created_at":"0000-00-00 00:00:00",
 * 				"updated_at":"0000-00-00 00:00:00"
 * 				}
 * 			]
 *     }
 *
 */
	app.get('/events/:id', function(req, res) {
		Events.getById(req, function(err, result) {
			if (err) res.send({success: false, message: err});

			if (result !== null) {			
				res.send({success: true, result: result});
			}
		});
	});		

/**
 * @api {post} /events Add a new event
 * @apiName AddActuator
 * @apiGroup Eventss
 *
 * @apiExample Example usage:
 *
 *     body:
 *     {
 *	    "device_id": 35,
 *	    "name": "api_test",
 *	    "topic": "api_test",
 *	    "format": "json",
 *	    "parameters": "",
 *	    "required_interval": 2
 *     }
 *
 * @apiParam {String} token The valid authentication token.
 * @apiParam {String} name The name of the event.
 * @apiParam {String} surname The name of the event. 
 * @apiParam {String} email The email addres of the event.  
 * @apiParam {String} password The password of the event. 
 * @apiParam {Boolean} admin Is the event an administrator {true|false}.
 * @apiParam {Number} system_id The events associated system.     
 *
 * @apiSuccess {Boolean} success Whether the request was successful.
 * @apiSuccess {Object} result  JSON Object with the database insertion result.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "result": [
 * 				{
 *				"fieldCount": 0
 *				"affectedRows": 1
 *				"insertId": 7
 *				"serverStatus": 2
 *				"warningCount": 0
 *				"message": ""
 *				"protocol41": true
 *				"changedRows": 0
 * 				}
 * 			]
 *     }
 *
 * @apiError InvalidPayload The specified payload is incorrect.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 
 *		{
 *		   "success":false,
 *		   "message":{
 *		      "success":false,
 *		      "error":[
 *		         {
 *		            "property":"instance",
 *		            "message":"requires property \"parameters\"",
 *		            "schema":"event_schema",
 *		            "instance":{
 *		               "device_id":35,
 *		               "name":"api_test",
 *		               "topic":"api_test",
 *		               "format":"json",
 *		               "paraeters":""
 *		            },
 *		            "name":"required",
 *		            "argument":"parameters",
 *		            "stack":"instance requires property \"parameters\""
 *		         }
 *		      ]
 *		   }
 *		} 
 */	
	app.post('/events', function(req, res) {
		Events.create(req, function(err, result) {			
			if (err) res.send({success: false, message: err});

			if (result !== null) {			
				res.send({success: true, result: result});
			}
		});
	});	

/**
 * @api {put} /events/:id Update a event
 * @apiName UpdateActuator
 * @apiGroup Eventss
 *
 * @apiExample Example usage:
 *
 *     body:
 *     {
 *	    "device_id": 35,
 *	    "name": "api_test",
 *	    "topic": "api_test",
 *	    "format": "json",
 *	    "parameters": "",
 *	    "required_interval": 2
 *     }
 *
 * @apiParam {String} token The valid authentication token.
 * @apiParam {String} name The name of the event.
 * @apiParam {String} surname The name of the event. 
 * @apiParam {String} email The email addres of the event.  
 * @apiParam {String} password The password of the event. 
 * @apiParam {Boolean} admin Is the event an administrator {true|false}.
 * @apiParam {Number} system_id The events associated system. 
 *
 * @apiSuccess {Boolean} success Whether the request was successful.
 * @apiSuccess {Object} result  JSON Object with the database insertion result.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "result": [
 * 				{
 *				"fieldCount": 0
 *				"affectedRows": 1
 *				"insertId": 0
 *				"serverStatus": 2
 *				"warningCount": 0
 *				"message": "(Rows matched: 1 Changed: 1 Warnings: 0"
 *				"protocol41": true
 *				"changedRows": 1
 * 				}
 * 			]
 *     }
 *
 * @apiError InvalidPayload The specified payload is incorrect.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 
 *		{
 *		   "success":false,
 *		   "message":{
 *		      "success":false,
 *		      "error":[
 *		         {
 *		            "property":"instance",
 *		            "message":"requires property \"parameters\"",
 *		            "schema":"sensor_schema",
 *		            "instance":{
 *		               "device_id":35,
 *		               "name":"api_test",
 *		               "topic":"api_test",
 *		               "format":"json",
 *		               "paraeters":""
 *		            },
 *		            "name":"required",
 *		            "argument":"parameters",
 *		            "stack":"instance requires property \"parameters\""
 *		         }
 *		      ]
 *		   }
 *		} 
 */	
	app.put('/events/:id', function(req, res) {
		Events.update(req, function(err, result) {
			if (err) res.send({success: false, message: err});

			if (result !== null) {			
				res.send({success: true, result: result});
			}
		});
	});	

/**
 * @api {delete} /events/:id Delete a event
 * @apiName DeleteActuator
 * @apiGroup Events
 *
 * @apiParam {Number} id The event id. 
 * @apiParam {String} token The valid authentication token.
 *
 * @apiSuccess {Boolean} success Whether the request was successful.
 * @apiSuccess {Array} result Database result.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "result": [
 * 				{
 *				"fieldCount": 0
 *				"affectedRows": 1
 *				"insertId": 0
 *				"serverStatus": 2
 *				"warningCount": 0
 *				"message": ""
 *				"protocol41": true
 *				"changedRows": 0
 * 				}
 * 			]
 *     }
 *
 */	
	app.delete('/events/:id', function(req, res) {
		Sensor.delete(req, function(err, result) {
			if (err) res.send({success: false, message: err});

			if (result !== null) {			
				res.send({success: true, result: result});
			}
		});
	});			
}