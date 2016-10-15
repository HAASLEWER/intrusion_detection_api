/**
 * @api {get} / Check if api is running
 * @apiName GetAPIStatus
 * @apiGroup Status
 *
 *
 * @apiSuccess {String} server running...
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     server running...
 *
 * @apiError 404 HTTP/1.1 404 Not Found
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 */
var express = require('express');
var cors    = require('cors');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan'); 
var fs      = require("fs");

var config    = require('./config'); 
    
var port = process.env.PORT || 8080; 
app.set('superSecret', config.secret); 

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS, always fucking CORS
app.use(cors());

// use morgan to log requests to the console
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

var apiRoutes = express.Router(); 

// Unauthenticated routes

app.get('/',function(req, res) {
  res.send('server running...');
}); 

// Include our auth module, to issue tokens
require('./lib/routes/auth')(app);

// Authenticated routes

// Include our app midlleware to verify tokens on secured roots
require('./lib/tools/middleware')(app);

// Include all our roots from the routes dir
var routePath = "./lib/routes/"; 
fs.readdirSync(routePath).forEach(function(file) {
  if (file == 'auth.js') { return; } // Skip auth as it should be an unauthenticated route, we require it expressly above
    var route = routePath + file;
    require(route)(app);
});   

// go go go!
app.listen(port);
console.log('Listening on http://localhost:' + port);