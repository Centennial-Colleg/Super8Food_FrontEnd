import { Link, useNavigate  } from "react-router-dom";
import { remove } from "../datasource/api-mealplans";
import { isAuthenticated } from "../components/auth/auth-helper";
import { isAdmin } from "../components/auth/auth-helper";

function MealItem({ mealPlan, onRemove }) {
    const navigate = useNavigate();

    const handleRemove = (id) => {
        if (!isAuthenticated()) {
            alert("User is not authenticated.");
        } else {
            if (window.confirm('Are you sure you want to disable this item?')) {
                remove(id)
                    .then(res => {
                        if (res && res.success) {
                            onRemove();
                        } else {
                            alert(res.message);
                        }
                    })
                    .catch(err => {
                        alert(err.message);
                        console.log(err);
                    });
            }
        }
    };

    return (
        <tr>
            <td className="text-center">{mealPlan.title || ''}</td>
            <td className="text-center">{mealPlan.description || ''}</td>
            <td className="text-center">{mealPlan.cost || ''}</td>
            <td className="text-center">{mealPlan.active ? 'Yes' : 'No'}</td>
            <td className="text-center">
                {mealPlan.image && (
                    <img src={mealPlan.image} alt="meal" width="60" />
                )}
            </td>

            {isAdmin() && (
                <td className="text-center">
                    <Link className="btn btn-primary btn-sm" to={'/meals/edit/' + mealPlan.id}>
                        ✏️
                    </Link>
                </td>
            )}

            {isAdmin() && (
                <td className="text-center">
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleRemove(mealPlan.id)}>
                        🗑️
                    </button>
                </td>
            )}
            {!isAdmin() && (
                <td className="text-center">
                    <button
                        className="btn btn-success btn-sm"
                        onClick={() => navigate(`/orders/add/${mealPlan.id}`)}>
                        Order Now
                    </button>
                </td>
            )}
        </tr>
    );
}

export default MealItem;