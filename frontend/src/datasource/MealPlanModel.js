class MealPlanModel {
    constructor(
        id = "",
        title = "",
        Description = "",
        active = true,
        image = "",
        cost = ""
    ) {
        this.id = id;
        this.title = title;
        this.Description = Description;
        this.active = active;
        this.image = image;
        this.cost = cost;
    }
}

export default MealPlanModel;