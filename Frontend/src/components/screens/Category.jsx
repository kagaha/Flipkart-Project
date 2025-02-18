import React from 'react'
import AutoSlider from './AutoSlider';

const Category = () => {
    const images = [
        {
            image: "https://rukminim2.flixcart.com/flap/80/80/image/29327f40e9c4d26b.png?q=100",
            name: "kilos"
        },
        {
            image: "https://rukminim2.flixcart.com/flap/80/80/image/22fddf3c7da4c4f4.png?q=100",
            name: "Mobiles"
        },
        {
            image: "https://rukminim2.flixcart.com/fk-p-flap/80/80/image/0d75b34f7d8fbcb3.png?q=100",
            name: "Fashion"
        },
        {
            image: "https://rukminim2.flixcart.com/flap/80/80/image/69c6589653afdb9a.png?q=100",
            name: "Electronics"
        },
        {
            image: "https://rukminim2.flixcart.com/flap/64/64/image/ab7e2b022a4587dd.jpg?q=100",
            name: "Home & Furniture"
        },
        {
            image: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/0139228b2f7eb413.jpg?q=100",
            name: "Appliances"
        },
        {
            image: "https://rukminim2.flixcart.com/flap/64/64/image/71050627a56b4693.png?q=100",
            name: "Flight Bookings"
        },
        {
            image: "https://rukminim2.flixcart.com/flap/64/64/image/dff3f7adcf3a90c6.png?q=100",
            name: "Beauty, Toys & More"
        }
    ];


  return (
   <div>
    <div className="flex justify-evenly mb-5 flex-wrap gap-10  py-2 px-2 ml-3  bg-white  mt-4 w-full">
        {
            images.map((item)=>{
                return (
                    <div>
                         <img src={item.image}></img>
                         <h4>{item.name}</h4>
                    </div>

                )
            })
        }
    </div>

   </div>
  )
}

export default Category;