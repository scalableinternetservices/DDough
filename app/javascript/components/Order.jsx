import React from "react";

export default (props) => {
  let cost = 0.0;

  return (
    <div className="order-container">
      <p className="order-title">
        Order#{props.orderId}{" "}
        <span>from {props.username}</span>
      </p>
      <p className="order-timestamp">{props.created_by}</p>
      {props.orderedItems.map((item, idx) => {
        cost += item.doughnut.price * item.quantity
        return (
          <div
            className="order-item-container"
            key={`order#${props.orderId}#${item.doughnut.id}`}
          >
            <p>
              {item.doughnut.name}({item.quantity})
              <span>${(item.doughnut.price * item.quantity).toFixed(2)}</span>
            </p>
          </div>
        )
      })}
      <div className="order-total-container">
        <p>Total:<span>${cost.toFixed(2)}</span></p>
      </div>
    </div>
  );
}
