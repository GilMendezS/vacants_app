const Category = require('../models/category');
exports.getCategories = async (req, res, next) => {
    try{
        const categories = await Category.find();
        return res.status(200).json({
            data: categories
        });
    }
    catch(err){
        return res.status(500).json({
            message:'Problems fetching categories',
            error: err
        });
    }
}