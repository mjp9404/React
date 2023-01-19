const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const AdminProfile = require('../../models/AdminProfile');
const Admin = require('../../models/Admin');


//  @route  GET api/adminprofile/me
//  @desc   Get current admin's profile
//  @access Private

router.get('/', auth, (req, res) => {
  try {
    const admin = await AdminProfile.findOne({ admin: req.admin.id}).populate('admin', ['name']);
    if (!admin) {
      return res.status(400).json({ msg: 'No Profile Found!' });
    }
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
    
module.exports = router;
