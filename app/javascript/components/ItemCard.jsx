import React, { useState } from "react";
import Placeholder1 from "images/item_placeholder_1.JPG";
import Placeholder2 from "images/item_placeholder_2.JPG";

export default(props) => {
	const [displayBuy, setDisplayBuy] = useState(false);

	return (
		<div 
			className="item-card-container" 
			onMouseEnter={() => setDisplayBuy(true)}
			onMouseLeave={() => setDisplayBuy(false)}
		>

			{displayBuy && (
				<form className="purchase-form">
					<input type="number" defaultValue={1} className="purchase-quantity" />
					<input type="submit" value="Buy Now" className="buy-now-button" />
				</form>
			)}

			<img 
				src={props.img || (props.idx % 2 == 0 ? Placeholder1 : Placeholder2)}
				alt={`Image of ${props.name}`} 
				className="item-card-img"
			/>
			<p className="item-card-name">{props.name}</p>
			<p className="item-card-price">{props.price}</p>

			{props.description && (
				<p className="item-card-description">{props.description}</p>
			)}
			{props.quantity && (
				<p className="item-card-quantity">{props.quantity}</p>
			)}
		</div>
	);
}