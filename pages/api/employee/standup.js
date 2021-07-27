import dbConnect from "../../../utils/dbConnect";
import withProtect from "../../../middleware/withProtect";

dbConnect();

const {
    getStandUp,
    postStandUp,
    updateStandUp,
    deleteStandUp,
} = require("../../../controller/employeeController");

async function handler(req, res) {
    const { method } = req;
    console.log("win");

    switch (method) {
        case "GET":
            await getStandUp(req, res);
            break;
        case "POST":
            await postStandUp(req, res);
            break;
        case "PATCH":
            await updateStandUp(req, res);
            break;
        case "DELETE":
            await deleteStandUp(req, res);
            break;
        default:
            res.status(400).json({ status: "Failed" });
            break;
    }
}

export default withProtect(handler);
