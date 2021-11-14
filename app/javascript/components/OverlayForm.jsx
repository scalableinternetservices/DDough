import React from "react";

import Backdrop from "./Backdrop";

export default(props) => (
	<div className="fullscreen-center-container">
		<Backdrop clickHandler={props.closeHandler} />
		<div className="overlay-form-container">
            <button className="close-button" onClick={props.closeHandler}>✖</button>
            {props.title && (<h1>{props.title}</h1>)}
            {props.children}
        </div>
	</div>
);