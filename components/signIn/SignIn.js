// libraries
import React, { useState } from "react";
import NotificationManager from "react-notifications/lib/NotificationManager";
import GoogleLogin from "react-google-login";
// components
import Loader from "../loaders/Loader";
import Auth from "../../Auth";
// utilities
import OutsideClick from "../../utils/OutsideClick";

function SignIn() {
    const [loading, setLoading] = useState(false);

    async function handleGoogleLoginSuccess({ tokenId }) {
        alert("success");
        window.console.log(tokenId);
        Auth.login(tokenId, setLoading);
    }
    async function handleGoogleLoginFailiure(res) {
        NotificationManager.error("Error!", "Login Failed!", 5000);
    }

    if (loading) {
        return (
            <>
                <Loader />
            </>
        );
    }
    return (
        <>
            <div className="signin">
                <div className="signin__modal">
                    <div className="signin__modal__content">
                        <h3>Sign In</h3>
                        <GoogleLogin
                            clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
                            buttonText="Continue With Google"
                            onSuccess={handleGoogleLoginSuccess}
                            onFailure={handleGoogleLoginFailiure}
                            cookiePolicy="single_host_origin"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignIn;
