import React, { useState } from "react";

import OverlayForm from "./OverlayForm";

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

            switch (response.status) {
                case 202: {
                    const responseBody = await response.json();
                    const cookieOptions = {
                        path: "/",
                        expires: new Date(responseBody.exp)
                    };
                    
                    props.setCookie("ddough-auth", responseBody.jwt, cookieOptions);
                    props.setUsername(responseBody.user.username);
                    props.setRole(responseBody.user.role);
                    props.hideLogin();
                    break;
                }
                case 500: {
                    setErrorMessage("A server error occurred");
                    break;
                }
                default: {
                    const responseBody = await response.json();
                    setErrorMessage(responseBody?.message);
                    break;
                }
            }
        } catch (e) {
			setErrorMessage("An error occurred during login");
			console.log("Unable to login. Error:", e);
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

            switch (response.status) {
                case 201: {
                    const responseBody = await response.json();
                    const cookieOptions = {
                        path: "/",
                        expires: new Date(responseBody.exp)
                    };
                    
                    props.setCookie("ddough-auth", responseBody.jwt, cookieOptions);
                    props.setUsername(responseBody.user.username);
                    props.setRole(responseBody.user.role);
                    props.hideLogin();
                    break;
                }
                case 409: {
                    setErrorMessage("This username is taken");
                }
                case 422: {
                    const responseBody = await response.json();
                    setErrorMessage(responseBody.errors.join("\r\n"));
                    break;
                }
                case 500: {
                    setErrorMessage("A server error occurred");
                    break;
                }
                default: {
                    const responseBody = await response.json();
                    setErrorMessage(responseBody?.message);
                    break;
                }
            }
        } catch (e) {
			setErrorMessage("An error occurred during registration");
			console.log("Unable to register. Error:", e);
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
                <OverlayForm closeHandler={props.hideLogin} title="Sign in to DDough">
                    {errorMessage &&
                        <div className="login-error">{errorMessage}</div>
                    }

                    <div className="login-register-toggle">
                        <button className={!registerMode ? "selected" : ""} onClick={showLogin}>Login</button>
                        <button className={registerMode ? "selected" : ""} onClick={showRegister}>Register</button>
                    </div>

                    <form onSubmit={registerMode ? registerHandler : loginHandler}>
                        <label htmlFor="username" className="input-label">Username</label>
                        <input type="text" name="username" autoComplete="username" className="input-field" />
                        <label htmlFor="password" className="input-label">Password</label>
                        <input type="password" name="password" className="input-field"
                            autoComplete={registerMode ? "new-password" : "currentPassword"} />

                        {registerMode &&
                            <>
                                <label htmlFor="role" className="input-label">Account Role</label>
                                <select name="role" className="input-field role-dropdown">
                                    <option value="buyer">Buyer</option>
                                    <option value="seller">Seller</option>
                                </select>
                            </>
                        }

                        <input type="submit" value={registerMode ? "Register" : "Login"} className="login-button cta-button" />
                    </form>
                </OverlayForm>
            }
        </>
    );
}
