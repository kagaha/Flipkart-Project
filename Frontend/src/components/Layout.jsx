
import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Utility/Header';
import Footer from './Utility/Footer';

const Layout = () => {
  return (
    <div>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Layout;