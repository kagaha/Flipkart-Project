import React from 'react'
import Product from './Product'

const Products = () => {
  const productsarr=[
    {

      image:"https://navbharattimes.indiatimes.com/thumb/102248745/smart-tv-102248745.jpg?imgsize=37454&width=380&height=214&resizemode=75",
      name:"Electronics"
    },
    {
      image:"https://www.shopickr.com/wp-content/uploads/2015/07/flipkart-fashion-sale-july-7-31-2015.jpg",
      name:"Clothing"
    },
    {
      image:"https://i.pinimg.com/736x/4b/d3/cd/4bd3cd68cc997a2435527daa783cd454--bluetooth-speakers-mobile-accessories.jpg",
      name:"Accessories"
    },
    {
      image:"https://static.toiimg.com/thumb/resizemode-4,width-1280,height-720,msid-109776995/109776995.jpg",
      name:"Groceries"
    }
  ];
  return (
    <div>
        <div className="flex justify-evenly align-center flex-wrap gap-10">
          {
            productsarr.map((item)=>{
             return <>
              <Product image={item.image} name={item.name}/>
             </>

            })
          }
        </div>
    </div>
  )
}

export default Products