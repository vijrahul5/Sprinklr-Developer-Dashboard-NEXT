import axios from "axios";
import cookieCutter from "cookie-cutter";

class Auth {
    // Class that provides functions for authentication : 'login' and 'logout'
    async login(tokenId, setLoading) {
        setLoading(true);
        // Sends a post request to the backend server with tokenid from google and receives a session-token in the cookies
        try {
            const res = await axios.post(
                `/api/auth/signin`,
                {
                    token: tokenId,
                },
                { withCredentials: true }
            );
            if (res.data.status === "Success") {
                cookieCutter.set("session-token", res.data.token);
                setLoading(false);
                window.location.replace("/dashboard");
            } else {
                alert(res.data.status);
            }
        } catch (err) {
            alert(err.message);
        }
    }
    async logout() {
        // Sends a get request to the backend server which clears the session token cookie
        try {
            const res = await axios.get(
                `/api/auth/signout`,
                { withCredentials: true }
            );
            if (res.data.status === "Success") {
                cookieCutter.set("session-token", "");
                window.location.replace("/");
            } else {
                throw new Error(res.data.status);
            }
        } catch (err) {
            alert(err.message);
        }
    }
}

export default new Auth();
