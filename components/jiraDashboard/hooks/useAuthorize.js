//library
import axios from "axios";

//hooks
import { useState, useEffect } from "react";
import { useRouter } from 'next/router'

//components
import NotificationManager from "react-notifications/lib/NotificationManager";

const StartLenghtUrlForAuthCode = 37;
const EndLenghtUrlForAuthCode = 12;
const NotificationDisplayTime = 5000; // in milliseconds
const useAuthorize = () => {
    const history = useRouter();
    const [doneAuthentication, setDoneAuthentication] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        isAuthenticated();
    }, []);
    useEffect(() => {
        if (window.location.search.includes("code")) {
            setupJira().then(() => {
                if (doneAuthentication) {
                    history.replace("/dashboard");
                    setLoading(false);
                }
            });
        }
    }, [window.location, doneAuthentication]);

    async function isAuthenticated() {
        const res = await axios.get(
            `/api/jira/authenticated`,
            { withCredentials: true }
        );
        if (res.data.status === "Success") {
            const authenticated = res.data.doneJiraAuthentication;
            if (authenticated) {
                setDoneAuthentication(res.data.doneJiraAuthentication);
            }
        } else {
            setDoneAuthentication(false);
        }
        if (!window.location.search.includes("code")) setLoading(false);
    }

    function showAuthPage(URL) {
        window.location.href = URL;
    }
    function getAuthCode() {
        let len = window.location.href.length;
        let authCode = window.location.href.slice(
            StartLenghtUrlForAuthCode,
            len - EndLenghtUrlForAuthCode
        );
        return authCode;
    }

    async function setupJira() {
        setLoading(true);

        try {
            const authCode = getAuthCode();

            const data = {
                authCode: authCode,
            };
            let response = await axios.post(
                `/api/jira`,
                data,
                { withCredentials: true }
            );
            if (response.data.status === "Failed") {
                throw new Error();
            }
            setDoneAuthentication(true);
        } catch (err) {
            setLoading(false);
            if (!doneAuthentication) {
                NotificationManager.error(
                    "Server Error",
                    "Please try again",
                    NotificationDisplayTime
                );
            }
        }
    }
    return { showAuthPage, doneAuthentication, loading };
};

export default useAuthorize;
