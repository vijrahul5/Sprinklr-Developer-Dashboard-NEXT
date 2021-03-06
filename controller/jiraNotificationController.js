const Pusher = require("pusher");
// require("dotenv").config();

const pusher = new Pusher({
    appId: process.env.APP_ID,
    key: process.env.KEY,
    secret: process.env.SECRET,
    cluster: "ap2",
    useTLS: true,
});

function triggerChannel(obj, matchedWebhookIds) {
    matchedWebhookIds.forEach((element) => {
        pusher.trigger("my-channel", `${obj.cid}${element}`, {
            details: obj,
        });
    });
}

function handleNotification(req, res) {
    res.sendStatus(200);
    let obj = {
        type: req.body.issue_event_type_name,
        userId: req.body.user.accountId,
        key: req.body.issue.key,
        cid: req.query.cid,
    };
    triggerChannel(obj, req.body.matchedWebhookIds);
}

module.exports.handleNotification = handleNotification;
