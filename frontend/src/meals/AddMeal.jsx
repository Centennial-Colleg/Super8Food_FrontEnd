import { useState } from 'react';

function AddMeal({ onAdd }) {
  const [meal, setMeal] = useState({ name: '', description: '', price: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the new meal data back to the parent (MealList)
    onAdd({ ...meal, id: Date.now(), price: parseFloat(meal.price) });
    setMeal({ name: '', description: '', price: '' }); // Reset form
  };

  return (
    <div style={{ padding: '15px', border: '1px dashed #2e7d32', marginBottom: '20px' }}>
      <h3>Add to Super 8 Menu</h3>
      <form onSubmit={handleSubmit}>
        <input 
          placeholder="Name" 
          value={meal.name} 
          onChange={(e) => setMeal({...meal, name: e.target.value})} 
          required 
        />
        <input 
          placeholder="Description" 
          value={meal.description} 
          onChange={(e) => setMeal({...meal, description: e.target.value})} 
          required 
        />
        <input 
          type="number" 
          placeholder="Price" 
          value={meal.price} 
          onChange={(e) => setMeal({...meal, price: e.target.value})} 
          required 
        />
        <button type="submit">Save Meal</button>
      </form>
    </div>
  );
}

export default AddMeal;