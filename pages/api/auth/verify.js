import dbConnect from "../../../utils/dbConnect";

dbConnect();

const { verify } = require("../../../controller/authController");

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case "GET":
            await verify(req, res);
            break;

        default:
            res.status(400).json({ status: "Failed" });
            break;
    }
}
