import dbConnect from "../../../utils/dbConnect";
import withProtect from "../../../middleware/withProtect";

dbConnect();

const {
    getTeam,
    postTeam,
    deleteTeam,
} = require("../../../controller/employeeController");

async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case "GET":
            await getTeam(req, res);
            break;
        case "POST":
            await postTeam(req, res);
            break;
        case "DELETE":
            await deleteTeam(req, res);
            break;
        default:
            res.status(400).json({ status: "Failed" });
            break;
    }

}

export default withProtect(handler);
