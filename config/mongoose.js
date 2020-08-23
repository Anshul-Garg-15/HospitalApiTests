//import mongoose
const mongoose = require('mongoose');

//connect database and give it name
mongoose.connect("mongodb://localhost/HospitalApiWithTests");

//acquire connection in the database
const db = mongoose.connection;

//check error in connecting with database
db.on('error', console.error.bind(console , "error in connection"));

//run the database if it hasn't any error
db.once('open' , function(){
    console.log("Connect to the database :: MongoDB");
})

module.exports = db;

