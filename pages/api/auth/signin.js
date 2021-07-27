import dbConnect from "../../../utils/dbConnect";

dbConnect();

const {
    signIn,
} = require("../../../controller/authController");

export default async function handler(req, res) {
    console.log("here");
    const { method } = req;

    switch (method) {
        case "POST":
            await signIn(req, res);
            break;
        default:
            res.status(400).json({ status: "Failed" });
            break;
    }
}
