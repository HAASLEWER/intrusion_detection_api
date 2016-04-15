// Packages
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

// Local dependencies
var config = require('./config.js'); // get our config file
var User   = require('./models/user'); // get our mongoose model
var System = require('./models/system'); // get our mongoose model
var Company = require('./models/company'); // get our mongoose model
var Event  = require('./models/event'); // get our mongoose model
var Video  = require('./models/video'); // get our mongoose model
    
// configuration
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// =======================
// routes ================
// =======================
// basic route
app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

// Setup sample user
app.get('/setup', function(req, res) {
  var company = new Company({  
    company: 'Tetratec',
    address: '1 Tetra str, Garsfontein, Pretoria, 0081',
    contact_number: '012 998 1234',
    email: 'coetzeel@live.co.za',
    system_id: '571145b08305142aaa37d074'  	
  });

  company.save(function(err, company) {
    if (err) throw err;
    console.log('User saved successfully');
    res.json(company);
  });	  

/*
  system.save(function(err, system) {
    if (err) throw err;
    console.log('User saved successfully');
    res.json(system);
    // 571145b08305142aaa37d074
  });	

  // create a sample user
  var nick = new User({ 
    name: 'Lehan',
    surname: 'Coetzee',
    email: 'coetzeel@live.co.za',
    password: 'password',
    admin: true,
    system_id: '' 
  });

  // save the sample user
  nick.save(function(err) {
    if (err) throw err;
    console.log('User saved successfully');
    res.json({ success: true });
  });
*/
});

// API ROUTES -------------------

// get an instance of the router for api routes
var apiRoutes = express.Router(); 

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/authenticate', function(req, res) {

  // find the user
  User.findOne({
    email: req.body.email
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresInMinutes: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }   

    }

  });
});

// route middleware to verify a token
apiRoutes.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
});

// route to show a random message (GET http://localhost:8080/api/)
apiRoutes.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

// route to return all users (GET http://localhost:8080/api/users)
apiRoutes.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});   

// route to return specific user (GET http://localhost:8080/api/users/{id})
apiRoutes.get('/users/:id', function(req, res) {
  // TO DO
});   

// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);

// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);
