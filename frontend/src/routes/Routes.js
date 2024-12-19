import React from 'react'
import { lazy, Suspense } from 'react'
import { Routes, Route} from 'react-router-dom'

import PrivateRoute from './PrivateRoute';
import Login  from '../pages/Login'
import Signup from '../pages/Signup'
import Home from '../pages/Home'

const MyAccount = lazy(() => import('../pages/MyAccount'))
const MyInterests = lazy(() => import('../pages/MyInterests'))
const MyShelf = lazy(() => import('../pages/MyShelf'))
const BookRegister = lazy(() => import('../pages/BookRegister'))
const MySales = lazy(() => import('../pages/MySales'))
const BookPage = lazy(() => import('../pages/BookPage'))

const AppRoutes = () => {
    return (
      <Suspense fallback={<div>Carregando...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path='/my-account' element={<PrivateRoute> <MyAccount /> </PrivateRoute>} /> {/* Rota protegida */}
            <Route path="/my-interests" element={<PrivateRoute> <MyInterests /> </PrivateRoute>} /> 
            <Route path="/my-shelf" element={<PrivateRoute> <MyShelf /> </PrivateRoute>} /> 
            <Route path="/book-register" element={<PrivateRoute> <BookRegister /> </PrivateRoute>} /> 
            <Route path="/my-sales" element={<PrivateRoute> <MySales /> </PrivateRoute>} /> 
            <Route path="/books/:id" element={<BookPage />} />
          </Routes>
      </Suspense>
    );
  };
  
  export default AppRoutes;