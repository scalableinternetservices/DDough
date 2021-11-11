import React from "react";

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

	const MOCK_ORDERS = [
		{
			username: "Iris",
			items: {
				"Signature Ddough": 3,
				"Sweet Ruby": 5
			},
			cost: 5.1
		},
		{
			username: "Alan",
			items: {
				"Bbough": 10
			},
			cost: 15.0
		},
		{
			username: "Andrew",
			items: {
				"Classic Donut": 1
			}
		}
	];

	return(
		<div className="seller-home-container">
			<OrderList orders={MOCK_ORDERS} />
			<StoreDisplay itemList={MOCK_ITEMS} />
		</div>
	);
}
