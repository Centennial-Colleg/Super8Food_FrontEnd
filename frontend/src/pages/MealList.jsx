import React from 'react';

const mockMeals = [
  { id: 1, name: "Protein Power Bowl", description: "Quinoa, roasted chickpeas, and tahini dressing.", price: 12.99 },
  { id: 2, name: "Zesty Salmon Pasta", description: "Fresh Atlantic salmon with lemon garlic sauce.", price: 15.50 },
  { id: 3, name: "Green Garden Salad", description: "Organic mixed greens with house-made vinaigrette.", price: 9.95 },
];

function MealList() {
  return (
    <div className="meal-page">
      <h1>Our Weekly Menu</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {mockMeals.map((meal) => (
          <div key={meal.id} style={{ 
            border: '1px solid #ddd', 
            borderRadius: '8px', 
            padding: '15px', 
            width: '250px',
            boxShadow: '2px 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h3>{meal.name}</h3>
            <p>{meal.description}</p>
            <p><strong>${meal.price}</strong></p>
            <button style={{ backgroundColor: '#2e7d32', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>
              Add to Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MealList;