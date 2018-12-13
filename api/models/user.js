const mongoose = require('mongoose');
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
    phones: [
        {
            type: String,
        }
    ],
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
module.exports = mongoose.model('User', userSchema);