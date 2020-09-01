const express = require('express');
const router = express.Router();
const doctorApi = require('../../../controllers/api/v1/doctor_api');

//to register the doctor
router.post('/register' , doctorApi.register);

//to login the doctor 
router.post('/login' , doctorApi.login);
module.exports = router;