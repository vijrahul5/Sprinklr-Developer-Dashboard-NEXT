// libraries
import { useState, useCallback } from "react";
import NotificationManager from "react-notifications/lib/NotificationManager";
import axios from "axios";

export default function usePostLearningResource() {
    const [error, setError] = useState(false);

    const postResource = useCallback(
        async function (data) {
            setError(false);
            try {
                const res = await axios.post(`/api/employee/learning`, data, {
                    withCredentials: true,
                });
                if (res.data.status === "Success") {
                    NotificationManager.success(
                        "Success!",
                        "Learning Resource Shared Successfully !",
                        5000
                    );
                    return true;
                } else {
                    throw new Error(res.data.status);
                }
            } catch (err) {
                setError(err.message);
                NotificationManager.error("Error", err.message, 5000);
                return false;
            }
        },
        [setError]
    );

    return [error, postResource];
}
