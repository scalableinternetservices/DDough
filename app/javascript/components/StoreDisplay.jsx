import React from "react";

import ItemCard from "./ItemCard";

export default(props) => (
	<div className="store-display-container">
		<div className="store-display-wrapper">
			{props.itemList.map((item, idx) => (
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
	</div>
);