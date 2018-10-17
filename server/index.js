var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');

// create the application 
var app = express();

app.use(express.static(__dirname + '/public'));


//add middleware necessary for REST API's
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

//CROS support
app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/hello',function(req,res,next){
    res.send('hello world');
    next();
});

app.get('/home', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/artical', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.models = require('./models/index');
//load the routes
var routes = require('./routes');
_.each(routes,function(controller,route){
    app.use(route,controller(app,route));
});

mongoose.connect('mongodb://raghu:raghu@ds157469.mlab.com:57469/webpaathshaala');
//mongoose.connect('mongodb://localhost/webshaala');
mongoose.connection.once('open',function(){
    //load the model
    app.models = require('./models/index');
    
    console.log('Listening on port 3030...');
    app.listen(3030);
    console.log("connecting to mongodb://raghu:raghu@ds157469.mlab.com:57469/webpaathshaala");
});
