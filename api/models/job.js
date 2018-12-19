const mongoose = require('mongoose');

const schemaJob = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true,
    },
    current_job: {
        type: Boolean,
        default: false
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})
schemaJob.set('timestamps',true);

module.exports = mongoose.model('Job', schemaJob);