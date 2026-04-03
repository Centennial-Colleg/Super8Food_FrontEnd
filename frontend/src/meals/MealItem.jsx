function MealItem({ meal, onDelete }) {
  return (
    <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', width: '220px' }}>
      <h3>{meal.name}</h3>
      <p>{meal.description}</p>
      <p><strong>${meal.price.toFixed(2)}</strong></p>
      <button onClick={() => onDelete(meal.id)} style={{ color: 'red', cursor: 'pointer' }}>
        Delete
      </button>
    </div>
  );
}

export default MealItem;