import React from "react";
import Logo from "images/ddough_logo.PNG";

export default(props) => (
	<div className={props.role === "seller" ? "navbar-container-seller" : "navbar-container-buyer"}>
		<img src={Logo} className="navbar-logo" alt="DDough logo, a D-shaped donut" />
		<div className="navbar-right-buttons">
			{props.username ?
				<>
					<p>Logged in as {props.username}</p>
					<button>Sign out</button>
				</>
			:
				<button onClick={props.showLogin}>Sign in</button>
			}
		</div>
	</div>
);