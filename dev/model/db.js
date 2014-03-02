// Bring Mongoose into the project
var mongoose = require('mongoose');
// Build the connection string
var dbURI = 'mongodb://localhost/itlp300';
// Create the database connection
mongoose.connect(dbURI);

//Setup Schemas

//Equipment
var equipmentSchema = new mongoose.Schema({
  _id: Number,
  _User: {
    type: Number,
    ref: 'User'
  },
  _Product: {
    type: Number,
    ref: 'Product'
  },
  StatusDescription: String,
  SerialNumber: String,
  Room: String,
  InstallDate: Date,
  NextPMDate: Date,
  NextPMDescription: String
});

//PM Type
var pmTypeSchema = new mongoose.Schema({
  _id: Number,
  PMDescription: String
});

//Priority
var prioritySchema = new mongoose.Schema({
  _id: Number,
  PriorityDescription: String
});

//Problem Type
var problemTypeSchema =new mongoose.Schema({
  _id: Number,
  ProblemTypeDescription: String
});

//Components - a subdocument of Products.
var componentsSchema = new mongoose.Schema({
  ComponentPrice: Number,
  ComponentDescription: String,
  ComponentPartNumber: String
});

//Products
var productsSchema = new mongoose.Schema({
  _id: Number,
  ProductName: String,
  Modality: String,
  ProductPrice: Number,
  ProductCost: Number,
  Components: [componentsSchema]
});

//Component 2 - subdocument of Service Orders.
var serviceDetailsSchema = new mongoose.Schema({
  _id: Number,
  _User: {
    type: Number,
    ref: 'User'
  },
  StatusDescription: String,
  AssignedDate: Date,
  AcceptedDate: Date,
  ApprovedDate: Date,
  Checkin: Date,
  Checkout: Date,
  ActionNotes: String,
  ActualMinutes: Number
});

//Component 3 - subdocument of Service Orders.
var replacementPartsSchema = new mongoose.Schema({
  ComponentPrice: Number,
  ComponentDescription: String,
  PartNumber: String,
  Quantity: Number
});

//Service Orders
var serviceOrdersSchema = new mongoose.Schema({
  _id: Number,
  _CreatedBy: {
    type: Number,
    ref: 'User'
  },
  ProblemTypeDescription: String,
  PriorityDescription: String,
  OpenDate: {
    type: Date,
    default: Date.now
  },
  CloseDate: Date,
  CurrentStatus: String,
  TotalEstimatedMinutes: Number,
  ProblemNotes: String,
  LaborCost: Number,
  PartCost: Number,
  CustomerContactInfo: {
    Name: String,
    Phone: String,
    Email: String
  },
  _Equipment: {
    type: Number,
    ref: 'Equipment'
  },
  _Product: {
    type: Number,
    ref: 'Product'
  },
  ServiceDetails: [serviceDetailsSchema],
  ReplacementParts: [replacementPartsSchema],
  PMDescription: String
});

//Status
var statusSchema = new mongoose.Schema({
  _id: Number,
  StatusDescription: String
});

//Users
var usersSchema = new mongoose.Schema({
  _id: Number,
  RoleName: String,
  UserName: String,
  Password: String,
  FirstName: String,
  LastName: String,
  Street: String,
  City: String,
  Province: String,
  PostalCode: String,
  Email: String,
  Phone: String,
  CustomerName: String,
  CustomerType: String,
  ContractType: String,
  CountryName: String,
  RegionName: String,
  Position: String
});

// Create Models

mongoose.model('Equipment', equipmentSchema, 'equipment');
mongoose.model('PMType',pmTypeSchema,'pmtype');
mongoose.model('Priority',prioritySchema,'priority');
mongoose.model('ProblemType',problemTypeSchema,'problemtype');
mongoose.model('Product', productsSchema, 'products');
mongoose.model('ServiceOrder',serviceOrdersSchema,'serviceorders');
mongoose.model('Status',statusSchema,'status');
mongoose.model('User', usersSchema, 'users');

//Catch events

mongoose.connection.on('connected', function() {
  console.log('Mongoose Connect to ' + dbURI);
});

mongoose.connection.on('error', function(err) {
  console.log('Mongoose Connection Error ' + err);
});

mongoose.connection.on('disconnected', function() {
  console.log('Mongoose Disconnected');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    console.log('Mongoose Disconnected Through App Termination');
    process.exit(0);
  });
});
