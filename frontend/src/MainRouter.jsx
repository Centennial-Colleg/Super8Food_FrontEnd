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

        {/* CRUD Route */}
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
      </Routes>
    </div>
  );
};

export default MainRouter;