import { useState, useEffect } from 'react';
import { list, remove } from '../datasource/api-meals';
import { Link } from 'react-router-dom';

function MealList() {
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        loadMeals();
    }, []);

    const loadMeals = () => {
        list().then((data) => {
            if (data) setMeals(data);
        }).catch(err => console.log(err));
    };

    const deleteMeal = (id) => {
        if (window.confirm("Are you sure you want to delete this meal?")) {
            remove(id).then(() => loadMeals());
        }
    };

    return (
        <div className="container" style={{ padding: '20px' }}>
            <h1 style={{ textAlign: 'left' }}>Meals</h1>
            <div style={{ textAlign: 'right', marginBottom: '20px' }}>
                <Link to="/meals/add" className="btn btn-success">Add Meal</Link>
            </div>

            <table className="table" style={{ width: '100%', borderCollapse: 'collapse', color: 'white', backgroundColor: '#0066ff' }}>
                <thead>
                    <tr style={{ textAlign: 'left' }}>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {meals.map((meal, index) => (
                        <tr key={meal._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                            <td>{index + 1}</td>
                            <td>{meal.name}</td>
                            <td>{meal.category}</td>
                            <td>${meal.price}</td>
                            <td>
                                <Link to={`/meals/edit/${meal._id}`} className="btn btn-success" style={{ marginRight: '5px' }}>Edit</Link>
                                <button onClick={() => deleteMeal(meal._id)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MealList;