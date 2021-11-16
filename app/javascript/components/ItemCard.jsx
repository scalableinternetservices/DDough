import React, { useState } from "react";
import Placeholder1 from "images/item_placeholder_1.JPG";
import Placeholder2 from "images/item_placeholder_2.JPG";
import EditIcon from "images/icons/edit_icon.svg";
import DeleteIcon from "images/icons/delete_icon.svg";

export default(props) => {
	const [onHover, setOnHover] = useState(false);

	return (
		<div 
			className="item-card-container" 
			onMouseEnter={() => setOnHover(true)}
			onMouseLeave={() => setOnHover(false)}
		>
			<div className="item-info-wrapper">
				<img 
					src={props.img || (props.idx % 2 == 0 ? Placeholder1 : Placeholder2)}
					alt={`Image of ${props.name}`} 
					className="item-card-img"
				/>
				<div className={(onHover && props.role != null) ? " blur" : ""}>
					<p className="item-card-name">{props.name}</p>
					<p className="item-card-price">${props.price.toPrecision(3)}</p>

					{props.description && (
						<p className="item-card-description">{props.description}</p>
					)}
				</div>

				{(props.quantity && props.role == "seller") && (
					<p className="item-card-quantity">{props.quantity}</p>
				)}

				{(props.role == "seller" && onHover) && (
					<div className="action-buttons-wrapper">
						<button className="edit-item-button">
							<img src={EditIcon} alt="Edit donut" />
						</button>
						<button className="delete-item-button">
							<img src={DeleteIcon} alt="Delete donut" />
						</button>
					</div>
				)}
			</div>

			{(onHover && props.role != null) && (
				<form className="purchase-form">
					<label htmlFor="quantity" className="quantity-label">Quantity</label>
					<input 
						type="number" 
						name="quantity" 
						defaultValue={1} 
						min={1} 
						max={props.quantity}
						className="purchase-quantity" />
					<input type="submit" value="Buy Now" className="buy-now-button" />
				</form>
			)}
		</div>
	);
}