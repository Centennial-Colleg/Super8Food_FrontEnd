/**
 * Form to edit an existing order for the authenticated user,
 * pre-filled with current order data fetched by ID.
 *
 * Developers:
 *  - Mohd Javed Khan      - 301523744
 *  - Brian Nubila         - 301514904
 *  - Osamahiemen Idemudia - 301476106
 *  - Andrelle Thompson    - 301519338
 *  - Adib Md. Mahin       - 301424034
 */

import { useState, useEffect } from "react";
import { update, getOne } from "../datasource/api-orders";
import { useNavigate, useParams } from "react-router-dom";
import OrderModel from "../datasource/OrderModel";
import FormOrder from "./FormOrder";

function EditOrder() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [order, setOrder] = useState(new OrderModel());
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        getOne(id)
            .then((res) => {
                if (res.success) {
                    setOrder(new OrderModel(
                        res.data.id,
                        res.data.title,
                        res.data.description,
                        res.data.active,
                        res.data.status,
                        res.data.deliveryDate,
                        res.data.completionDate,
                        res.data.mealPlan,
                        res.data.address
                    ));
                } else {
                    alert(res.message);
                }
            })
            .catch((err) => {
                alert(err.message);
                console.log(err);
            });
    }, [id]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        setOrder((formData) => ({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        update(order, id)
            .then((res) => {
                if (res.success) {
                    alert(res.message);
                    navigate("/orders");
                } else {
                    setErrorMsg(res.message);
                }
            })
            .catch((err) => {
                alert(err.message);
                console.log(err);
            });
    };

    return (
        <FormOrder
            order={order}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    );
}

export default EditOrder;