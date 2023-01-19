const mongoose = require('mongoose');


const adminSchema = new mongoose.Schema({
    firstName: {
        type: String, 
        required: true
    },
    lastName: {
        type: String, 
        required: true
    },    
    email: {
        type: String, 
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    company: {
        type: String, 
    },   
    role:{
        type: String,
        default: "admin",
        required: true
    }, 
    
});

const Admin = mongoose.model('admin', adminSchema);

module.exports = Admin;
