const path = require('path');
const fs = require('fs');
const express = require('express');

const mongoose = require('mongoose');

// get the db, user and pw (if set)
const mongoDbUri = require('../config/db');

// connect to mongoose
mongoose.Promise = require('bluebird');
mongoose.connect(mongoDbUri);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo error'));

// import the route(s)
const crudRoutes = require('./routes/crud');

// create the app
const app = express();

// enable cors for my react localhost
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://192.168.43.74:3005");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

// use route
app.use('/', crudRoutes);

// error
app.use((err, req, res, next) => {
    res.status(err.status || 500);
});

// export (to use it in bin/www)
module.exports = app;