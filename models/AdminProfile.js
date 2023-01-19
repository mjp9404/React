const mongoose = require('mongoose');

const AdminProfileSchema = new mongoose.Schema({
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    },
    
});

const AdminProfile = mongoose.model('admin', AdminProfileSchema);

module.exports = AdminProfile;
