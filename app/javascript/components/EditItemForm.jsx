import React, { useState } from "react";
import { useCookies } from "react-cookie";

import OverlayForm from "./OverlayForm";
import Placeholder from "images/item_placeholder_1.JPG";

export default (props) => {
    const [errorMessage, setErrorMessage] = useState(null);

    const [cookies, _setCookie, _removeCookie] = useCookies(["ddough-auth"]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setErrorMessage(null);

        const doughnut = {
            name: e.target[0].value.trim(),
            price: parseFloat(e.target[1].value),
            quantity: parseInt(e.target[2].value),
            description: e.target[3].value.trim(),
            image_url: e.target[4].value.trim()
        };

        const validationErr = validateDoughnut(doughnut);
        if (validationErr !== null) {
            return setErrorMessage(validationErr);
        }

        const options = {
            method: props.doughnut === null ? "POST" : "PUT",
            body: JSON.stringify(doughnut),
            headers: {
                "Authorization": cookies?.["ddough-auth"] !== undefined ? `Bearer ${cookies["ddough-auth"]}` : null,
                "Content-Type": "application/json"
            }
        };

        try {
            const response = await fetch(`/api/doughnuts/${props?.doughnut?.id || ""}`, options);

            switch (response.status) {
                case 200: {
                    props.hideEditForm();
                    if (props.doughnut == null) {
                        const pageMax = Math.ceil(props.doughnutTotal / props.itemsPerPage);
                        const pageNum = props.doughnutTotal % props.itemsPerPage == 0
                            ? pageMax + 1 : pageMax;
                        if (pageNum != props.currPage) {
                            props.pageHandler(pageNum);
                            break;
                        }
                    }
                    props.refreshDoughnuts(props.currPage);
                    break;
                }
                case 500: {
                    setErrorMessage("A server error occurred");
                    break;
                }
                default: {
                    const responseBody = await response.json();
                    setErrorMessage(responseBody?.message);
                    break;
                }
            }
        } catch (e) {
            setErrorMessage("An error occurred when updating the doughnut");
            console.log("Unable to update doughnut. Error:", e);
        }
    }

    const validateDoughnut = (doughnut) => {
        if (typeof doughnut?.name !== "string" || doughnut.name.length <= 0) {
            return "Doughnut name is missing";
        } else if (isNaN(doughnut?.price) || doughnut.price < 0.01) {
            return "Doughnut price is missing or invalid"
        } else if (isNaN(doughnut?.quantity) || doughnut.quantity < 0) {
            return "Doughnut quantity is missing or invalid"
        } else if (typeof doughnut?.description !== "string") {
            return "Doughnut description is invalid";
        } else if (typeof doughnut?.image_url !== "string") {
            return "Doughnut image url is invalid"
        } else if (doughnut.image_url.length <= 0) {
            doughnut.image_url = Placeholder;
        }
        //TODO: include additional verification to see if this is a valid path

        return null;
    }

    return (
        <>
            {props.visible &&
                <OverlayForm closeHandler={props.hideEditForm} title={props.doughnut === null
                    ? "Create new doughnut" : `Edit ${props.doughnut.name}`}>
                    {errorMessage &&
                        <div className="error-message">{errorMessage}</div>
                    }

                    <form onSubmit={submitHandler}>
                        <label htmlFor="name" className="input-label">Name</label>
                        <input type="text" name="name" className="input-field" 
                            defaultValue={props?.doughnut?.name || ""}/>
                        <label htmlFor="price" className="input-label">Price</label>
                        <input type="number" name="price" className="input-field" min="0.01" step="0.01"
                            defaultValue={props?.doughnut?.price?.toFixed(2) || ""} />
                        <label htmlFor="quantity" className="input-label">Quantity</label>
                        <input type="number" name="quantity" className="input-field" min="0" step="1"
                            defaultValue={props?.doughnut?.quantity || ""} />
                        <label htmlFor="description" className="input-label">Description</label>
                        <input type="text" name="description" className="input-field"
                            defaultValue={props?.doughnut?.description || ""} />
                        <label htmlFor="image_url" className="input-label">Image Path</label>
                        <input type="text" name="image_url" className="input-field"
                            defaultValue={props?.doughnut?.image_url || ""} />
                        <input type="submit" value="Save Changes" className="login-button cta-button" />
                    </form>
                </OverlayForm>
            }
        </>
    );
}
