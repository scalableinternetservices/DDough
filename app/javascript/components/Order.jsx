import React from "react";

export default (props) => {
  const getTotalPrice = () => {
    return props.orderedItems.reduce((count, item) => count + (item.quantity * item.doughnut.price), 0);
  }

  return (
    <div className="order-container">
      <p className="order-title">
        Order #{props.orderId}{" "}
        {props.role === "seller" &&
          <span>from {props.username}</span>
        }
      </p>
      <p className="order-timestamp">{props.created_by}</p>
      {props.orderedItems.map((item) => 
        <div
          className="order-item-container"
          key={`order#${props.orderId}#${item.doughnut.id}`}
        >
          <p>
            {item.doughnut.name}({item.quantity})
            <span>${(item.doughnut.price * item.quantity).toFixed(2)}</span>
          </p>
        </div>
      )}
      <div className="order-total-container">
        <p>Total:<span>${getTotalPrice().toFixed(2)}</span></p>
      </div>
    </div>
  );
}
