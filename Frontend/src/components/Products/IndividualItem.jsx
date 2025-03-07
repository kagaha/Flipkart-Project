import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import ToastNotification from '../Alert Styling/ToastNotification';
import { useCart } from '../screens/CartContext';

const IndividualItem = () => {
    const location=useLocation();
    const navigate=useNavigate();
   const product=location.state;
   const {setCartCount}=useCart();
  //  console.log(product);
//   const [cartProd,SetcartProd]=useState([]);
//   useEffect(() => {
//     if (cartProd.length > 0) {
//       navigate("/cart", { state: cartProd });
//     }
//   }, [cartProd]);
// console.log(cartProd);

   const handleAddToCart=async(product)=>{
    try{
      console.log(product._id);
      const userDet=JSON.parse(localStorage.getItem("user"));
      console.log(userDet);
      console.log(userDet.id);
      if(localStorage.getItem("user")){
        const res=await axios.post(`http://localhost:8000/cart/${product._id}/${userDet.id}`);
        console.log(res);
        // SetcartProd((prevItems)=>[...prevItems,res.data.newCart]);
        // alert(res.data.message);
        ToastNotification("success",res.data.message);
        setCartCount(prevCount => prevCount + 1);
      }else{
        // alert("You must be LoggedIn to add into the cart!!");
        ToastNotification("error","You must be LoggedIn to add into the cart!!");
        navigate("/login");
      }

    }catch(err){
      // alert(err.response?.data.message);
      ToastNotification("error",err.response?.data.message);
      console.log(err);
    }

   }
   if (!product) return <div>Loading...</div>;
  return (
    <div className="flex flex-col md:flex-row justify-evenly mb-20 h-fit px-6 py-10 border-2 sm:mx-30 md:mx-60 lg:mx-80 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
  <div className="mr-10 flex justify-center items-center w-full md:w-2/5">
    <img
      src={product.image}
      alt={product.title}
      className="w-full max-w-xs h-auto rounded-lg transition-transform duration-300 hover:scale-105"
    />
  </div>

  <div className="sm:pt-7 lg:pt-15 md:pt-9 flex flex-col justify-start space-y-4 w-full md:w-3/5">
    <h2 className="text-2xl font-semibold text-gray-800">{product.title}</h2>
    <p className="text-gray-600 text-lg " >{product.description}</p>

    <div className="flex items-center space-x-4">
      <h3 className="text-xl font-bold text-green-500 ">{product.price}</h3>
      <div className="flex items-center text-yellow-500">
        {Array.from({ length: Math.floor(product.rating.rate) }).map((_, index) => (
          <span key={index} className="text-2xl">★</span>
        ))}
        {product.rating.rate % 1 !== 0 && <span className="text-xl">☆</span>}
        <span className="ml-2 text-gray-500">{product.rating.count} reviews</span>
      </div>
    </div>

    <button
      className="mt-6 py-2 px-4 w-40 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200 cursor-pointer"
      onClick={() => handleAddToCart(product)}
    >
      Add to Cart
    </button>
  </div>
</div>

  )
}

export default IndividualItem