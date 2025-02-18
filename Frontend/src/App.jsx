import React from 'react'
import Signup from './components/screens/Signup'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './components/screens/Login'
import Home from './components/screens/Home'
import ForgotPassword from './components/Utility/Forgot'
import IndividualProduct from './components/Products/IndividualProduct'
import IndividualItem from './components/Products/IndividualItem'
import Cart from './components/screens/Cart'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from './components/screens/CartContext'
import UpdatePassword from './components/Utility/UpdatePassword'
import NotFound from './components/404page/Notfound'
import { AddressForm } from './components/screens/AdressForm'
import { PaymentPage } from './components/screens/PaymentPage'
import PaymentSuccess from './components/screens/PayConfirmation'

const App = () => {
  return (

    <div className="bg-gray-200 w-full h-fit">
    <CartProvider>
    <BrowserRouter>
    <ToastContainer position="top-center" autoClose={false} draggable={false}/>

    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route path="/" element={<Home/>}/>
      <Route path='signup' element={<Signup/>} />
      <Route path='login' element={<Login/>}/>
      <Route path='forgot-password' element={<ForgotPassword/>}/>
      <Route path="product/:category" element={<IndividualProduct/>}/>
      <Route path="product/:category/:title" element={<IndividualItem/>}/>
      <Route path="cart" element={<Cart/>}/>
      <Route path="update-password" element={<UpdatePassword/>}/>
      <Route path="address" element={<AddressForm/>}/>
      <Route path="payment" element={<PaymentPage/>}/>
      <Route path="confirmation" element={<PaymentSuccess/>}/>
      </Route>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
    </BrowserRouter>
    </CartProvider>

    </div>
  )
}

export default App