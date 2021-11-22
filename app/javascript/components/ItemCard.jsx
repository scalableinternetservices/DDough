import React, { useState } from "react";
import Placeholder1 from "images/item_placeholder_1.JPG";
import Placeholder2 from "images/item_placeholder_2.JPG";
import EditIcon from "images/icons/edit_icon.svg";
import DeleteIcon from "images/icons/delete_icon.svg";
import { useCookies } from "react-cookie";


export default (props) => {
	const [onHover, setOnHover] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);
	const [cookies, _setCookie, _removeCookie] = useCookies(["ddough-auth"]);
	const [quantity, setQuantity] = useState(props.quantity);


	const submitHandler = async (e) => {
		e.preventDefault();
		setErrorMessage(null);
		if(e.nativeEvent.submitter.name == "buy-now"){
			const body = {
				doughnut_id: props.id,
				quantity: parseInt(e.target[0].value)
			};

			const options = {
				method: "POST",
				body: JSON.stringify(body),
				headers: {
					"Authorization": cookies?.["ddough-auth"] !== undefined ? `Bearer ${cookies["ddough-auth"]}` : null,
					"Content-Type": "application/json"
				}
			};

			try {
				const response = await fetch(`/api/user/${props.userId}/orders`, options);

				switch (response.status) {
					case 201: {
						const responseBody = await response.json();
						setQuantity(responseBody.order_items[0].doughnut.quantity);
						props.setOrders((prevState) => {
							return [...prevState, responseBody];
						});
						props.refreshCart();
						break;
					}
					case 500: {
						setErrorMessage("A server error occurred");
						break;
					}
					default: {
						const responseBody = await response.json();
						setErrorMessage(responseBody?.message);
						break;
					}
				}
			} catch (e) {
				setErrorMessage("An error occurred when using buy now");
				console.log("Unable to Buy Now. Error:", e);
			}
		}else if(e.nativeEvent.submitter.name == "add-to-cart"){

		}else{
			setErrorMessage("An error occurred when submitting form");
		}
	}

	return (
		<div
			className="item-card-container"
			onMouseEnter={() => setOnHover(true)}
			onMouseLeave={() => setOnHover(false)}
		>
			<div className="item-info-wrapper">
				<img
					src={props.image_url !== null ? props.image_url : (props.idx % 2 == 0 ? Placeholder1 : Placeholder2)}
					alt={`Image of ${props.name}`} 
					className="item-card-img"
				/>
				<div className={(onHover && props.role === "buyer") ? " blur" : ""}>
					<p className="item-card-name">{props.name}</p>
					<p className="item-card-price">${props.price.toFixed(2)}</p>

					{props.description && (
						<p className="item-card-description">{props.description}</p>
					)}
				</div>

				<p className="item-card-quantity">{quantity}</p>

				{(props.role == "seller" && onHover) && (
					<div className="action-buttons-wrapper">
						<button className="edit-item-button" onClick={() => props.editHandler(props.idx)}>
							<img src={EditIcon} alt="Edit donut" />
						</button>
						{/* <button className="delete-item-button">
							<img src={DeleteIcon} alt="Delete donut" />
						</button> */}
					</div>
				)}
			</div>

			{(onHover && props.role === "buyer") && (
				<>
					{quantity > 0 ?
						<form onSubmit={submitHandler} className="purchase-form">
							<label htmlFor="quantity" className="quantity-label">Quantity</label>
							<input
								type="number"
								name="quantity"
								defaultValue={1}
								min={1}
								max={quantity}
								step={1}
								className="purchase-quantity"
							/>
							<input type="submit" name="buy-now" value="Buy Now" className="buy-now-button" />
							<input type="submit" name="add-to-cart" value="Add To Cart" className="add-to-cart-button" />
						</form>
						:
						<div className="purchase-form">
							<button className="sold-out-button">Sold Out</button>
						</div>
					}
				</>
			)}
		</div>
	);
}
