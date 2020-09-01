const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
    
    Status: {
        type:String,
        required:true
    },
    Date: {
        type:String,
        required:true
    },

    doctorID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor'

    },
    //report will have the patient ID
    
    patient: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Patient'
  
        }
    
},{
    timestamps:true
});

const Report = mongoose.model('Report' , reportSchema);

module.exports = Report;