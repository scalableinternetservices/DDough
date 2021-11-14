import React from "react";

export default(props) => (
	<div 
		className="backdrop" 
		onClick={props.clickHandler}
	>
		{props.children}
	</div>
);