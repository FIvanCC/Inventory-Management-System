const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    file: String
});

const Image = mongoose.model('Image', ImageSchema);
module.exports = Image;
