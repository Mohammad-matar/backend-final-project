const Category = require('../models/category')
var createError = require('http-errors');
const mongoose = require('mongoose');

class Controller {
    getAll(req, res, next) {
        Category.find({}, (err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        })
    }

    getById(req, res, next) {
        let { id } = req.params;
        Category.findOne({ _id: id }, (err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        });
    }

    // getProductsById(req, res, next) {
    //     let { id } = req.params;
    //     Category.findOne({ _id: id }, (err, response) => {
    //         if (err) return next(err);
    //         res.status(200).send({ success: true, response });
    //     });
    // }


    // aggregation
    getProductsById(req, res, next) {
        let { id } = req.params;

        Category.aggregate(
            [
                {
                    $match: {
                        _id: mongoose.Types.ObjectId(id)
                    },
                },
                {
                    $lookup: {
                        from: "products",
                        localField: "_id",
                        foreignField: "category_id",
                        as: "products",
                    },
                },
                // {
                //     $lookup: {
                //         from: "sessions",
                //         localField: "_id",
                //         foreignField: "tutor",
                //         as: "user_sessions",
                //         pipeline: [
                //             {
                //                 $match: {
                //                     status: "reviewed",
                //                 },
                //             },
                //         ],
                //     },
                // },
                // {
                //     $addFields: {
                //         rate: { $avg: "$user_sessions.review.rating" },
                //     },
                // },
                // { $sort: { rate: -1 } },
            ],
            (err, response) => {
                if (err) return next(err);
                res.status(200).send({
                    success: true,
                    message: "Get Products by categoryID successfully",
                    response,
                });
            }
        );
    }


    post(req, res, next) {
        let { filename } = req.file;
        let { category_name, description } = req.body;
        let body = { category_name: category_name, description: description, image: filename };

        let doc = new Category(body);
        doc.save((err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        });
    }

    put(req, res, next) {
        let { id } = req.params; let body = req.body;
        Category.updateOne({ _id: id }, {
            $set: body
        }, (err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        });
    }

    delete(req, res, next) {
        let { id } = req.params;
        Category.findByIdAndDelete({ _id: id }, (err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        })
    }
}

const controller = new Controller();
module.exports = controller;