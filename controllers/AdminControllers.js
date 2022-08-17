const Admin = require('../models/admin');
var createError = require('http-errors');

class Controller {
    getAll(req, res, next) {
        Admin.find({}, (err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        })
    }

    getById(req, res, next) {
        let { id } = req.params;
        Admin.findOne({ _id: id }, (err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        });
    }

    post(req, res, next) {
        let body = req.body;
        let doc = new Admin(body);
        doc.save((err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        });
    }

    put(req, res, next) {
        let { id } = req.params; let body = req.body;
        Admin.updateOne({ _id: id }, {
            $set: body
        }, (err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        });
    }

    delete(req, res, next) {
        let { id } = req.params;
        Admin.findByIdAndDelete({ _id: id }, (err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        })
    }
}

const controller = new Controller();
module.exports = controller;