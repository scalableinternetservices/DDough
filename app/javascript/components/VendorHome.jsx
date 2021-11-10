import React from "react";

import Navbar from "./Navbar";
import StoreDisplay from "./StoreDisplay";

export default() => {
	const MOCK_ITEMS = [
		{
			name: "Classic Donut",
			price: 1.0,
			quantity: 20,
			description: "The classic round donut"
		},
		{
			name: "Signature Ddough",
			price: 1.2,
			quantity: 50
		},
		{
			name: "Sweet Ruby",
			price: 1.5
		},
		{
			name: "Ruby on Rails",
			price: 2.0
		},
		{
			name: "Bbough",
			price: 1.5
		}
	];

	return(
		<div className="homepage-container">
			<Navbar vendor="Default" />
			<div>
				<StoreDisplay itemList={MOCK_ITEMS} />
			</div>
		</div>
	);
}
