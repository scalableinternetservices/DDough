import React from "react";

import ItemCard from "./ItemCard";

export default(props) => (
	<div className="store-display-scroll-wrapper">
		<div className="store-display-container">
			<div className="store-display-wrapper">
				{props.itemList.map((item, idx) => (
					<ItemCard
						key={item.name}
						idx={idx}
						name={item.name}
						price={item.price}
						image_url={item.image_url}
						description={item.description}
						quantity={item.quantity}
						role={props.role}
						editHandler={props.editHandler}
						userId={props.userId}
					/>
				))}
			</div>
			{props.role == "seller" && (
				<button className="add-item-button" onClick={() => props.editHandler(null)}>
					<span>+</span>
				</button>
			)}
		</div>
	</div>
);
