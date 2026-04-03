import { useState, useEffect } from 'react';
import { list, remove } from '../datasource/api-meals';
import MealItem from './MealItem';
import { Link } from 'react-router-dom';

function MealList() {
    const [meals, setMeals] = useState([]);

    // Fetch meals from the database when the component loads
    useEffect(() => {
        list().then((data) => {
            if (data) setMeals(data);
        });
    }, []);

    const deleteMeal = (id) => {
        if (window.confirm("Are you sure you want to delete this meal?")) {
            remove(id).then((res) => {
                if (res.success) {
                    setMeals(meals.filter(meal => meal._id !== id));
                }
            });
        }
    };

    return (
        <div className="container">
            <h1>Super 8 Food Menu</h1>
            <Link to="/meals/add" className="btn btn-primary mb-3">Add New Meal</Link>
            <div className="row">
                {meals.map(meal => (
                    <MealItem key={meal._id} meal={meal} onDelete={deleteMeal} />
                ))}
            </div>
        </div>
    );
}

export default MealList;