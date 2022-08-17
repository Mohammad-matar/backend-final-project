const Bundle = require('../models/bundle')
var createError = require('http-errors');

class Controller {
    getAll(req, res, next) {
        Bundle.find({}, (err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        })
    }

    getById(req, res, next) {
        let { id } = req.params;
        Bundle.findOne({ _id: id }, (err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        });
    }

    post(req, res, next) {
        let { filename } = req.file;
        let { name, price, product_id } = req.body;

        let body = { name: name, price: price, image: filename, product_id: product_id }
        let doc = new Bundle(body);
        doc.save((err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        });
    }

    put(req, res, next) {
        let { id } = req.params; let body = req.body;
        Bundle.updateOne({ _id: id }, {
            $set: body
        }, (err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        });
    }

    delete(req, res, next) {
        let { id } = req.params;
        Bundle.findByIdAndDelete({ _id: id }, (err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        })
    }
}

const controller = new Controller();
module.exports = controller;