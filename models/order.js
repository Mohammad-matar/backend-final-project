const { Schema, model } = require('mongoose');

const ModelSchema = new Schema({
    full_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    phone_number: {
        type: Number,
        required: true
    },
    // quantity: {
    //     type: Number,
    //     default: 1,
    //     minimum: 1
    // },
    product_id: [
        {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true
        }]
}, { collection: "orders", timestamps: true });

ModelSchema.pre(["find", "findOne"], function () {
    this.populate(["product_id"]);
});

const Model = model("Order", ModelSchema);
module.exports = Model;