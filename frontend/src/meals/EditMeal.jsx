import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { read, update } from "../datasource/api-meals"; // You'll need a 'read' function in api-meals
//import MealModel from "../datasource/mealModel";
import FormMeal from "./FormMeal";

function EditMeal() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [meal, setMeal] = useState({});
    const [errorMsg, setErrorMsg] = useState('');

    // Load existing meal data
    useEffect(() => {
        read(id).then((data) => {
            if (data) {
                setMeal(data);
            }
        }).catch(err => console.error(err));
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setMeal((formData) => ({ ...formData, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        update(id, meal)
            .then((res) => {
                if (res.success) {
                    alert("Meal Updated Successfully!");
                    navigate("/meals/list");
                } else {
                    setErrorMsg(res.message);
                }
            })
            .catch((err) => {
                setErrorMsg(err.message);
            });
    };

    return (
        <div className="container" style={{ paddingTop: 80 }}>
            <h1>Edit Meal Item</h1>
            {errorMsg && <p style={{color: 'red'}}>{errorMsg}</p>}
            <FormMeal 
                meal={meal}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </div>
    );
}

export default EditMeal;