import dbConnect from "../../../utils/dbConnect";

dbConnect();

const {
    handleNotification,
} = require("../../../controller/jiraNotificationController.js");

async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case "POST":
            await handleNotification(req, res);
            break;

        default:
            res.status(400).json({ status: "Failed" });
            break;
    }
}

export default handler;
