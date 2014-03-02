var mongoose = require('mongoose');
var Equipment = mongoose.model('Equipment');
var PMType = mongoose.model('PMType');
var Priority = mongoose.model('Priority');
var ProblemType = mongoose.model('ProblemType');
var Product = mongoose.model('Product');
var ServiceOrder = mongoose.model('ServiceOrder');
var Status = mongoose.model('Status');
var User = mongoose.model('User');
var async = require('async');

exports.details = function(req, res){
  // Define arrays to hold data to be passed to jade file.
  var myArray=[];
  var myArray2=[];
  // Run parallel.
  async.parallel([
  	// Extract data for open service orders.
  	function(callback){
      ServiceOrder.find({ CloseDate: { $exists: false } })
        .populate('_Equipment _Product')
        .exec(function (err, serviceorder){
          serviceorder.forEach(function(serviceorder){
            myArray.push(serviceorder);
          });
        // Callback.
        callback();
        });
    },
    // Extract data for up-coming preventative maintenance.
    function(callback){
      Equipment.find()
        .populate('_Product')
        .sort('NextPMDate')
        .exec(function (err, equipment){
          equipment.forEach(function(equipment){
            myArray2.push(equipment);
          });
        // Callback.
        callback();
        });    	
    }
  ], function(err){
    if(err) return next(err);
    // Render and pass arrays to jade file.
    res.render('servicedetails',{openrequests: myArray, upcomingpms: myArray2});  
  });
};

exports.openrequest = function(req, res){
  ServiceOrder.find()
    .exec(function (err, serviceorder){
      serviceorder.forEach(function(serviceorder){
      });
    res.render('openrequest');  
    });
};


