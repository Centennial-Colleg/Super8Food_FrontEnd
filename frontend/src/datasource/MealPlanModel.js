class MealPlanModel {
    constructor(
        id = "",
        title = "",
        description = "",
        active = true,
        image = "",
        cost = ""
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.active = active;
        this.image = image;
        this.cost = cost;
    }
}

export default MealPlanModel;