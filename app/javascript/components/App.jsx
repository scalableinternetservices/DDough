import React, { useState } from "react";
import Routes from "../routes/Index";
import LoginForm from "./LoginForm";
import Navbar from "./Navbar";

export default (props) => {
    const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
    const [username, setUsername] = useState(null);
    const [role, setRole] = useState(null);

    const showLogin = () => {
        setIsLoginFormVisible(true);
    }

    const hideLogin = () => {
        setIsLoginFormVisible(false);
    }

    return (
        <div className="homepage-container">
            <Navbar role={role} username={username} showLogin={showLogin} />

            {Routes}

            <LoginForm visible={isLoginFormVisible} setRole={setRole} setUsername={setUsername} hideLogin={hideLogin} />
        </div>
    );
};
