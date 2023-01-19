const mongoose = require('mongoose');


const companySchema = new mongoose.Schema({
    // companyId: {
    //     type: String, 
    //     required: true
    // } , 
    companyName: {
        type: String, 
        required: true
    } ,  
});

const Company = mongoose.model('company', companySchema);

module.exports = Company;