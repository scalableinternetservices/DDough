import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";

export default function Routes(props) { 
	return (
		<Router>
			<Switch>
				<Route path="/">
					<Home role={props.role} userId={props.userId} />
				</Route>
			</Switch>
		</Router>
	);
}
