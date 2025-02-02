const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;

// Replace with your MongoDB Atlas connection string
const mongoURI = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority';

// Connect to MongoDB Atlas
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define a schema and model for the data
const dataSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    location: String
});

const Data = mongoose.model('Data', dataSchema);

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Serve the index.html file from the root directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint to save data
app.post('/api/data', (req, res) => {
    const newData = new Data(req.body);
    newData.save((err) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send('Data saved successfully');
    });
});

// API endpoint to get data
app.get('/api/data', (req, res) => {
    Data.find({}, (err, data) => {
        if (err) return res.status(500).send(err);
        return res.status(200).json(data);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});