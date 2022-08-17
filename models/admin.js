const { Schema, model } = require('mongoose');

const ModelSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { collection: "admins", timestamps: true });

const Model = model("Admin", ModelSchema);
module.exports = Model;