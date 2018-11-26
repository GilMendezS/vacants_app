const express = require('express');
const CategoryController = require('../controllers/category');
const router = express.Router();

router.get('/', CategoryController.getCategories);

router.post('/', CategoryController.addCategory);
module.exports = router;