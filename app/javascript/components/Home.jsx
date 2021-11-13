import React from "react";

import OrderList from "./OrderList";
import StoreDisplay from "./StoreDisplay";

export default(props) => {
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
			id: 1,
			user: {
				username: "Iris"
			},
			items: [
				{
					id: 2,
					name: "Signature Ddough",
					quantity: 3,
					price: 1.2
				},
				{
					id: 3,
					name: "Bbough",
					quantity: 3,
					price: 1.5
				}
			]
		},
		{
			id: 2,
			user: {
				username: "Alan"
			},
			items: [
				{
					id: 3,
					name: "Bbough",
					quantity: 5,
					price: 1.5
				}
			],
		},
		{
			id: 3,
			username: "Andrew",
			items: [
				{
					id: 1,
					name: "Classic Donut",
					quantity: 1,
					price: 1.0
				}
			],
		}
	];

	return (
		<div className="store-container">
			<OrderList orders={MOCK_ORDERS} />
			<StoreDisplay itemList={MOCK_ITEMS} role={props.role} />
		</div>
	);
}
