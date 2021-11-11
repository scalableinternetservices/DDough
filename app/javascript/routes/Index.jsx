import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import SellerHome from "../components/SellerHome";

export default (
	<Router>
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/seller" exact component={SellerHome} />
		</Switch>
	</Router>
);
