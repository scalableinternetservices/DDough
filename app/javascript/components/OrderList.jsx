import React from "react";

import Order from "./Order";

export default(props) => (
	<div className="order-list-container">
		<p className="order-list-title">Customer Orders</p>
		{props.orders.map((order) => (
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