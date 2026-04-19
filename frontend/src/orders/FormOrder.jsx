/**
 * Reusable form component shared by AddOrder and EditOrder
 * for order data entry, including meal plan selection and delivery date.
 *
 * Developers:
 *  - Mohd Javed Khan      - 301523744
 *  - Brian Nubila         - 301514904
 *  - Osamahiemen Idemudia - 301476106
 *  - Andrelle Thompson    - 301519338
 *  - Adib Md. Mahin       - 301424034
 */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { list as listMealPlans } from "../datasource/api-mealplans";

function FormOrder({ order, handleChange, handleSubmit, preselectedMealPlanId }) {

    const [mealPlans, setMealPlans] = useState([]);
    const [selectedCost, setSelectedCost] = useState("");

    const getToday = () => {
        return new Date().toISOString().split("T")[0];
    };

    useEffect(() => {
        listMealPlans()
            .then(res => {
                if (res.success) {
                    setMealPlans(res.data);

                    // If we have a preselected meal plan ID, set it
                    if (preselectedMealPlanId) {
                        const preselected = res.data.find(mp => mp.id === preselectedMealPlanId);
                        if (preselected) {
                            handleChange({
                                target: { name: "mealPlan", value: preselectedMealPlanId }
                            });

                            handleChange({
                                target: { name: "title", value: preselected.title }
                            });

                            handleChange({
                                target: { name: "description", value: preselected.description }
                            });

                            setSelectedCost(preselected.cost);
                        }
                    }
                }
            })
            .catch(err => console.log(err));

        handleChange({
            target: { name: "status", value: "Confirmed" }
        });

        handleChange({
            target: { name: "completionDate", value: getToday() }
        });

    }, [preselectedMealPlanId]);

    const handleMealPlanChange = (event) => {
        const selectedId = event.target.value;

        handleChange(event);

        const selected = mealPlans.find(mp => mp.id === selectedId);

        if (selected) {
            handleChange({
                target: { name: "title", value: selected.title }
            });

            handleChange({
                target: { name: "description", value: selected.description }
            });

            setSelectedCost(selected.cost);
        } else {
            // Clear fields if no meal plan selected
            handleChange({
                target: { name: "title", value: "" }
            });

            handleChange({
                target: { name: "description", value: "" }
            });

            setSelectedCost("");
        }
    };

    return (
        <div className="container" style={{ width: "100%" }}>
            <div className="row">
                <div className="col-md-12">

                    <form onSubmit={handleSubmit} className="form">

                        <div className="form-group">
                            <label htmlFor="mealPlanField">Meal Plan</label>
                            <select
                                className="form-control"
                                id="mealPlanField"
                                name="mealPlan"
                                value={order.mealPlan}
                                onChange={handleMealPlanChange}
                                required
                            >
                                <option value="">Select Meal Plan</option>
                                {mealPlans.map(mp => (
                                    <option key={mp.id} value={mp.id}>
                                        {mp.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <br />

                        {selectedCost && (
                            <>
                                <div className="form-group">
                                    <label>Price</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={selectedCost}
                                        disabled
                                    />
                                </div>
                                <br />
                            </>
                        )}

                        <div className="form-group">
                            <label htmlFor="titleField">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="titleField"
                                name="title"
                                value={order.title}
                                onChange={handleChange}
                                disabled
                            />
                        </div>

                        <br />

                        <div className="form-group">
                            <label htmlFor="descriptionField">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="descriptionField"
                                name="description"
                                value={order.description}
                                onChange={handleChange}
                                disabled
                            />
                        </div>

                        <br />

                        <input
                            type="hidden"
                            name="status"
                            value={order.status || "Confirmed"}
                        />

                        <div className="form-group">
                            <label htmlFor="deliveryDateField">Delivery Date</label>
                            <input
                                type="date"
                                className="form-control"
                                id="deliveryDateField"
                                name="deliveryDate"
                                value={order.deliveryDate}
                                onChange={handleChange}
                                min={getToday()}
                                required
                            />
                        </div>

                        <br />

                        <input
                            type="hidden"
                            name="completionDate"
                            value={order.completionDate || getToday()}
                        />

                        <br />

                        <input
                            type="hidden"
                            name="active"
                            value={order.active ?? true}
                        />

                        <br />

                        <button className="btn btn-primary" type="submit">
                            Save Order
                        </button>
                        <Link href="#" to="/orders" className="btn btn-warning">
                            <i className="fas fa-undo"></i>
                            Cancel
                        </Link>

                    </form>

                </div>
            </div>
        </div>
    );
}

export default FormOrder;