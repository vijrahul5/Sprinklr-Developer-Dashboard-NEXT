import dbConnect from "../../../utils/dbConnect";
import withProtect from "../../../middleware/withProtect";

dbConnect();

const { getProfile } = require("../../../controller/employeeController");

async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case "GET":
            await getProfile(req, res);
            break;

        default:
            res.status(400).json({ status: "Failed" });
            break;
    }
}

export default withProtect(handler);
