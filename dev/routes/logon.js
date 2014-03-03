var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var User = mongoose.model('User');
var Equipment = mongoose.model('Equipment');
var ServiceOrder = mongoose.model('ServiceOrder');
var Status = mongoose.model('Status');
var PMType = mongoose.model('PMType');
var Priority = mongoose.model('Priority');
var ProblemType = mongoose.model('ProblemType');

exports.logon = function(req, res){
  	res.render('logon');
};

exports.verify2 = function(req, res){
	User.find({UserName: req.body.inputUsername})
	.exec(function (err, product){
	product.forEach(function(product){
			res.render('verify2', {RoleName: product.RoleName});
	});
	//console.log(p1.RoleName);


	});
};