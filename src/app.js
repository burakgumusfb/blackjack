require('dotenv').config();
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());


process.on('unhandledRejection', (error) => {
    console.log(error)
});

process.on('uncaughtException', (error) => {
    console.log(error)
});

const mongodbUri = process.env.MONGODB_URI;

mongoose.connect(mongodbUri, {});

mongoose.set('returnOriginal', false);

mongoose.connection.on('error', (err) => {
    process.exit();
});

mongoose.connection.on('open', () => {
    console.log('mongodb connection has been opened.')
});

mongoose.Promise = global.Promise;

app.get('/health', async (req, res) => {
    res.send(process.env.NODE_ENV);
});

const appServer = http.createServer(app);

appServer.listen(process.env.NODE_PORT);