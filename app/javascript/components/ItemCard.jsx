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
			<div className="item-info-wrapper">
				<img 
					src={props.img || (props.idx % 2 == 0 ? Placeholder1 : Placeholder2)}
					alt={`Image of ${props.name}`} 
					className="item-card-img"
				/>
				<div className={(displayBuy && props.role != null) ? " blur" : ""}>
					<p className="item-card-name">{props.name}</p>
					<p className="item-card-price">{props.price}</p>

					{props.description && (
						<p className="item-card-description">{props.description}</p>
					)}
				</div>

				{(props.quantity && props.role == "seller") && (
					<p className="item-card-quantity">{props.quantity}</p>
				)}
			</div>

			{(displayBuy && props.role != null) && (
				<form className="purchase-form">
					<label htmlFor="quantity" className="quantity-label">Quantity</label>
					<input type="number" name="quantity" defaultValue={1} min={1} className="purchase-quantity" />
					<input type="submit" value="Buy Now" className="buy-now-button" />
				</form>
			)}
		</div>
	);
}