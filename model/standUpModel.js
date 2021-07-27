const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Model for storing stand ups
const standUpSchema = new Schema(
    {
        questions: [{ type: String }],
        author: {
            type: Schema.Types.ObjectId,
            ref: "employeeModel",
            required: true,
        },
    },
    { timestamps: true }
);

module.exports =
    mongoose.models.standUpModel ||
    mongoose.model("standUpModel", standUpSchema);
