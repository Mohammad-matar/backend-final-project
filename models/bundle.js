const { Schema, model } = require('mongoose');

const ModelSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    price: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },

    product_id: [{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }],
}, { collection: "bundles", timestamps: true });

ModelSchema.pre(["find", "findOne"], function () {
    this.populate(["product_id"]);
});

const Model = model("Bundle", ModelSchema);
module.exports = Model;