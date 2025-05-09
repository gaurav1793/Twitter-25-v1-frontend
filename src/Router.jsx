import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserSignInPage from './pages/UserSignInPage'
import UserSignUpPage from './pages/UserSignUpPage'
import UserHome from './pages/UserHome'

const Router = () => {
  return (
    <Routes>
        <Route path='/' element={<UserSignInPage/>}/>
        <Route path='/SignUp' element={<UserSignUpPage/>}/>
        <Route path='/logout' element={<UserHome/>}/>
    </Routes>
  )
}

export default Router