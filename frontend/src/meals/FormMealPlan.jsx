function FormMealPlan({ mealPlan, handleChange, handleSubmit }) {
    return (
        <form onSubmit={handleSubmit}>

            <input
                name="title"
                placeholder="Title"
                value={mealPlan.title}
                onChange={handleChange}
                required
            />

            <input
                name="Description"
                placeholder="Description"
                value={mealPlan.Description}
                onChange={handleChange}
                required
            />

            <input
                name="cost"
                type="number"
                placeholder="Cost"
                value={mealPlan.cost}
                onChange={handleChange}
                required
            />

            <input
                name="image"
                placeholder="Image URL"
                value={mealPlan.image}
                onChange={handleChange}
                required
            />

            <label>
                Active:
                <input
                    name="active"
                    type="checkbox"
                    checked={mealPlan.active}
                    onChange={handleChange}
                />
            </label>

            <button type="submit">Save Meal Plan</button>
        </form>
    );
}

export default FormMealPlan;