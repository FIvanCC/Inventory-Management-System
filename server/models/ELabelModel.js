const mongoose = require('mongoose');

// Define the schema
const ELabelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

// Create the model
const ELabel = mongoose.model('ELabel', ELabelSchema);

module.exports = ELabel;