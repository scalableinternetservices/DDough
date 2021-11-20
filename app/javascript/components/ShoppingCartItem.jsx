import React, { useState } from "react";
import Placeholder1 from "images/item_placeholder_1.JPG";
import Placeholder2 from "images/item_placeholder_2.JPG";
import DeleteIcon from "images/icons/delete_icon.svg";

export default (props) => {
    const [onHover, setOnHover] = useState(false);

    const getTotalPrice = () => {
        return (props.item.quantity * props.item.doughnut.price).toFixed(2);
    }

    return (
        <div className="shopping-cart-item" onMouseEnter={() => setOnHover(true)} onMouseLeave={() => setOnHover(false)}>
            <div className="item-img">
                <p className="item-card-quantity">{props.item.quantity}</p>
                <img
                    src={props.item.doughnut.image_url !== null ? props.item.doughnut.image_url : (props.item.id % 2 == 0 ? Placeholder1 : Placeholder2)}
                    alt={`Image of ${props.item.doughnut.name}`}
                />
            </div>
            <div>
                <p className="item-title">{props.item.doughnut.name} x {props.item.quantity} (${props.item.doughnut.price.toFixed(2)} ea.)</p>
                <p className="item-price">${getTotalPrice()}</p>
                {props.item.quantity > props.item.doughnut.quantity &&
                    <p className="item-out-of-stock">⚠ Not enough inventory!</p>
                }
            </div>
            {onHover && 
                <button className="item-delete-button" onClick={() => props.deleteHandler(props.item.id)}>
                    <img src={DeleteIcon} alt="Delete donut" />
                </button>
            }
        </div>
    )
}
