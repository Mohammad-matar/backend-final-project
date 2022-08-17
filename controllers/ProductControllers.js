const Product = require('../models/product')
var createError = require('http-errors');

class Controller {
    getAll(req, res, next) {
        Product.find({}, (err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        })
    }

    getById(req, res, next) {
        let { id } = req.params;
        Product.findOne({ _id: id }, (err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        });
    }

    post(req, res, next) {
        let { filename } = req.file;
        let { name, description, price, category_id } = req.body;
        let body = { name: name, description: description, image: filename, price: price, category_id: category_id };
        
        let doc = new Product(body);
        doc.save((err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        });
    }

    put(req, res, next) {
        let { id } = req.params; let body = req.body;
        Product.updateOne({ _id: id }, {
            $set: body
        }, (err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        });
    }

    delete(req, res, next) {
        let { id } = req.params;
        Product.findByIdAndDelete({ _id: id }, (err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        })
    }

}

const controller = new Controller();
module.exports = controller;