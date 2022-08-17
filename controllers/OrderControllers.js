const Order = require('../models/order')
var createError = require('http-errors');

class Controller {
    getAll(req, res, next) {
        Order.find({}, (err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        })
    }

    getById(req, res, next) {
        let { id } = req.params;
        Order.findOne({ _id: id }, (err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        });
    }

    post(req, res, next) {
        let body = req.body;
        let doc = new Order(body);
        doc.save((err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        });
    }

    put(req, res, next) {
        let { id } = req.params; let body = req.body;
        Order.updateOne({ _id: id }, {
            $set: body
        }, (err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        });
    }

    delete(req, res, next) {
        let { id } = req.params;
        Order.findByIdAndDelete({ _id: id }, (err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        })
    }
}


const controller = new Controller();
module.exports = controller;