import React from "react";
import Logo from "images/ddough_logo.PNG";

export default(props) => (
	<div className={props.vendor ? "navbar-container-vendor" : "navbar-container-buyer"}>
		<img src={Logo} className="navbar-logo" alt="DDough logo, a D-shaped donut" />
	</div>
);