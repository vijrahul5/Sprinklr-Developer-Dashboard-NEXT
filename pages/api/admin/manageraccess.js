import dbConnect from "../../../utils/dbConnect";

dbConnect();

const { giveManagerAccess } = require("../../../controller/adminController");

async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case "POST":
            await giveManagerAccess(req, res);
            break;

        default:
            res.status(400).json({ status: "Failed" });
            break;
    }
}

export default handler;
