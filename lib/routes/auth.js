/**
 * @api {post} /auth/ Authenticate a user
 * @apiName Authenticate
 * @apiGroup Auth
 *
 * @apiParam {String} email Users email address.
 * @apiParam {String} password Users email password.
 *
 * @apiSuccess {Boolean} success Whether or authentication was successful or not.
 * @apiSuccess {String} message  Description of the success parameter.
 * @apiSuccess {String} token  The authenticated token that must accompany every request. 
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "message": "User authenticated",
 *		 "token": "eyJpc3MiOiJzY290Y2guaW8iLCJleHAiOjEzMDA4MTkzODAsIm5hbWUiOiJDaHJpcyBTZXZpbGxlamEiLCJhZG1pbiI6dHJ1ZX0",
 *     }
 *
 * @apiError AuthFailed The user could not be authenticated.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "success": false,
 *		 "message": "User could not be authenticated"
 *     }
 */
var Auth = require('../models/auth');

module.exports = function(app) {
	app.get('/auth',function(req, res) {
		// check token validity
	});

	app.post('/auth',function(req, res) {
		Auth.authenticate(app, req, function(result) {
			res.send(result);
		});
	});	
}