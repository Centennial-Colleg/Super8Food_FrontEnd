/**
 * Public-facing landing page displaying active meal plans
 * available for ordering, with a hero section and meal grid.
 *
 * Developers:
 *  - Mohd Javed Khan      - 301523744
 *  - Brian Nubila         - 301514904
 *  - Osamahiemen Idemudia - 301476106
 *  - Andrelle Thompson    - 301519338
 *  - Adib Md. Mahin       - 301424034
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { listActive } from '../datasource/api-mealplans';
import '../Home.css';

function Home() {
  const navigate = useNavigate();
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    listActive()
      .then((res) => {
        if (res.success) {
          setMeals(res.data);
        } else {
          alert(res.message);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        alert(err.message);
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="meal-page">

      <div className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Delicious Meals, Delivered Weekly</h1>
          <p className="hero-subtitle">
            Choose your perfect meal plan and enjoy fresh, hassle-free dining every day.
          </p>
        </div>
      </div>

      <div className="container content-section">
        <h2 className="menu-title">Our Weekly Menu</h2>

        {isLoading && <p className="text-center">Loading...</p>}
        {!isLoading && meals.length === 0 && (
          <p className="text-center">No meals available.</p>
        )}

        <div className="meal-grid">
          {meals.map((meal) => (
            <div key={meal.id} className="meal-card">

              {meal.image && (
                <img
                  src={meal.image}
                  alt={meal.title}
                  className="meal-image"
                />
              )}

              <h3>{meal.title}</h3>
              <p>{meal.description}</p>
              <p><strong>${meal.cost}</strong></p>

              <button
                onClick={() => { navigate(`/orders/add/${meal.id}`) }}
                className="meal-btn"
              >
                Add to Order
              </button>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;