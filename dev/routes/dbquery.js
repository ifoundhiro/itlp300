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


var url = require('url');
var querystring= require('querystring');
// Added 3/3/2014 by Hiro: Replace hard-coded user ID 
// with a variable.  Some user IDs: 48364, 48243, ...
var UserID = 48243 

exports.equipmentList = function(req, res){
// Lets create an array and load it with User Data
      Equipment.find({ _User: req.query.id })
        //ServiceOrders.find({ CloseDate: { $exists: false } })
        .populate('_User')
        .populate('_Product')
        .exec(function (err, equip){
        equip.forEach(function(equip){
        });
         //console.log(myArray)
         res.render('equipmentlist',  {
         equiplist: equip})
 });
};

exports.equipdetail = function(req, res){
// Lets create an array and load it with User Data
         var myArray= [];
         var myArray2= [];
         async.parallel([
            function(callback){
              Equipment.find({ _id: req.query.id })
              .populate('_Product')  
              .exec(function (err, equip){
              equip.forEach(function(equip){
                myArray.push(equip);
              });
              callback();
            });
            },
            function(callback){
               ServiceOrder.find({ _Equipment: req.query.id })
               .sort('CurrentStatus')
               .populate('_Equipment')
               .populate('_Product')
               .exec(function (err, order){
                order.forEach(function(order){
                myArray2.push(order);
              });
              callback();
            });  
            }
          ], function (err){
             res.render('equipdetail',  {
          equipdetail: myArray, orderhistory: myArray2});
  });
};


