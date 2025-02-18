import React from 'react'
import { useNavigate } from 'react-router-dom'

const Product = ({image, name}) => {
  const navigate=useNavigate();
  return (
    <>
    <div onClick={()=>navigate(`/product/${name}`,{state:name})} className="cursor-pointer">
        <img src={image} className="sm:w-40 h-40 lg:w-60  w-50 mb-2 rounded-2xl shadow-2xl"></img>
        <h4 className="text-center text-lg font-bold mb-10">{name}</h4>
    </div>
    </>
  )
}

export default Product;