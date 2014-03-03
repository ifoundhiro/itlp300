var express = require('express');
var db=require('./model/db');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var dbquery = require('./routes/dbquery');


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
app.get('/customerhomepage',dbquery.pmdetails);
app.get('/openrequest',dbquery.openrequest);
app.get('/equipmentlist',dbquery.equipmentList);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


