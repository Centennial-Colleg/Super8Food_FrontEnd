/**
 * Displays the list of meal plans. Admins see all plans with
 * management options; regular users see only active plans.
 *
 * Developers:
 *  - Mohd Javed Khan      - 301523744
 *  - Brian Nubila         - 301514904
 *  - Osamahiemen Idemudia - 301476106
 *  - Andrelle Thompson    - 301519338
 *  - Adib Md. Mahin       - 301424034
 */

import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { list, listActive } from '../datasource/api-mealplans';
import MealItem from './MealItem';
import { isAdmin } from "../components/auth/auth-helper";

function MealList() {
    let [mealPlanList, setMealPlanList] = useState([]);
    let [isLoading, setIsLoading] = useState(true);

    const loadMealPlans = () => {
        console.log(isAdmin());
        const fetcher = isAdmin() ? list : listActive;
        fetcher()
            .then((res) => {
                if (res.success) {
                    setMealPlanList(res.data);
                    setIsLoading(false);
                } else {
                    alert(res.message);
                }
            })
            .catch((err) => {
                alert(err.message);
                console.log(err);
            });
    };

    const handleRemove = () => {
        loadMealPlans();
    };

    useEffect(() => {
        loadMealPlans();
    }, []);

    return (
        <div className="container">
            <h1>Meal Plan List</h1>

            <div>
                {isAdmin() && (
                    <Link to="/meals/add" className="btn btn-primary">
                        Add a new Meal Plan
                    </Link>
                )}
            </div>

            <br /><br />

            <div className="table-responsive">
                {isLoading && <div>Loading...</div>}
                {!isLoading && mealPlanList.length === 0 && <div>No meal plans found.</div>}

                {!isLoading && mealPlanList.length > 0 &&
                    <table className="table table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                                <th className="text-center">Title</th>
                                <th className="text-center">Description</th>
                                <th className="text-center">Cost</th>
                                <th className="text-center">Active</th>
                                <th className="text-center">Image</th>
                                <th className="text-center" colSpan="2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mealPlanList.map(mealPlan =>
                                <MealItem
                                    key={mealPlan.id}
                                    mealPlan={mealPlan}
                                    onRemove={handleRemove}
                                />
                            )}
                        </tbody>
                    </table>
                }
            </div>
        </div>
    );
}

export default MealList;