import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
//import MealList from './pages/MealList';
import MealList from './meals/MealList';
import AddMeal from './meals/AddMeal';
import EditMeal from './meals/EditMeal';
import OrderList from './meals/OrderList';
import AddOrder from './meals/AddOrder';
import EditOrder from './meals/EditOrder';
import Home from './pages/Home';


const MainRouter = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />} />
        <Route path="/meals_public" element={<Home />} />


        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* CRUD Route */}
        <Route path="/meals" element={<MealList />} />
        <Route path="/meals/add" element={<AddMeal />} />
        <Route path="/meals/edit/:id" element={<EditMeal />} />

        <Route path="/orders" element={<OrderList />} />
        <Route path="/orders/add" element={<AddOrder />} />
        <Route path="/orders/edit/:id" element={<EditOrder />} />
      </Routes>
    </div>
  );
};

export default MainRouter;