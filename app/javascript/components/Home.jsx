import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import EditItemForm from "./EditItemForm";
import OrderList from "./OrderList";
import ShoppingCart from "./ShoppingCart";
import StoreDisplay from "./StoreDisplay";

export default (props) => {
    const [isEditDoughnutVisible, setIsEditDoughnutVisible] = useState(false);
    const [doughnutToEdit, setDoughnutToEdit] = useState(null);
    const [items, setItems] = useState([]);
    const [orders, setOrders] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [doughnutTotal, setDoughnutTotal] = useState(0);
    const [currPage, setCurrPage] = useState(1);

    const [cookies, _setCookie, _removeCookie] = useCookies(["ddough-auth"]);

    const ITEMS_PER_PAGE = 8;

    useEffect(() => {
        getDoughnuts(currPage);
    }, [currPage]);

    useEffect(() => {
        if (props.userId) {
            getOrders();

            if (props.role === "buyer") {
                getCart();
            }
        }
    }, [props.userId]);

    const getDoughnuts = async (page=null) => {
        setItems([]);

        const options = {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: cookies?.["ddough-auth"] !== undefined ? `Bearer ${cookies["ddough-auth"]}` : null
            }
        };

        const uri = "/api/doughnuts" + (page != null ? `/?start=${(page - 1) * ITEMS_PER_PAGE}&limit=${ITEMS_PER_PAGE}` : "");
        const response = await fetch(uri, options);

        switch (response.status) {
            case 200: {
                const doughnut_info = await response.json();
                
                let doughnuts = null;
                if (page != null) {
                	doughnuts = doughnut_info.doughnuts;
                	setDoughnutTotal(doughnut_info.total);
                }
                else {
                	doughnuts = doughnut_info;
                }

                setItems(doughnuts.sort((a, b) => a.id - b.id));
                break;
            }
            case 204: {
                // There are no doughnuts
                setItems([]);
                break;
            }
            default: {
                console.log("An error occurred!", await response.json());
                setItems([]);
                break;
            }
        }
    }

    const getOrders = async () => {
        setOrders([]);

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

    const getCart = async () => {

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

                // The response currently comes back as an array, even though each user can only have one cart.
                // We might want to fix this in the future.
                setCartItems(cart[0].cart_items);
                break;
            }
            default: {
                console.log("An error occurred!", await response.json());
                setCartItems([]);
                break;
            }
        }
    }

    const showEditForm = (idx) => {
        if (idx === null) {
            setDoughnutToEdit(null);
        } else {
            setDoughnutToEdit(items[idx]);
        }

        setIsEditDoughnutVisible(true);
    }

    const hideEditForm = () => {
        setIsEditDoughnutVisible(false);
    }

    return (
        <>
            <div className="store-container">
                {props.userId != null &&
                    <OrderList
                        userId={props.userId}
                        role={props.role}
                        orders={orders}
                    />
                }

                <StoreDisplay
                    itemList={items}
                    role={props.role}
                    editHandler={showEditForm}
                    userId={props.userId}
                    setOrders={setOrders}
                    refreshCart={getCart}
                    pageMax={Math.ceil(doughnutTotal / ITEMS_PER_PAGE)}
                	currPage={currPage}
                	pageNavHandler={setCurrPage}
                />

                {props.role === "buyer" &&
                    <ShoppingCart
                        userId={props.userId}
                        cartItems={cartItems}
                        setCartItems={setCartItems}
                        refreshDoughnuts={getDoughnuts}
                        refreshOrders={getOrders}
                    />
                }
            </div>

            <EditItemForm
                visible={isEditDoughnutVisible}
                hideEditForm={hideEditForm}
                refreshDoughnuts={getDoughnuts}
                doughnut={doughnutToEdit}
                doughnutTotal={doughnutTotal}
                itemsPerPage={ITEMS_PER_PAGE}
                currPage={currPage}
                pageHandler={setCurrPage}
            />
        </>
    );
}
