class MealModel {
  constructor(name, description, category, price, quantity) {
    this.name = name || '';
    this.description = description || '';
    this.category = category || '';
    this.price = price || 0;
    this.quantity = quantity || 0;
  }
}

export default MealModel;