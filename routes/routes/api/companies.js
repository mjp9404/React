const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
let Company = require("../../models/Company");
const auth = require('../../middleware/auth');

router.route('/', auth).get((req, res) => {
    Company.find()
        .then(companies => res.json(companies))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/:id', auth).get((req, res) => {
    Company.findById(req.params.id)
        .then(companies => res.json(companies))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', auth,
    check('companyName', 'Company Name is Required').isString().notEmpty(),
     
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(400).json({errors: errors.array()});
        }

        const companyName = req.body.companyName;
        
        let company = await User.findOne({companyName});

        if(company)
        {
            return res.status(400).json({errors: [{msg: 'Company name already exists'}]});
        }   
        newCompany = new Company({companyName})

        newCompany.save()
           .then(() => res.json("Company Added!"))
           .catch(err => res.status(400).json("Error: " + err));
});

router.post('/update/:id', auth,
    async (req, res) => {
        Company.findByIdAndUpdate(req.params.id)
        .then(company => {
            company.companyName = req.body.companyName;

            company.save()
                .then(() => res.json("Company Updated!"))
                .catch(err => res.status(400).json("Error: " + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


router.delete('/delete/:id',auth, async (req, res) => {
    try {
        const companies = await Company.findByIdAndDelete(req.params.id)
            .then(()=> res.json('Company Deleted!'))
            .catch(err => res.status(400).json('Error: ' + err));
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;