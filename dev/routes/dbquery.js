var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var User = mongoose.model('User');
var Equipment = mongoose.model('Equipment');
var ServiceOrders = mongoose.model('ServiceOrder');
var Status  = mongoose.model('Status');
var pmtype = mongoose.model('PmType');
var priority = mongoose.model('Priority');
var problemtype = mongoose.model('ProblemType');
var url = require('url');
var querystring= require('querystring');


exports.equipmentList = function(req, res){
// Lets create an array and load it with User Data
      Equipment.find({ _User: 48243 })
        //ServiceOrders.find({ CloseDate: { $exists: false } })
        .populate('_User')
        .populate('_Product')
        .exec(function (err, equipmentlist){
        equip.forEach(function(equipmentlist){
        });
         //console.log(myArray)
         res.render('equipmentlist',  {
         equiplist: equipmentlist})
 });
};

exports.pmdetails = function(req, res){
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
   res.render('customerhomepage',{openrequests: myArray, upcomingpms: myArray2});  
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

