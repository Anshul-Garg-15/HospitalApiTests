const express = require('express');
const passport = require('passport');
const route = express.Router();
const patientApi = require('../../../controllers/api/v1/patient_api');
const reportApi = require('../../../controllers/api/v1/report_api'); 

//to register the patient
route.post('/register' , passport.authenticate('jwt',{session:false}), patientApi.register);

//to create the reports from the patient id 
route.post('/:id/create_report' , reportApi.create_report);

//to rendering all the reports according to the patient id
route.get('/:id/all_reports' , reportApi.all_reports);

//to render the report filtered by the status 
route.get('/reports/:Status' ,  reportApi.status);

module.exports = route;