// Bring Mongoose into the project
var mongoose = require('mongoose');
// Build the connection string
var dbURI = 'mongodb://localhost/itlp300';
// Create the database connection
mongoose.connect(dbURI);

//Setup Schemas

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
//serviceorder

var ReplacementPartsSchema = new mongoose.Schema({
    ComponentPrice: Number,
    ComponentDescription: String,
    PartNumber: Number,
    Quantity: Number
});

var ServiceDetailsSchema = new mongoose.Schema({
    _id: Number,
    _User:{
       type: Number,
       ref:'User' 
    },
    StatusDescription: String,
    AssignedDate: Date,
    AcceptedDate: Date,
    Checkin: Date,
    Checkout: Date,
    ActionNotes:String,
    ActualMinutes: Number
});



var serviceorderSchema = new mongoose.Schema({
    _id:Number,
    _createdBy:{
        type:Number,
        ref:'User'
    },
    ProblemTypeDescription: String,
    PriorityDescription: String,
    opendate:{
        type:Date,
        default:Date.now
    },
    CloseDate:Date,
    CurrentStatus: String,
    TotalEstimatedMinutes: Number,
    ProblemNotes:String,
    ProductCost: Number,
    CustomerContactInfo: {
        Name: String,
        Phone: Number,
        Email: String
    },
    _Equipment: {
        type:Number,
        ref:'Equipment'
    },
    _Product:{
        type:Number,
        ref:'Product'
    },
    ServiceDetails:[ServiceDetailsSchema],
    ReplacementParts:[ReplacementPartsSchema]
});



// status
var statusSchema = new mongoose.Schema({
    _id: Number,
    StatusDescription: String
});
//problemtypes
var problemtypesSchema = new mongoose.Schema({
    _id: Number,
    ProblemTypeDescription: String
});
//pmtypes
var pmtypesSchema = new mongoose.Schema({
    _id: Number,
    PMDescription: String
});
//priorities
var prioritySchema = new mongoose.Schema({
    _id: Number,
    PriorityDescription: String
});




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

//Add the additonal required schemas and subdocuments here.............



// Create Models

mongoose.model('Product', productsSchema, 'products');
mongoose.model('User', usersSchema, 'users');
mongoose.model('Equipment', equipmentSchema, 'equipment');
mongoose.model('Status', statusSchema, 'status');
mongoose.model('Priority', prioritySchema, 'priority');
mongoose.model('Pmtypes', pmtypesSchema, 'pmtype');
mongoose.model('Problemtypes', problemtypesSchema, 'problemtype');
mongoose.model('Serviceorder', serviceorderSchema, 'serviceorders');

//Add the additonal required models here (Remember subdocuments do not require a model).........




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
