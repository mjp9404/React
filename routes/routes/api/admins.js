const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
const Admin = require('../../models/Admin');
const User = require('../../models/User');

//  @route  POST api/admins
//  @desc   Register admin
//  @access Public
router.post('/', [
    check('firstName', 'Name is Rquired').isString().notEmpty(),
    check('lastName', 'Name is Rquired').isString().notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('phoneNumber')
    .isNumeric().withMessage('Please include a valid phone number')
    .isLength({min: 10, max: 10}),
    check('password').isLength({ min: 8, max: 15 })
    .withMessage("your password should have min and max length between 8-15")
    .matches(/\d/)
    .withMessage("your password should have at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("your password should have at least one special character")
    .matches(/[\a-\z]/)
    .withMessage("your password should have at least one lowercase character")
    .matches(/[\A-\Z]/)
    .withMessage("your password should have at least one uppercase character"),
    
],
async (req, res) => {
    const errors =validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()});
    }

    const {firstName, lastName, email, phoneNumber, password} = req.body;

    try {
    // See if user exists
        let user = await User.findOne({email});
        if(user)
        {
            return res.status(400).json({errors: [{msg: 'User already exists'}]});
        }   

        user = new User({
            firstName,
            lastName,
            email, 
            phoneNumber,           
            password            
        });

    // Encrypt password
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();
    
    // Return jasonwebtoken
       const payload = {
        user: {
            id: user.id
        }
       }

       jwt.sign(
        payload, 
        config.get('jwtSecret'),
        {expiresIn: 360000},
        (err, token) => {
            if(err)
            {
                throw err;
            }
            else
            {
                res.json({token});
            }
        });    

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    
});



/***********************
 **** For Users**********
********************** */


//  @route  DELETE api/admins
//  @desc   Delete user
//  @access Public
router.delete('/delete/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
            .then(()=> res.json('User account Deleted!'))
            .catch(err => res.status(400).json('Error: ' + err));
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

////////////////////////////

router.post('/update/:id', async (req, res) => {
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
                user.role = updateUser.role ? updateUser.role : user.role;
                user.company = updateUser.company ? updateUser.company : user.company;
                    user.save()
                    .then(()=> res.json('User account updated!'))
                    .catch(err => res.status(400).json('Error: ' + err));
            });
            
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });




module.exports = router;
