const { Schema, model } = require('mongoose');

const ModelSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
}, { collection: "products", timestamps: true });

ModelSchema.pre(["find", "findOne"], function () {
    this.populate(["category_id"]);
});

const Model = model("Product", ModelSchema);
module.exports = Model;