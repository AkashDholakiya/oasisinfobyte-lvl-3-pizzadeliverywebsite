const express = require('express');
const mongoconn = require('./dbconnect/dbconn');
const cors = require('cors');
const auth = require('./routes/auth');
const pizza = require('./routes/pizzaRoute');
const cart = require('./routes/cartRoute');
const dotenv = require('dotenv');
 
const app = express();
const port = process.env.PORT || 4000;

// middleware 
app.use(cors()); 
app.use(express.json());
dotenv.config();

// routes 
app.use('/api/v1/auth/', auth);
app.use('/api/v1/pizza/', pizza);
app.use('/api/v1/cart/', cart);

// listen
app.listen(port, () => {  
    mongoconn();
    console.log(`Server is running on port: ${port}`);
});