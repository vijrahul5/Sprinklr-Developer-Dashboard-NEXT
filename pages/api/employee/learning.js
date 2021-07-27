import dbConnect from "../../../utils/dbConnect";
import withProtect from "../../../middleware/withProtect";

dbConnect();

const {
    getLearningResources,
    updateLearningResources,
    postLearningResources,
    deleteLearningResources,
} = require("../../../controller/employeeController");

async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case "GET":
            await getLearningResources(req, res);
            break;
        case "POST":
            await postLearningResources(req, res);
            break;
        case "PATCH":
            await updateLearningResources(req, res);
            break;
        case "DELETE":
            await deleteLearningResources(req, res);
            break;
        default:
            res.status(400).json({ status: "Failed" });
            break;
    }
}

export default withProtect(handler);
