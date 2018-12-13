const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
    title: {
        type: String,
        required
    },
    active: {
        type: Boolean,
        dafault: true
    }
});
statusSchema.set('timestamps', true);
module.exports = mongoose.model('Status', statusSchema);