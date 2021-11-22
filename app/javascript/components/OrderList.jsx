import React from "react";
import Order from "./Order";

export default (props) => {
    return (
        <div className="order-list-container">
            <p className="order-list-title">{props.role === "buyer" ? "Your Orders" : "Customer Orders"}</p>
            {props.orders.slice(0).reverse().map((order) => 
                <Order
                    key={`order#${order.id}`}
                    role={props.role}
                    orderId={order.id}
                    username={order.user?.username}
                    orderedItems={order.order_items}
                    timestamp={order.created_at}
                />
            )}
        </div>
    );
}
