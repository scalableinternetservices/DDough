import React, { useState } from "react";
import { useCookies } from "react-cookie";
import ShoppingCartItem from "./ShoppingCartItem";

export default (props) => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const [cookies, _setCookie, _removeCookie] = useCookies(["ddough-auth"]);

    const deleteCartItem = async (id) => {
        setErrorMessage(null);
        setSuccessMessage(null);

        const options = {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                Authorization: cookies?.["ddough-auth"] !== undefined ? `Bearer ${cookies["ddough-auth"]}` : null
            }
        }

        const response = await fetch(`/api/user/${props.userId}/cart/${id}`, options);

        switch (response.status) {
            case 204: {
                // Delete successful, remove this item from the displayed cart
                props.setCartItems((prevState) => prevState.filter((item) => item.id !== id));
                break;
            }
            default: {
                console.log("An error occurred!", await response.json());
                setErrorMessage("An error occurred while deleting your cart item.");
                break;
            }
        }
    }

    const checkoutCart = async () => {
        setErrorMessage(null);
        setSuccessMessage(null);

        const options = {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: cookies?.["ddough-auth"] !== undefined ? `Bearer ${cookies["ddough-auth"]}` : null
            }
        }

        const response = await fetch(`/api/user/${props.userId}/cart/checkout`, options);

        switch (response.status) {
            case 200: {
                setSuccessMessage("Order successfully placed!");
                props.setCartItems([]);
                props.refreshDoughnuts();
                props.refreshOrders();

                setTimeout(() => {
                    setSuccessMessage(null);
                }, 15000);

                break;
            }
            default: {
                console.log("An error occurred!", await response.json());
                setErrorMessage("An error occurred while checking out.");
                break;
            }
        }
    }

    const getNumItemsInCart = () => {
        return props.cartItems.reduce((count, item) => count + item.quantity, 0);
    }

    const getPriceOfCart = () => {
        return props.cartItems.reduce((count, item) => count + (item.quantity * item.doughnut.price), 0);
    }

    const isCartValidForCheckout = () => {
        // Cart must not be empty
        if (props.cartItems.length === 0) {
            return false;
        }

        // All items in cart must be in stock
        const invalidItems = props.cartItems.reduce((count, item) => {
            return count + (item.quantity > item.doughnut.quantity ? 1 : 0)
        }, 0);

        if (invalidItems > 0) {
            return false;
        }

        return true;
    }

    return (
        <div className="shopping-cart-container">
            <div>
                <p className="shopping-cart-title">Shopping Cart ({getNumItemsInCart()})</p>
                <p className="shopping-cart-description">
                    {props.cartItems.length === 0
                        ? "Your cart is empty."
                        : `Your cart contains ${getNumItemsInCart()} items and costs \$${getPriceOfCart().toFixed(2)}.`
                    }
                </p>

                {errorMessage &&
                    <div className="error-message">{errorMessage}</div>
                }

                {successMessage &&
                    <div className="success-message">{successMessage}</div>
                }

                {props.cartItems.map((item) => 
                    <ShoppingCartItem key={`item-${item.doughnut.name}`} item={item}
                        deleteHandler={deleteCartItem} />
                )}
            </div>
            <div>
                <div className="shopping-cart-total">
                    <p className="shopping-cart-title">Total:</p>
                    <p className="shopping-cart-title">${getPriceOfCart().toFixed(2)}</p>
                </div>
                {isCartValidForCheckout() ?
                    <button className="shopping-cart-purchase-button" onClick={checkoutCart}>Checkout</button>
                :
                    <button className="shopping-cart-purchase-button-disabled">Checkout</button>
                }
            </div>
        </div>
    )
}
