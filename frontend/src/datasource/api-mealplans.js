
const API_BASE_URL = "http://localhost:5000/api/meal_plan";


export async function listMealPlans() {
  try {
    const response = await fetch(`${API_BASE_URL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching meal plans:", error);
    return [];
  }
}

export async function createMealPlan(mealPlan, token) {
  try {
    const response = await fetch(`${API_BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(mealPlan),
    });
    return await response.json();
  } catch (error) {
    console.error("Error creating meal plan:", error);
    return null;
  }
}

export async function updateMealPlan(id, mealPlan, token) {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(mealPlan),
    });
    return await response.json();
  } catch (error) {
    console.error("Error updating meal plan:", error);
    return null;
  }
}

export async function disableMealPlan(id, token) {
  try {
    const response = await fetch(`${API_BASE_URL}/disable/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error disabling meal plan:", error);
    return null;
  }
}