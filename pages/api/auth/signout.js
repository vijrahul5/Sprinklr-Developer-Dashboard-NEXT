import dbConnect from "../../../utils/dbConnect";

dbConnect();

const { signOut } = require("../../../controller/authController");

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case "GET":
            await signOut(req, res);
            break;

        default:
            res.status(400).json({ status: "Failed" });
            break;
    }
}
