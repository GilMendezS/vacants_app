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
exports.siginUser = (req, res, next) => {
    let userFound = null;
    User.findOne({email: req.body.email})
    .then(user => {
        if(!user){
            return res.status(404).json({
                message:'User not found'
            })
        }
        userFound = user;
        return user.checkPassword(req.body.password)
    })
    .then(result => { 
        if(result){
            const token = User.generateToken(userFound)
            return res.status(200).json({
                message: 'Login successfully',
                token
            })
        }
        return res.status(422).json({
            message: 'Error, this credentias are not valid'
        })
    })
    .catch(err => {
        return res.status(500).json({
            message: 'Error checking credentials',
            err
        })
    })
    
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