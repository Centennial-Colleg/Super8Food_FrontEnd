import { useState } from "react";
import { create } from "../datasource/api-mealplans";
import { useNavigate } from "react-router-dom";
import MealPlanModel from "../datasource/MealPlanModel";
import FormMealPlan from "./FormMealPlan";

function AddMeal() {
    const navigate = useNavigate();
    const [mealPlan, setMealPlan] = useState(new MealPlanModel());
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        setMealPlan((formData) => ({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        create({
            ...mealPlan,
            cost: parseFloat(mealPlan.cost)
        })
            .then((res) => {
                if (res.success) {
                    alert(res.message + " - id: " + res.data.id);
                    navigate("/mealplans/list");
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
        <div className="container" style={{ paddingTop: 80 }}>
            <div className="row">
                <div className="offset-md-3 col-md-6">
                    <h1>Add Meal Plan</h1>
                    <p className="flash"><span>{errorMsg}</span></p>

                    <FormMealPlan
                        mealPlan={mealPlan}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                    />
                </div>
            </div>
        </div>
    );
}

export default AddMeal;