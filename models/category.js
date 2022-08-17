const { Schema, model } = require('mongoose');

const ModelSchema = new Schema({
    category_name: {
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
    }
}, { collection: "categories", timestamps: true });

const Model = model("Category", ModelSchema);
module.exports = Model;