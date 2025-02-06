import React from 'react'

const Product = ({image, name}) => {
  return (
    <>
    <div>
        <img src={image} className="sm:w-40 h-40 lg:w-60  w-50 mb-2 "></img>
        <h4 className="text-center text-lg font-bold mb-10">{name}</h4>
    </div>
    </>
  )
}

export default Product