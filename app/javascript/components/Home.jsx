import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import EditItemForm from "./EditItemForm";
import OrderList from "./OrderList";
import StoreDisplay from "./StoreDisplay";

export default(props) => {
    const [isEditDoughnutVisible, setIsEditDoughnutVisible] = useState(false);
    const [doughnutToEdit, setDoughnutToEdit] = useState(null);
    const [items, setItems] = useState([]);

    const [cookies, _setCookie, _removeCookie] = useCookies(["ddough-auth"]);

    useEffect(async () => {
        await getDoughnuts();
    }, []);

    const getDoughnuts = async () => {
        const options = {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: cookies?.["ddough-auth"] !== undefined ? `Bearer ${cookies["ddough-auth"]}` : null
            }
        };

        const response = await fetch("/api/doughnuts", options);

        switch (response.status) {
            case 200: {
                const doughnuts = await response.json();
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

    const showEditForm = (id) => {
        if (id === null) {
            setDoughnutToEdit(null);
        } else {
            setDoughnutToEdit(items[id]);
        }

        setIsEditDoughnutVisible(true);
    }

    const hideEditForm = () => {
        setIsEditDoughnutVisible(false);
    }

    return (
        <>
            <div className="store-container">
                {props.role == "seller" && (<OrderList userId={props.userId} />)}
                <StoreDisplay itemList={items} role={props.role} editHandler={showEditForm} />
            </div>

            <EditItemForm
                visible={isEditDoughnutVisible}
                hideEditForm={hideEditForm}
                refreshList={getDoughnuts}
                doughnut={doughnutToEdit} />
        </>
    );
}
