const express = require('express');
const CategoryController = require('../controllers/category');
const router = express.Router();

router.get('/', CategoryController.getCategories);

router.post('/', CategoryController.addCategory);

router.get('/:id', CategoryController.getCategory);

router.put('/:id', CategoryController.updateCategory);
module.exports = router;