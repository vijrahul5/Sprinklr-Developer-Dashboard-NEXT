//libraries
import React from "react";
import Image from "next/image";
import { useState } from "react";
// utilities
import Auth from "../../Auth";
import OutsideClick from "../../utils/OutsideClick";
// components
import Profile from "../profile/index";

function DashboardNavbar({ user }) {
    const [profileView, setProfileView] = useState(false);
    function handleClose() {
        setProfileView(false);
    }
    return (
        <>
            <nav className="dashboardNavbar">
                <h1>Sprinklr Developer Dashboard</h1>
            </nav>
            <OutsideClick handleClose={handleClose}>
                <div
                    className="profile__imgHolder"
                    onClick={() =>
                        setProfileView((profileView) => !profileView)
                    }
                >
                    <Image src={user.picture} alt="" layout="fill" />
                    {profileView ? <Profile user={user} /> : null}
                </div>
            </OutsideClick>
        </>
    );
}

export default DashboardNavbar;
