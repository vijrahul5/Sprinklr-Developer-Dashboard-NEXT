import dbConnect from "../../../utils/dbConnect";
import withProtect from "../../../middleware/withProtect";

dbConnect();

const {
    submitGitlabAccessToken,
} = require("../../../controller/gitlabController");

async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case "POST":
            await submitGitlabAccessToken(req, res);
            break;

        default:
            res.status(400).json({ status: "Failed" });
            break;
    }
}

export default withProtect(handler);
