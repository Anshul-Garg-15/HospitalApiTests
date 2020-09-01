const Doctor = require('../../../model/doctor');
const jwt = require('jsonwebtoken');

//to register the new doctor
module.exports.register = function(req,res){

    try {
    
        Doctor.create(
            {
                email: req.body.email,
                password: req.body.password
            },
            function(err , doctor){
                if(err){
                    console.log('Error in registering the doctor' , err);
                    return;
                }
    
                return res.json(200, {
                    data: {
                        doctor: doctor
                    },
                    message: " Doctor registered successfully"
                });
            }
        );
    } catch (err) {

        return res.json(500,{
            message: "Internal server error"
        });
        
    }
    
}


//to login the doctor

module.exports.login = async function(req,res)
    {
        try {
            let doctor = await Doctor.findOne({email: req.body.email});

            if(!doctor || doctor.password != req.body.password){
                return res.json(433, {
                    message: "Invalid details or doctor not found"
                });
            }

            return res.json(200 , {
                data: {
                    //this set the token and send it to the user
                   token: jwt.sign(doctor.toJSON() , 'hospital' , {expiresIn: 400000000000000})

                },
                message: "Doctor login Successfully"
            });
        } catch (err) {
            return res.json(500 , {
                message: "Internal server error"
            })
        }

    }