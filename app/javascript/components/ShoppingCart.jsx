import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import ShoppingCartItem from "./ShoppingCartItem";

export default (props) => {
    const [cartItems, setCartItems] = useState([]);
    const [cartId, setCartId] = useState(null);

    const [cookies, _setCookie, _removeCookie] = useCookies(["ddough-auth"]);

    useEffect(async () => {
        if (props.userId !== null) {
            await getCart();
        } else {
            setCartItems([]);
            setCartId(null);
        }
    }, [props.userId]);

    const getCart = async () => {
        setCartItems([]);
        setCartId(null);

        const options = {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: cookies?.["ddough-auth"] !== undefined ? `Bearer ${cookies["ddough-auth"]}` : null
            }
        }

        const response = await fetch(`/api/user/${props.userId}/cart`, options);

        switch (response.status) {
            case 200: {
                const cart = await response.json();

                if (cart.length === 1) {
                    setCartItems(cart[0].cart_items);
                    setCartId(cart[0].id);
                } else {
                    console.log("Cart length was not 1");
                }

                break;
            }
            default: {
                console.log("An error occurred!", await response.json());
                setCartItems([]);
                setCartId(null);
                break;
            }
        }
    }

    const deleteCartItem = async (id) => {
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
                // Delete successful, refresh cart items
                await getCart();
                break;
            }
            default: {
                console.log("An error occurred!", await response.json());
                break;
            }
        }
    }

    const getNumItemsInCart = () => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    }

    const getPriceOfCart = () => {
        return cartItems.reduce((count, item) => count + (item.quantity * item.doughnut.price), 0);
    }

    return (
        <div className="shopping-cart-container">
            <div>
                <p className="shopping-cart-title">Shopping Cart ({getNumItemsInCart()})</p>
                <p className="shopping-cart-description">
                    {cartId === null
                        ? "Loading your shopping cart..."
                        : cartItems.length === 0
                            ? "Your cart is empty."
                            : `Your cart contains ${getNumItemsInCart()} items and costs \$${getPriceOfCart().toFixed(2)}.`
                    }
                </p>

                {cartItems.map((item) => 
                    <ShoppingCartItem key={`item-${cartId}-${item.doughnut.name}`} item={item}
                        deleteHandler={deleteCartItem} />
                )}
            </div>
            <div>
                <div className="shopping-cart-total">
                    <p className="shopping-cart-title">Total:</p>
                    <p className="shopping-cart-title">${getPriceOfCart().toFixed(2)}</p>
                </div>
                <button class="shopping-cart-purchase-button">Checkout</button>
            </div>
        </div>
    )
}
