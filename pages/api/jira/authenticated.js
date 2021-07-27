import dbConnect from "../../../utils/dbConnect";
import withProtect from "../../../middleware/withProtect";

dbConnect();

const { authenticated } = require("../../../controller/jiraController.js");

async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case "GET":
            await authenticated(req, res);
            break;

        default:
            res.status(400).json({ status: "Failed" });
            break;
    }
}

export default withProtect(handler);
