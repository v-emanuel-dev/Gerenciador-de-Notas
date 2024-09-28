// app.js

// Importing necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initializing the Express application
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Importing and using the post routes
const postsRoutes = require('./routes/postsRoutes');
app.use('/posts', postsRoutes);

// Exporting the app instance to be used in server.js
module.exports = app;
