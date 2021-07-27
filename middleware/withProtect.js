const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(`${process.env.CLIENT_ID}`);

export default function withProtect(handler) {
    return async function (req, res) {
        try {
            let token = req.cookies["session-token"];
            if (token) {
                const ticket = await client.verifyIdToken({
                    idToken: token,
                    audience: `${process.env.CLIENT_ID}`,
                });
                const { email } = ticket.getPayload();
                req.email = email;
                handler(req, res);
            } else {
                throw new Error("Please Sign In First");
            }
        } catch (err) {
            return res.json({
                status: "Failed",
                error: err.message,
            });
        }
    };
}
