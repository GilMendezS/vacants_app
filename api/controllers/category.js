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
exports.addCategory = async (req, res, next) => {
    const category = new Category({
        title: req.body.title
    });
    try {
        await category.save();
        return res.status(200).json({
            messsage: 'Category created',
            data: category
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error saving the category',
            error
        });
    }
}
exports.getCategory = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        const category = await Category.findById(categoryId);
        return res.status(200).json({
            data: category
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching category',
            error
        });
    }
}
exports.updateCategory = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        const updatedCategory = await Category.findByIdAndUpdate(categoryId, req.body);
        return res.status(200).json({
            message: 'Category modified correctly',
            data: updatedCategory
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error updating the category',
            error
        })
    }
}
exports.removeCategory = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        await Category.findByIdAndRemove(categoryId);
        return res.status(200).json({
            message: 'Category Removed',
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error removing the category',
            error
        })
    }
}