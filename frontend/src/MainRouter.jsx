import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import MealList from './pages/MealList';

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
      </Routes>
    </div>
  );
};

export default MainRouter;