exports.customer = function(req, res){
 // Define arrays to hold data to be passed to jade file.
 var myArray=[];
 var myArray2=[];
 // Run parallel.
 async.parallel([
  // Extract data for open service orders.
  function(callback){
     ServiceOrder.find({ CloseDate: { $exists: false },_CreatedBy: UserID})
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
     Equipment.find({ _User: UserID })
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
   res.render('customer',{openrequests: myArray, upcomingpms: myArray2});  
 });
};


exports.openrequest = function(req, res){
 ServiceOrder.find({_CreatedBy: UserID})
   .exec(function (err, serviceorder){
     serviceorder.forEach(function(serviceorder){
     });
   res.render('openrequest');  
   });
};

exports.logon = function(req, res){
  	res.render('logon');
};

exports.verify2 = function(req, res){
	User.find({UserName: req.body.inputUserame})
	.exec(function (err, user){
		if (user.RoleName == "Customer" && user.Password == req.session.Password)
			{	req.session.id = user._id;
				req.session.UserName = user.UserName;
				req.session.Password = user.Password;
				req.session.RoleName = user.RoleName;
				req.session.FirstName = user.FirstName;
				req.session.LastName = user.LastName;
				req.session.Street = user.Street;
				req.session.City = user.City;
				req.session.Province = user.Province;
				req.session.PostalCode = user.PostalCode;
				req.session.Email = user.Email;
				req.session.CustomerName = user.CustomerName;
				req.session.CustomerType = user.CustomerType;
				req.session.ContractType = user.ContractType;
				req.session.CountryName = user.CountryName;
				req.session.RegionName = user.RegionName;
				req.session.Position = user.Position;
				res.redirect('/customer')}
		else if (user.RoleName == "Onsite Engineer" && user.Password == req.session.Password)
			{	
				req.session.id = user._id;
				req.session.UserName = user.UserName;
				req.session.Password = user.Password;
				req.session.RoleName = user.RoleName;
				req.session.FirstName = user.FirstName;
				req.session.LastName = user.LastName;
				req.session.Street = user.Street;
				req.session.City = user.City;
				req.session.Province = user.Province;
				req.session.PostalCode = user.PostalCode;
				req.session.Email = user.Email;
				req.session.CustomerName = user.CustomerName;
				req.session.CustomerType = user.CustomerType;
				req.session.ContractType = user.ContractType;
				req.session.CountryName = user.CountryName;
				req.session.RegionName = user.RegionName;
				req.session.Position = user.Position;
				res.redirect('/engineer')}
		else
			{	res.redirect('/invalidlogin')}
	});
};

exports.engineer = function(req, res){
  	res.render('engineer');
};

exports.invalidlogin = function(req, res){
  	res.render('invalidlogin');
};



exports.serviceorderdetails = function(req, res){
  var arg=url.parse(req.url).query; 
  var serviceorder_id=querystring.parse(arg).id;
  //var serviceorder_id = 411339;
  ServiceOrder.find({_id: serviceorder_id})
    .populate('_Equipment')
    .populate('_CreatedBy')
    .populate('ServiceDetails._User')
    .exec(function(err, serviceorder){
        console.log(serviceorder[0])
        res.render('serviceorderdetails',{serviceorder: serviceorder})})
};

exports.CustomerAlert = function(req, res){
 // Define arrays to hold data to be passed to jade file.
 var myArray=[];
 var myArray2=[];
 // Run parallel.
 async.parallel([
  // Extract data for open service orders.
  function(callback){
     ServiceOrder.find()
       .populate('_Equipment _Product')
       //.sort('ServiceOrder.CloseDate')
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
       //.sort(-'NextPMDate')
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
   res.render('CustomerAlert',{openrequests: myArray, PMs: myArray2});  
 });
};

exports.EngineerAlert = function(req, res){
	myArray = [];
	ServiceOrder.find()
	.populate('_CreatedBy')
	.exec(function (err, serviceorder){
	serviceorder.forEach(function(serviceorder){
		myArray.push(serviceorder);
	});
	  	res.render('EngineerAlert', {openrequests: myArray});
});
};



exports.updateServiceorderdetail = function(req, res){
  var arg=url.parse(req.url).query; 
  var serviceorder_id=querystring.parse(arg).id;
  if (req.body.button=='sendback'){
    ServiceOrder.findById(serviceorder_id)
      .exec(function(err, serviceorder){
          serviceorder.ServiceDetails.push({
            _id: (serviceorder.ServiceDetails.length + 1),
            _User: req.session.user._id,
            //_User: 84714,
            StatusDescription: 'Forward to Dispatch',
            ActionNotes: req.body.notes
            });
          serviceorder.CurrentStatus='Forward to Dispatch';
          serviceorder.save(function(err, serviceorder){
          res.render('/engineer')
            })
          })
          }

    if (req.body.button=='accept'){
    ServiceOrder.findById(serviceorder_id)
      .exec(function(err, serviceorder){
          serviceorder.ServiceDetails.push({
            _id: (serviceorder.ServiceDetails.length + 1),
            _User: req.session.user._id,
            //_User: 84714,
            StatusDescription: 'Accepted',
            AcceptedDate: Date.now(),
            ActionNotes: req.body.notes
            });
          serviceorder.CurrentStatus='Accepted';
          serviceorder.save(function(err, serviceorder){
          res.render('/engineer')
            })
          })
          }



    if (req.body.button=='checkin'){
    ServiceOrder.findById(serviceorder_id)
      .exec(function(err, serviceorder){
          serviceorder.ServiceDetails.push({
            _id: (serviceorder.ServiceDetails.length + 1),
            _User: req.session.user._id,
            //_User: 84714,
            StatusDescription: 'Onsite',
            Checkin: Date.now(),
            ActionNotes: req.body.notes
            });
          serviceorder.CurrentStatus='Onsite';
          serviceorder.save(function(err, serviceorder){
          res.render('/engineer')
            })
          })
          }



    if (req.body.button=='checkout'){
    ServiceOrder.findById(serviceorder_id)
      .exec(function(err, serviceorder){
          serviceorder.ServiceDetails.push({
            _id: (serviceorder.ServiceDetails.length + 1),
            _User: req.session.user._id,
            //_User: 84714,
            StatusDescription: 'Completed',
            Checkin: serviceorder.ServiceDetails[serviceorder.ServiceDetails.length-1].Checkin, 
            Checkout: Date.now(),
            ActionNotes: req.body.notes
            });
          serviceorder.CurrentStatus='Completed';
          serviceorder.save(function(err, serviceorder){
          res.render('/engineer')
            })
          })
          }

}

