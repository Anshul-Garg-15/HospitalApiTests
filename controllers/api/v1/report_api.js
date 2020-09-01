const Report = require('../../../model/report');
const Patient = require('../../../model/patient');
const Doctor = require('../../../model/doctor');

//for creating the patient reports
module.exports.create_report = function(req,res){
    

    try {
  
    let doctorID = req.user.id;
    let patientID = req.params.id;

    Patient.findById(patientID,function(err,patient){

        if(err){
            console.log("Error in finding patient",err);
            return;
        }
        Report.create({
            Status: req.body.Status,
            Date: req.body.Date,
            doctorID: doctorID,
            patient: patientID
        },function(err,report){
            if(err){
                console.log("Error in creating report",err);
                return;
            }
            patient.report.push(report);
            patient.save();
            return res.json(200, {
                data:
                {
                    report: report
                },
                message: "Patient report created"
            });
        });
    
    

    })

    


    } catch (err) {
        console.log('eer',err);
        return res.json(500,{
            message: "Internal server error"
        })       
    }
    
}

//for rendering all reports
module.exports.all_reports = function(req,res){
    try {
        let patientID = req.params.id
        Report.find({patient:patientID},function(err,report){
            if(err){
                console.log("Error in listing the reports",err);
                return;
            }
            return res.json(200 , {
                
                message: "List of all reports",
                report: report 
                
            });
        }).sort('createdAt');//oldest report first then  newest

    } catch (err) {
        return res.json(500,{
            message: "Internal server error"
        })       
        
    }
}


//for rendering the reports according to the status

module.exports.status = function(req,res){
    try {
        
        Report.find({Status:req.params.Status},function(err,report){
            if(err){
                console.log("Error in finding report",err);
                return;
            }
            return res.json(200 , {
                message: "Reports according to the status",
                report:report
            })
        })
    } catch (error) {
        return res.json(500,{
            message: "Internal server error"
        })       
        
    }
}

//