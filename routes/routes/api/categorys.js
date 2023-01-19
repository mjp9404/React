const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
let Category = require("../../models/Category");

router.route('/').get((req, res) => {
    Category.find()
        .then(categorys => res.json(categorys))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/:id').get((req, res) => {
    Category.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add',
    check('category_name', 'Category Name is Required').isString().notEmpty(),
     
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(400).json({errors: errors.array()});
        }

        const category_name = req.body.category_name;

        newCategory = new Category({category_name})

        newCategory.save()
           .then(() => res.json("Category Added!"))
           .catch(err => res.status(400).json("Error: " + err));
});

router.post('/update/:id',
    async (req, res) => {
    Category.findByIdAndUpdate(req.params.id)
        .then(category => {
            category.category_name = req.body.category_name;

            category.save()
                .then(() => res.json("Category Updated!"))
                .catch(err => res.status(400).json("Error: " + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;