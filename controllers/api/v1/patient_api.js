const Patient = require('../../../model/patient');
const Doctor = require('../../../model/doctor');
const passport = require('passport');
const jwt = require('jsonwebtoken');


module.exports.register = function(req,res){

    try {
        
        let doctorID = req.user;

        Patient.findOne({phoneNumber: req.body.phoneNumber},function(err , patient){

            if(err){
                console.log("Error in finding patient",err);
                return;
            }

            if(!patient){
                Patient.create({
                    phoneNumber: req.body.phoneNumber,
                    patientName: req.body.patientName,
                    doctorID: doctorID
                },function(err,patient){
                    if(err){
                        console.log("Error in registering the patient",err);
                        return;
                    }
                    doctorID.patient.push(patient);
                    doctorID.save();
                    return res.json(200,{
                        data:
                        {
                            patient: patient
                        },
                        message: "Patient registered successfully"
                    });
                });
            }else{
                return res.json(200,{
                    patient:patient,
                    message: "Patient has already registered with this mobile number"
                })
            }
        });

    } catch (err) {
        return res.json(500,{
            message: "Internal server error"
        })
    }
}