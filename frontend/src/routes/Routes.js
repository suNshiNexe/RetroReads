import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import MyAccount from '../pages/MyAccount'
import MyInterests from '../pages/MyInterests'
import MyShelf from '../pages/MyShelf'
import BookRegister from '../pages/BookRegister'
import MySales from '../pages/MySales'
import PrivateRoute from './PrivateRoute';

const AppRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/my-account' element={<PrivateRoute> <MyAccount /> </PrivateRoute>} /> {/* Rota protegida */}
        <Route path="/my-interests" element={<PrivateRoute> <MyInterests /> </PrivateRoute>} /> 
        <Route path="/my-shelf" element={<PrivateRoute> <MyShelf /> </PrivateRoute>} /> 
        <Route path="/book-register" element={<PrivateRoute> <BookRegister /> </PrivateRoute>} /> 
        <Route path="/my-sales" element={<PrivateRoute> <MySales /> </PrivateRoute>} /> 
      </Routes>
    );
  };
  
  export default AppRoutes;