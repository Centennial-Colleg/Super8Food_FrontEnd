import { useState } from "react";
import { create } from "../datasource/api-orders";
import { useNavigate } from "react-router-dom";
import OrderModel from "../datasource/OrderModel";
import FormOrder from "./FormOrder";

function AddOrder() {
    const navigate = useNavigate();
    const [order, setOrder] = useState(new OrderModel());
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        setOrder((formData) => ({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        create(order)
            .then((res) => {
                if (res.success) {
                    alert(res.message + " - id: " + res.data.id);
                    navigate("/orders/list");
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
        <div className="container">
            <div className="row">
                <div className="offset-md-3 col-md-6">
                    <h1>Add Order</h1>
                    <p className="flash"><span>{errorMsg}</span></p>

                    <FormOrder
                        order={order}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                    />
                </div>
            </div>
        </div>
    );
}

export default AddOrder;