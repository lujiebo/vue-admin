var express = require('express');
var bodyParser = require('body-parser');
 
var app = express();
 
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
 
// parse requests of content-type - application/json
app.use(bodyParser.json());
 
// home page
app.get('/', function(req, res){
    res.json('Welcome.');
});
 
// register routes
var route = require('./app/routes/emp_routes.js')
route(app);
 
// listen on port 3000
app.listen(3000, function(){
    console.log('Server is running on port 3000.');
});