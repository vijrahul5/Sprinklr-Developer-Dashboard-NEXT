const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Model for storing stand ups
const managerSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
});

module.exports =
    mongoose.models.managerModel ||
    mongoose.model("managerModel", managerSchema);
