const express = require('express');
const bodyParser = require('body-parser');
const limiter = require('./src/middleware/limiter');
const app = express();

app.use(limiter);
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


