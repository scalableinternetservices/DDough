import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Routes from "../routes/Index";
import LoginForm from "./LoginForm";
import Navbar from "./Navbar";

export default (props) => {
    const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
    const [username, setUsername] = useState(null);
    const [role, setRole] = useState(null);
    const [userId, setUserId] = useState(null);

    const [cookies, setCookie, removeCookie] = useCookies(["ddough-auth"]);

    const showLogin = () => {
        setIsLoginFormVisible(true);
    }

    const hideLogin = () => {
        setIsLoginFormVisible(false);
    }

    const signOut = () => {
        setUsername(null);
        setRole(null);
        setUserId(null);
        removeCookie("ddough-auth");
    }

    useEffect(async () => {
        if (cookies?.["ddough-auth"]) {
            // Authentication cookie exists, get user information
            const options = {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${cookies["ddough-auth"]}`
                }
            };

            try {
                const response = await fetch("/api/user", options);
                const responseBody = await response.json();
    
                switch (response.status) {
                    case 200: {
                        // Stored token is still valid
                        setUsername(responseBody.user.username);
                        setRole(responseBody.user.role);
                        setUserId(responseBody.user.id);
                        hideLogin();
                        break;
                    }
                    default: {
                        // Stored token is no longer valid
                        removeCookie("ddough-auth");
                        break;
                    }
                }
            } catch (e) {
                console.log("Unable to Login. Error:", e);
            }
        }
    }, []);

    return (
        <div className="homepage-container">
            <Navbar
                role={role}
                username={username}
                userId={userId}
                showLogin={showLogin}
                signOut={signOut}
            />

            <Routes role={role} userId={userId} />

            <LoginForm
                visible={isLoginFormVisible}
                setRole={setRole}
                setUsername={setUsername}
                setCookie={setCookie}
                setUserId={setUserId}
                hideLogin={hideLogin}
            />
        </div>
    );
};
