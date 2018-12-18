const mongoose = require('mongoose');
const config = require('../env')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    lastname : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone:
    {
        type: String,
    },
    lookingFor: {
        type: Boolean,
        default: true,
    },
    cv: [
        {
            type: String,
        }
    ],
    birthdate : {
        type: Date
    },
    description: {
        type: String
    },
    company: {
        required: false
    },
    active: {
        type: Boolean,
        default: true
    }
});
userSchema.set('timestamps', true);
userSchema.pre('save', function(next){
    bcrypt.hash(this.password, 10, (err, hashedPAssword) => {
        if(!err){
            this.password = hashedPAssword.toString();
            next();
        }
    })    
    
})
userSchema.methods.checkPassword = function(passwordToValidate){
    return bcrypt.compare(passwordToValidate, this.password)
    .then(result => {
        return result
    })
    .catch(err => {
        throw err
    })
}
userSchema.methods.verifyCredentials = function(password){
    return this.checkPassword(password)
        .then(result => {
            return result
        })
        .catch(err => {
            throw err;
        })
    
}
userSchema.statics.generateToken = function(user){
    const token = jwt.sign({
        name: user.name,
        lastname: user.name,
        _id: user._id,
    }, config.jwt_private, {
        expiresIn: 60 * 60 * 24 * 7
    })
    return token;
}
module.exports = mongoose.model('User', userSchema);