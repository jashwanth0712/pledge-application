const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Object = require("./object");
require('dotenv').config();
const cors = require("cors");

const fs = require("fs");
const path = require("path");
const app = express();
app.use(bodyParser.json());
app.use(cors());
// Custom CORS headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*'); // Replace '*' with your specific origins if needed.
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
    next();
  });
const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});


app.get("/", (req, res) => {res.status(200).send("Hello World!")});

  
// Create a new User
app.post('/', async (req, res) => {
    try {
      const {
        name,
        mobile,
        email
      } = req.body;
  
      const newUser = new Object({
        name,
        mobile,
        email
      });
  
      const savedUser = await newUser.save();
      res.status(201).json({"message": "User created", "user": savedUser});
    } catch (error) {
      res.status(500).json({ error: 'Error creating User' });
    }
  });
// Send the PDF file
app.get("/pdf", (req, res) => {
    const pdfPath = path.resolve(__dirname, "./sample.pdf");
  
    fs.readFile(pdfPath, (error, data) => {
      if (error) {
        console.error('Error reading PDF:', error);
        res.status(500).send('Internal Server Error');
      } else {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=sample.pdf');
        res.send(data);
      }
    });
  });
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));