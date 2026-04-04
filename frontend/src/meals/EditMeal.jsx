import { useState, useEffect } from "react";
import { update, getOne } from "../datasource/api-mealplans";
import { useNavigate, useParams } from "react-router-dom";
import MealPlanModel from "../datasource/MealPlanModel";
import FormMealPlan from "./FormMealPlan";

function EditMeal() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [mealPlan, setMealPlan] = useState(new MealPlanModel());
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        getOne(id)
            .then((res) => {
                if (res.success) {
                    setMealPlan(new MealPlanModel(
                        res.data.id,
                        res.data.title,
                        res.data.description,
                        res.data.active,
                        res.data.image,
                        res.data.cost
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

        setMealPlan((formData) => ({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        update({
            ...mealPlan,
            cost: parseFloat(mealPlan.cost)
        }, id)
            .then((res) => {
                if (res.success) {
                    alert(res.message);
                    navigate("/meals");
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
                    <h1>Edit Meal Plan</h1>
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

export default EditMeal;