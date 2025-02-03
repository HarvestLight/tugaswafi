const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;

// Replace with your MongoDB Atlas connection string
const uri = "mongodb+srv://Wafi:28@cluster0.kniew.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // Define a schema and model for the data
    const database = client.db('mydatabase');
    const collection = database.collection('datas');

    // Middleware
    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname)));

    // Serve the index.html file from the root directory
    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, 'index.html'));
    });

    // API endpoint to save data
    app.post('/api/data', async (req, res) => {
      try {
        const newData = req.body;
        await collection.insertOne(newData);
        res.status(200).send('Data saved successfully');
      } catch (err) {
        res.status(500).send(err);
      }
    });

    // API endpoint to get data
    app.get('/api/data', async (req, res) => {
      try {
        const data = await collection.find({}).toArray();
        res.status(200).json(data);
      } catch (err) {
        res.status(500).send(err);
      }
    });

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error(err);
  }
}

run().catch(console.dir);