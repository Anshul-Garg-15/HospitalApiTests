const express = require('express');
const route = express.Router();
const doctorApi = require('../../../controllers/api/v1/doctor_api');

//to register the doctor
route.post('/register' , doctorApi.register);

//to login the doctor 
route.post('/login' , doctorApi.login);
module.exports = route;