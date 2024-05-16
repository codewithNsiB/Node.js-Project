const mongoose = require('mongoose');

require('dotenv').config();

// Update below to match your own MongoDB connection string.
const MONGO_URL = process.env.MONGO_URL;


mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
});