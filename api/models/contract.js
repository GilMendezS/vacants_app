const mongoose = require('mongoose');
const contractSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    active: {
        type: Boolean,
        default: true
    }
});
contractSchema.set('timestamps', true);
module.exports = mongoose.model('Contract', contractSchema);
