import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import MealList from './meals/MealList';
import AddMeal from './meals/AddMeal';
import EditMeal from './meals/EditMeal';
import OrderList from './orders/OrderList';
import AddOrder from './orders/AddOrder';
import EditOrder from './orders/EditOrder';
import Home from './pages/Home';
import History from './pages/History';
import Profile from './pages/Profile';
import PrivateRoute from './components/auth/PrivateRoute';

const MainRouter = () => {
  return (
    <div>
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />} />
        <Route path="/meals_public" element={<Home />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* CRUD Routes */}
        <Route path="/meals" element={<MealList />} />
        <Route path="/meals/add" element={
          <PrivateRoute>
            <AddMeal />
          </PrivateRoute>
        } />
        <Route path="/meals/edit/:id" element={
          <PrivateRoute>
            <EditMeal />
          </PrivateRoute>
        } />

        <Route path="/orders" element={
          <PrivateRoute>
            <OrderList />
          </PrivateRoute>
        } />
        <Route path="/orders/add" element={
          <PrivateRoute>
            <AddOrder />
          </PrivateRoute>
        } />
        <Route path="/orders/add/:id" element={
          <PrivateRoute>
            <AddOrder />
          </PrivateRoute>
        } />
        <Route path="/orders/edit/:id" element={
          <PrivateRoute>
            <EditOrder />
          </PrivateRoute>
        } />

        {/* User Pages */}
        <Route path="/history" element={
          <PrivateRoute>
            <History />
          </PrivateRoute>
        } />
        <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />
      </Routes>
    </div>
  );
};

export default MainRouter;
