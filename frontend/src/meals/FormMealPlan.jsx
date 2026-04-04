function FormMealPlan({ mealPlan, handleChange, handleSubmit }) {
    return (
        <div className="container" style={{ width: "100%" }}>
            <div className="row">
                <div className="col-md-12">

                    <form onSubmit={handleSubmit} className="form">

                        <div className="form-group">
                            <label htmlFor="titleField">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="titleField"
                                name="title"
                                placeholder="Enter title"
                                value={mealPlan.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <br />

                        <div className="form-group">
                            <label htmlFor="descriptionField">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="descriptionField"
                                name="description"
                                placeholder="Enter description"
                                value={mealPlan.description}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <br />

                        <div className="form-group">
                            <label htmlFor="costField">Cost</label>
                            <input
                                type="number"
                                className="form-control"
                                id="costField"
                                name="cost"
                                placeholder="Enter cost"
                                value={mealPlan.cost}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <br />

                        <div className="form-group">
                            <label htmlFor="imageField">Image URL</label>
                            <input
                                type="text"
                                className="form-control"
                                id="imageField"
                                name="image"
                                placeholder="Enter image URL"
                                value={mealPlan.image}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <br />

                        <div className="form-group form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="activeField"
                                name="active"
                                checked={mealPlan.active}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="activeField">
                                Active
                            </label>
                        </div>

                        <br />

                        <button className="btn btn-primary" type="submit">
                            Save Meal Plan
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default FormMealPlan;