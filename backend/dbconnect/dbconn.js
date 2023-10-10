const mongoose = require('mongoose');
require('dotenv').config();
const url = process.env.MONGO_URI;

function dbconn() {
  try {
    mongoose.connect(url);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}
 
module.exports = dbconn;
