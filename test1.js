
/**
 * Module dependencies.
 */

var express = require('express');
var db = require('./model/db');
var routes = require('./routes');
var user = require('./routes/user');
var helloworld = require('./routes/helloworld');
var workshop1 = require('./routes/workshop1');
var workshop6 = require('./routes/workshop6');
var workshop7 = require('./routes/workshop7');
var userlist = require('./routes/userlist');
var userdetails = require('./routes/userdetails');
var sample = require('./routes/sample');
var bootstrap1=require('./routes/bootstrap1');
var servicedetails = require('./routes/servicedetails');
//var contactus = require('./routes/workshop2-contactus');
var contactus = require('./routes/workshop3-contactus');
var http = require('http');
var path = require('path');
var moment = require('moment');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/helloworld', helloworld.hello);
app.get('/workshop1', workshop1.work);
app.get('/sample', sample.presentform);
app.post('/sample', sample.echodata);
app.get('/contactus', contactus.presentform);
app.post('/contactus', contactus.echodata);
app.get('/workshop6_1', workshop6.problem1);
app.get('/workshop6_2', workshop6.problem2);
app.get('/workshop6_3', workshop6.problem3);
app.get('/workshop6_4', workshop6.problem4);
app.get('/workshop6_5', workshop6.problem5);
app.get('/workshop6_6', workshop6.problem6);
app.get('/workshop6_7', workshop6.problem7);
app.get('/workshop6_8', workshop6.problem8);
app.get('/workshop6_9', workshop6.problem9);
app.get('/workshop6_10', workshop6.problem10);
app.get('/workshop7_1', workshop7.problem1);
app.get('/workshop7_2', workshop7.problem2);
app.get('/workshop7_3', workshop7.problem3);
app.get('/userlist', userlist.list);
app.get('/userdetails', userdetails.details);
app.post('/userdetails', userdetails.update);
app.get('/bootstrap1',bootstrap1.test);
app.get('/servicedetails',servicedetails.details);
app.get('/openrequest',servicedetails.openrequest);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
