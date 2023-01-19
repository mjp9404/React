const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
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
    // Activation
    // 1 is active, 0 is deactive
    role:{
        type: String,
        default: 'User',
        enum: ['User', 'sys_admin', 'company_admin' ],
        required: true
    },
    // Activation
    // 1 is active, 0 is deactive
    status:{
        type: String,
        defualt: '1',
        enum: ['0', '1'],
        required: true
    },
    //Company
    company: {
        type: String,
        required: false 
    },  

    //email verification
    verified: {
        type: Boolean,
        default: false,
        required: true,
    }
    
    
});

const User = mongoose.model('user', userSchema);

module.exports = User;
