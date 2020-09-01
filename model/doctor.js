const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
    
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },

    patient: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    }     
]
},
{
    timestamps: true
});

const Doctor = mongoose.model('Doctor' , doctorSchema);

module.exports = Doctor;
