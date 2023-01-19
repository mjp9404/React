const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const User = require('../../models/User');
const {check, validationResult} = require('express-validator');

const { isValidObjectId } = require('mongoose');
const VerificationToken = require("../../models/verificationToken");
const { mailtransport, plainEmailTemplate } = require('../../utils/sendEmail');




//  @route  GET api/profile/me
//  @desc   Get current users profile
//  @access Private
router.get('/', auth, (req, res) => res.send('Profile route'));


router.get('/:id', async (req, res) => {
    try {
        const errors =validationResult(req);
        const user = await User.findById(req.params.id)
        .then(user => res.json(user));
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// To test
// POST: http://localhost:5000/api/profile/update/62eee341dca8ec01800215c0
router.post('/update/:id', auth, async (req, res) => {
    try {
        const updateUser = req.body;
        const user = await User.findById(req.params.id)
        .then(user =>{

            user.firstName = updateUser.firstName ? updateUser.firstName : user.firstName;
            user.lastName = updateUser.lastName ? updateUser.lastName : user.lastName;
            user.email = updateUser.email ? updateUser.email : user.email;
            user.phoneNumber = updateUser.phoneNumber ? updateUser.phoneNumber : user.phoneNumber;
            user.password = updateUser.password ? updateUser.password : user.password;
            user.status = updateUser.status ? updateUser.status : user.status;
            user.company = updateUser.company ? updateUser.company : user.company
                user.save()
                .then(()=> res.json('User account updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        });
        
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// Delete User account, Accepted 
// To delete Account 
// "DELETE: http://localhost:5000/api/users/id"
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
            .then(()=> res.json('User account Deleted!'))
            .catch(err => res.status(400).json('Error: ' + err));
        
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//verify email
router.post('/verify-email', async (req, res) => {
    const{id, OTP} = req.body
    if(!id || !OTP.trim())
    {
        return res.status(401).send('Invalid verification code');
    }

    if(!isValidObjectId(id))
    {
        return res.status(401).send('Invalid user id');
    }

    const user = await User.findById(id)

    if(!user)
    {
        return res.status(401).send('User not found');
    }

    if(user.verified)
    {
        return res.status(401).send('Account already verified');
    }

    const token = await VerificationToken.findOne({owner: user._id})

    if(!token)
    {
        return res.status(401).send('User not found');
    }

    // const isMatched = await token.compareToken(OTP)
    // if(!isMatched)
    // {
    //     return res.status(401).send('Please provide a valid token');
    // }

    user.verified = true;

    await VerificationToken.findByIdAndDelete(token._id);

    await user.save();

    mailtransport().sendMail({
        from: 'emailverification@example.com',
        to: user.email,
        subject: "Welcome to HOME nVentory",
        html: plainEmailTemplate("Email verified", "Thank you")
    });

    // return res.status(200).send('Your email is verified');

});

module.exports = router;
