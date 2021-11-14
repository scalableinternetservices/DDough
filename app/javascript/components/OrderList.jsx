import React, { useEffect, useState } from "react";

import Order from "./Order";

export default(props) => {
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
			user: {
				username: "Andrew"
			},
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

	const [orders, setOrders] = useState(MOCK_ORDERS);

	useEffect(async () => {
		const response = await fetch("/api/orders");
		// console.log(await response.json());
	}, []);

	return (
		<div className="order-list-container">
			<p className="order-list-title">Customer Orders</p>
			{orders.map((order) => (
				<Order
					key={`order#${order.id}`}
					orderId={order.id}
					username={order.user?.username}
					orderedItems={order.items}
					timestamp={order.created_at}
				/>
			))}
		</div>
	);
}