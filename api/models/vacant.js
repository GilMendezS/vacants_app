const mongoose = require('mongoose');

const vacantSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Company'
    },
    salary: {
        type: Number,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    contractId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contract',
        required: true,
    },
    statusId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Status',
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    creatorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    applicants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
})
vacantSchema.set('timestamps', true);
module.exports = mongoose.model('Vacant', vacantSchema);