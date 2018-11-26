const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        require: false
    },
    imageUrl: {
        type: String,
        required: false
    }
})
companySchema.set('timestamps', true);
module.exports = mongoose.model('Company', companySchema);