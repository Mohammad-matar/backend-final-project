require("dotenv").config();
var bodyParser = require("body-parser");

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
const { env } = require("process");
var createError = require("http-errors");
const cors = require("cors");

var adminsRouter = require('./routes/admin');
var bundlesRouter = require('./routes/bundle');
var categoriesRouter = require('./routes/category');
var ordersRouter = require('./routes/order');
var productsRouter = require('./routes/product');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

mongoose
    .connect(process.env.URL, {
        dbName: process.env.DB_NAME,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected Successfully to the Database");
    })
    .catch(console.error);


app.use('/api/admins', adminsRouter);
app.use('/api/bundles', bundlesRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/products', productsRouter);

//error handling
app.use((err, req, res, next) => {
    res.status(err.status || 500).send({
        success: false,
        message: err.message,
    });
});

// Undefined routes error handling
app.use((req, res, next) => {
    next(createError(404));
});

module.exports = app;
