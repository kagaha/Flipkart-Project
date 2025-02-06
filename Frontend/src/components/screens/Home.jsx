import React from 'react'
import Category from './Category'
import AutoSlider from './AutoSlider'
import Products from '../Products/Products.jsx'



const Home = () => {
  return (
    <div className="flex flex-col">
    <div className='bg-gray-200 w-full px-3 '>
      <Category/>
    </div>
    <div className="mb-20">
      <AutoSlider/>
    </div>
    <div>
      <Products/>
    </div>
</div>
  )
}

export default Home