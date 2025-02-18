// import axios from 'axios'
// import React from 'react'


// const IndividualProduct = async() => {
//     const location=useLocation();
//     const category=location.state;
//     const res= await axios.get(`http://localhost:8000/product/${category}`);
//     console.log(res);
//   return (
//     <div>Product Lists</div>
//   )
// }

// export default IndividualProduct;


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { LuIndianRupee } from "react-icons/lu";
import ToastNotification from '../Alert Styling/ToastNotification';

const IndividualProduct = () => {
    const location = useLocation();
    const category = location.state;
    const [products, setProducts] = useState([]);
    const navigate=useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/product/${category}`);
                setProducts(res.data.ProductLists); // Update state with fetched data
                // console.log(res.data.ProductLists);
                // console.log(res.data.ProductLists[0].image);
            } catch (error) {
              // alert(error.response.data.message);
              ToastNotification("error",err.response.data.message);
              console.error("Error fetching data:", error);
            }
        };
        fetchProducts();
    }, [category]); // Re-run effect when category changes

    if (!products) return <div>Loading...</div>;

    //Stars Printing
  const getStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        // Full Star
        stars.push(<FaStar key={i} className="text-yellow-400 text-2xl" />);
      } else if (i === Math.floor(rating) + 1 && rating % 1 !== 0) {
        // Half Star
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400 text-2xl" />);
      } else {
        // Empty Star
        stars.push(<FaRegStar key={i} className="text-gray-300 text-2xl" />);
      }
    }
    return stars;
  };

    return (
    <div className="flex w-full h-fit justify-center gap-10 flex-wrap mb-20 p-5">
      {products.map((product) => (
        <div
          key={product._id}
          className="cursor-pointer bg-white shadow-lg rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl w-72"
        >
          <div className="h-fit  rounded-2xl" onClick={()=>navigate(`/product/${product.category}/${product.title}`,{state:product})}>
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-80 object-cover rounded-t-2xl"
            />
          </div>
          <div className="p-4">
            <h2 className="text-lg font-bold text-gray-800">{product.title}</h2>
            <div className="flex justify-between items-center mt-2">
              <span className="text-gray-700 font-semibold">Price: <LuIndianRupee className="inline"/>{product.price}</span>
            </div>
            <div className="flex items-center mt-2">
              {getStars(product.rating.rate)}
              <span className="ml-2 text-gray-600">{product.rating.rate}/5</span>
            </div>
          </div>
        </div>

      ))}
    </div>
    );
};

export default IndividualProduct;
