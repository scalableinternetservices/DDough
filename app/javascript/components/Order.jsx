import React from "react";

export default(props) => {

	return (
		<div className="order-container">
			<p>Order#{props.orderId}<span>from {props.username}</span></p>
			<p>{props.timestamp}</p>
			{props.orderedItems.map((item, idx) => (
				<div 
					className="order-item-container" 
					key={`order#${props.orderId}#${item.id}`}
				>
					<p>{item.name}({item.quantity})</p>
					<p>${item.price * item.quantity}</p>
				</div>
			))}
		</div>
	);
}