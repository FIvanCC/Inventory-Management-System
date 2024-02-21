const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const ELabel = require('./models/ELabelModel');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/slmsDatabase'); // put your own database link here

const db = mongoose.connection;
// Upon connection failure
db.on('error', console.error.bind(console, 'Connection error:'));
// Upon opening the database successfully
db.once('open', function () {
    console.log("Connection is open...");
    const newELabel = new ELabel({
        name: 'Example Name',
        price: 100,
        quantity: 20
    });

    newELabel.save()
        .then((doc) => {
            console.log('Document saved:', doc);
        })
        .catch((err) => {
            console.error('Error saving document:', err);
        });

    app.all('/*', (req, res) => {
        res.send('Hello World!');
    });

})
// listen to port 3000
const server = app.listen(3000, '0.0.0.0', () => {
    console.log('Server is running on port 3000 and is accessible from other devices on the same network');
});