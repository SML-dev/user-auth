import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Register } from './components/pages/Register'
import { Login } from './components/pages/Login'
import { Home } from './components/pages/Home'
import { Logout } from './components/pages/Logout'
import { ForgotPassword } from './components/pages/PasswordForgot'
import { ResetPassword } from './components/pages/PasswordReset'
import { Header } from './components/Header'
import { Welcome } from './components/Welcome'
import { useSelector } from 'react-redux'
import { NotFound } from './components/pages/NotFound'

export const App = () => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <BrowserRouter>
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Home />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/password-reset/:token' element={<ResetPassword />} />
            <Route path='/user' element={<Welcome />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </main>
    </>
  )
}
