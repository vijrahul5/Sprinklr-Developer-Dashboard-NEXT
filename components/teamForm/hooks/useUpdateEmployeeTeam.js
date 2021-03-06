import { useState, useCallback } from "react";
import axios from "axios";
import NotificationManager from "react-notifications/lib/NotificationManager";

export default function useUpdateEmployeeTeam() {
    // Adds or Deletes a team member by sending a post/delete request to the backend server
    const [addError, setAddError] = useState(false);
    const [deleteError, setDeleteError] = useState(false);

    const addTeamMember = useCallback(
        async function (data) {
            setAddError(false);
            try {
                const res = await axios.post(`/api/employee/team`, data, {
                    withCredentials: true,
                });
                if (res.data.status === "Success") {
                    NotificationManager.success(
                        "Success!",
                        "Team Member Added",
                        5000
                    );
                    return true;
                } else {
                    throw new Error(res.data.status);
                }
            } catch (err) {
                setAddError(err.message);
                NotificationManager.error("Error!", err.message, 5000);
                return false;
            }
        },
        [setAddError]
    );

    const deleteTeamMember = useCallback(
        async function (data) {
            setDeleteError(false);
            try {
                const res = await axios.delete(`/api/employee/team`, {
                    data: data,
                    withCredentials: true,
                });
                if (res.data.status === "Success") {
                    NotificationManager.success(
                        "Success!",
                        "Team Member Deleted",
                        5000
                    );
                    return true;
                } else {
                    throw new Error(res.data.status);
                }
            } catch (err) {
                setDeleteError(err.message);
                NotificationManager.error("Error!", err.message, 5000);
                return false;
            }
        },
        [setDeleteError]
    );

    return [addError, deleteError, addTeamMember, deleteTeamMember];
}
