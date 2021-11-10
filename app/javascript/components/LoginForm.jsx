import React, { useState } from "react";

export default (props) => {
    const [registerMode, setRegisterMode] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const loginHandler = async (e) => {
        e.preventDefault();
        setErrorMessage(null);

        const body = {
            user: {
                username: e.target[0].value.trim(),
                password: e.target[1].value
            }
		};

        const options = {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json"
			}
		};

        try {
            const response = await fetch("/api/login", options);
            const responseBody = await response.json();
            console.log(responseBody);

            switch (response.status) {
                case 202: {
                    console.log("Success!");
                    props.setUsername(responseBody.user.username);
                    props.setRole(responseBody.user.role);
                    props.hideLogin();
                    break;
                }
                default: {
                    console.log("Failure!");
                    setErrorMessage(responseBody?.message);
                    break;
                }
            }
        } catch (e) {
			setErrorMessage("An error occurred during login");
			console.log("Unable to Login. Error:", e);
		}
    }

    const registerHandler = async (e) => {
        e.preventDefault();
        setErrorMessage(null);

        const body = {
            user: {
                username: e.target[0].value.trim(),
                password: e.target[1].value,
                role: e.target[2].value
            }
		};

        const options = {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json"
			}
		};

        try {
            const response = await fetch("/api/register", options);
            const responseBody = await response.json();
            console.log(responseBody);

            switch (response.status) {
                case 201: {
                    console.log("Success!");
                    props.setUsername(responseBody.user.username);
                    props.setRole(responseBody.user.role);
                    props.hideLogin();
                    break;
                }
                default: {
                    console.log("Failure!");
                    setErrorMessage(responseBody?.message);
                    break;
                }
            }
        } catch (e) {
			setErrorMessage("An error occurred during login");
			console.log("Unable to Login. Error:", e);
		}
    }
    
    const showLogin = () => {
        setRegisterMode(false);
    }

    const showRegister = () => {
        setRegisterMode(true);
    }

    return (
        <>
            {props.visible &&
                <div className="login-backdrop">
                    <div className="login-form">
                        <h1>Sign in to DDough</h1>

                        {errorMessage &&
                            <div className="login-error">{errorMessage}</div>
                        }

                        <div className="login-register-toggle">
                            <button className={!registerMode ? "selected" : ""} onClick={showLogin}>Login</button>
                            <button className={registerMode ? "selected" : ""} onClick={showRegister}>Register</button>
                        </div>

                        <form onSubmit={registerMode ? registerHandler : loginHandler}>
                            <label htmlFor="username" className="input-label">Username</label>
                            <input type="text" name="username" className="input-field" />
                            <label htmlFor="password" className="input-label">Password</label>
                            <input type="password" name="password" className="input-field" />

                            {registerMode &&
                                <>
                                    <label htmlFor="role" className="input-label">Account Role</label>
                                    <select name="role" className="input-field">
                                        <option value="buyer">Buyer</option>
                                        <option value="seller">Seller</option>
                                    </select>
                                </>
                            }

                            <input type="submit" value={registerMode ? "Register" : "Login"} className="login-button cta-button" />
                        </form>
                    </div>
                </div>
            }
        </>
    );
}
