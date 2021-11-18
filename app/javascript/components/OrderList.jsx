import React, { useEffect, useState } from "react";

import Order from "./Order";
import { useCookies } from "react-cookie";

export default(props) => {
	const [errorMessage, setErrorMessage] = useState(null);
	const [cookies, _setCookie, _removeCookie] = useCookies(["ddough-auth"]);
	const [userId] = useState();
	const [orders, setOrders] = useState([]);

	useEffect(async () => {
        await getOrders();
    }, []);
	
    const getOrders = async () => {
        const options = {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: cookies?.["ddough-auth"] !== undefined ? `Bearer ${cookies["ddough-auth"]}` : null
            }
        };
	
        const response = await fetch(`/api/user/${props.userId}/orders`, options);

        switch (response.status) {
            case 200: {
                const orders = await response.json();
				setOrders(orders);
                break;
            }
            case 204: {
                // There are no orders
                setOrders([]);
                break;
            }
            default: {
                console.log("An error occurred!", await response.json());
                setOrders([]);
                break;
            }
        }
    }

	return (
		<div className="order-list-container">
			<p className="order-list-title">Customer Orders</p>
			{orders.map((order) => (
				<Order
					key={`order#${order.id}`}
					orderId={order.id}
					username={order.user?.username}
					orderedItems={order.order_items}
					timestamp={order.created_at}
				/>
			))}
		</div>
	);
}