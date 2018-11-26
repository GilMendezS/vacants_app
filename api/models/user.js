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
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    }
});
userSchema.set('timestamps', true);
userSchema.pre('save', function(){
    bcrypt.hash(this.password, 10, (err, hashedPAssword) => {
        if(!err){
            this.password = hashedPAssword;
        }
    })
    next();
})
module.exports = mongoose.model('User', userSchema);