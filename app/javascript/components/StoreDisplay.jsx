import React, { useEffect, useState } from "react";

import ItemCard from "./ItemCard";

export default(props) => {
	const [itemList, setItemList] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	useEffect(async () => {
		const response = await fetch("/api/doughnuts");
		switch(response.status) {
			case 200:
				setItemList(await response.json());
				break;
			default:
				setErrorMessage("Sorry, we ran into an error while getting donuts for you :( please check back later!");
		}
	}, [])

	return (
		<div className="store-display-scroll-wrapper">
			<div className="store-display-container">
				<div className="store-display-wrapper">
					{itemList.map((item, idx) => (
						<ItemCard 
							key={item.name}
							idx={idx} 
							name={item.name} 
							price={item.price} 
							img={item.img} 
							description={item.description}
							quantity={item.quantity}
							role={props.role}
						/>
					))}
				</div>
				{props.role == "seller" && (
					<button className="add-item-button">
						<span>+</span>
					</button>
				)}
			</div>
		</div>
	);
}