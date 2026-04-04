import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { list } from '../datasource/api-mealplans';

function Home() {
  const navigate = useNavigate();
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    list()
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
      <h1>Our Weekly Menu</h1>

      {isLoading && <p>Loading...</p>}
      {!isLoading && meals.length === 0 && <p>No meals available.</p>}

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center'
      }}>
        {meals.map((meal) => (
          <div key={meal.id} style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '15px',
            width: '250px',
            boxShadow: '2px 2px 10px rgba(0,0,0,0.1)'
          }}>

            {/* IMAGE */}
            {meal.image && (
              <img
                src={meal.image}
                alt={meal.title}
                style={{
                  width: '100%',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '6px',
                  marginBottom: '10px'
                }}
              />
            )}

            <h3>{meal.title}</h3>
            <p>{meal.description}</p>
            <p><strong>${meal.cost}</strong></p>

            <button onClick={()=> {navigate(`/orders/add?mealPlan=${meal.id}`)}}
              style={{
                backgroundColor: '#2e7d32',
                color: 'white',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Add to Order
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;