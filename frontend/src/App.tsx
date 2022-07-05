import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Register } from './components/pages/Register'
import { Login } from './components/pages/Login'
import { Home } from './components/pages/Home'
import { Logout } from './components/pages/Logout'
import { ForgotPassword } from './components/pages/PasswordForgot'
import { ResetPassword } from './components/pages/PasswordReset'

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<Home />} />
      <Route path='/logout' element={<Logout />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/password-reset/:token' element={<ResetPassword />} />
    </Routes>
  </BrowserRouter>
)
