const User = require('../models/user');

exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json({
            data: users
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching users',
            error
        })
    }
}
exports.signupUser = async (req, res, next) => {
    try {
        const user = new User({
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            lookingFor: req.body.lookingfor,
            companyId : req.body.company
        })
        await user.save()
        return res.status(200).json({
            message:'User created successfully!',
        })
    } catch (error) {
        return res.status(500).json({
            message:'Error creating the account',
            error
        })
    }
}
exports.getUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        return res.status(200).json({
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetchig the user',
            error
        })
    }
}
exports.updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const userUpdated = await User.findByIdAndUpdate(userId, req.body);
        return res.status(200).json({
            message: 'User updated successfully!',
            data:  userUpdated
        })
    } catch (error) {
        return res.status(500).json({
            message:'Error updating the information',
            error
        })
    }
}

exports.removeUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        await User.findByIdAndUpdate(userId, { active: false })
        return res.status(200).json({
            message: 'User now is inactive',
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error removing the user',
            error
        })
    }
}