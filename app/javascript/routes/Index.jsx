import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import VendorHome from "../components/VendorHome";

export default (
	<Router>
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/vendor" exact component={VendorHome} />
		</Switch>
	</Router>
);
