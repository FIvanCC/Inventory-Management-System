const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

const ELabel = require('./models/ELabelModel');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/slmsDatabase'); // put your own database link here

const db = mongoose.connection;
// Upon connection failure
db.on('error', console.error.bind(console, 'Connection error:'));
// Upon opening the database successfully
db.once('open', function () {
    console.log("Connection is open...");
    // const newELabel = new ELabel({
    //     name: 'Apple juice',
    //     price: 10,
    //     quantity: 5
    // });

    // newELabel.save()
    //     .then((doc) => {
    //         console.log('Document saved:', doc);
    //     })
    //     .catch((err) => {
    //         console.error('Error saving document:', err);
    //     });

    //get all the elabels
    app.get('/getELabels/', (req, res) => {
        ELabel.find({}, "-_id -__v")
            .then((data) => {
                console.log('Data:', data);
                res.send(data);
            })
            .catch((error) => {
                console.error('Error:', error);
                res.status(500).send(error);
            });
    });

    app.get('/getELabel/:name', (req, res) => {
        const name = req.params.name;

        ELabel.findOne({ name: name }, "-_id -__v")
            .then((data) => {
                if (data) {
                    console.log('Data:', data);
                    res.send(data);
                } else {
                    res.status(404).send({ message: 'ELabel not found' });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                res.status(500).send(error);
            });
    });


    app.all('/*', (req, res) => {
        res.send('Hello World!');
    });

})
// listen to port 3000
const server = app.listen(3000, '0.0.0.0', () => {
    console.log('Server is running on port 3000 and is accessible from other devices on the same network');
});