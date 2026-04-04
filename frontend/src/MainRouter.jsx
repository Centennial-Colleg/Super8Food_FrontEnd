import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
//import MealList from './pages/MealList';
import MealList from './meals/MealList';
import AddMeal from './meals/AddMeal';
import EditMeal from './meals/EditMeal';


const MainRouter = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Routes>
        {/* Home Route */}
        <Route path="/" element={
          <div>
            <h1>Welcome to Super 8 Food</h1>
            <p>Group 8 - Weekly Meal Delivery Project</p>
          </div>
        } />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* CRUD Route */}
        <Route path="/meals" element={<MealList />} />
        <Route path="/meals/add" element={<AddMeal />} />
        <Route path="/meals/edit/:id" element={<EditMeal />} />
      </Routes>
    </div>
  );
};

export default MainRouter;