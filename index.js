require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const limiter = require('./src/middleware/limiter');
const userRoutes = require('./src/routes/userRoutes');
const blogRoutes =require('./src/routes/blogRoutes');
const cors = require('cors');
const app = express();
const PORT = process.env.NOD_PORT;

// app.use(limiter);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/user' , userRoutes);
app.use('/blog' , blogRoutes);


app.listen( PORT , () => {
    console.log(`App is listening at port: ${PORT}`)
})