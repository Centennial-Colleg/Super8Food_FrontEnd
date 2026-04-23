
// OrderModel.js reviewed by Mohd Javed Khan – structure verified, no modifications

class OrderModel {
    constructor(
        id = "",
        title = "",
        description = "",
        active = true,
        status = "",
        deliveryDate = "",
        completionDate = "",
        mealPlan = "",
        address = ""
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.active = active;
        this.status = status;
        this.deliveryDate = deliveryDate;
        this.completionDate = completionDate;
        this.mealPlan = mealPlan;
        this.address = address;
    }
}

export default OrderModel;