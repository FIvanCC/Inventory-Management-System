const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const path = require('path');
const fs = require('fs');

app.use(cors());
app.use(express.json());

const ELabel = require('./models/ELabelModel');
const Image = require('./models/ImageModel');
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

    // const imagePath = path.join('C:/Users/ccfgu/Desktop/For_all_the_shit', '2.png');

    // const newImage = new Image({
    //     name: 'My Image',
    //     image: {
    //         data: fs.readFileSync(imagePath),
    //         contentType: 'image/png'
    //     }
    // });

    // newImage.save()
    //     .then((doc) => {
    //         console.log('Image saved:', doc);
    //     })
    //     .catch((err) => {
    //         console.error('Error saving image:', err);
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
    //find an elabel by name
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

    //update an elabel price by name
    app.put('/putELabel/:name/price/:price', (req, res) => {
        const name = req.params.name;
        const newPrice = req.params.price;

        ELabel.findOneAndUpdate({ name: name }, { price: newPrice }, { new: true, useFindAndModify: false })
            .then((data) => {
                if (data) {
                    console.log('Data:', data);
                    res.status(200).send(data);
                } else {
                    res.status(404).send({ message: 'ELabel not found' });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                res.status(500).send(error);
            });
    });
    //update an elabel quantity by name
    app.put('/putELabel/:name/quantity/:quantity', (req, res) => {
        const name = req.params.name;
        const newQuantity = req.params.quantity;

        ELabel.findOneAndUpdate({ name: name }, { quantity: newQuantity }, { new: true, useFindAndModify: false })
            .then((data) => {
                if (data) {
                    console.log('Data:', data);
                    res.status(200).send(data);
                } else {
                    res.status(404).send({ message: 'ELabel not found' });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                res.status(500).send(error);
            });
    });

    app.post('/cam/upload', (req, res) => {
        let chunks = [];
        req.on('data', chunk => chunks.push(chunk));
        req.on('end', () => {
            const img = Buffer.concat(chunks).toString('base64');
            const newImageData = { file: img };
            Image.findOneAndReplace({}, newImageData, { upsert: true })
                .then(() => {
                    console.log("Image inserted");
                    res.sendStatus(200);
                })
                .catch(err => {
                    console.error(err);
                    res.status(500).send(err);
                });
        });
    });
    // Add the new endpoints for image handling
    app.post('/cam/upload', upload.single('image'), (req, res) => {
        const img = fs.readFileSync(req.file.path, 'base64');
        const newImageData = { file: img };
        Image.findOneAndReplace({}, newImageData, { upsert: true })
            .then(() => {
                console.log("Image inserted");
                //return unlinkAsync(req.file.path);
            })
            .then(() => {
                res.sendStatus(200);
            })
            .catch(err => {
                console.error(err);
                res.status(500).send(err);
            });
    });

    app.get('/cam/image', (req, res) => {
        Image.findOne().sort({ createdAt: -1 })
            .then(image => {
                if (!image) {
                    res.status(404).send('No image found');
                } else {
                    res.send(image.file);
                }
            })
            .catch(err => {
                console.error(err);
                res.status(500).send(err);
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