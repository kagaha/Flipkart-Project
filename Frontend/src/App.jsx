import React from 'react'
import Signup from './components/screens/Signup'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './components/screens/Login'
import Home from './components/screens/Home'
import ForgotPassword from './components/Utility/Forgot'

const App = () => {
  return (
    <div className="bg-gray-200 w-full h-fit">
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route path="/" element={<Home/>}/>
      <Route path='signup' element={<Signup/>} />
      <Route path='login' element={<Login/>}/>
      <Route path='forgot-password' element={<ForgotPassword/>}/>
      </Route>
      <Route path='*' element={<h1>404 Page Not found</h1>}/>
    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App