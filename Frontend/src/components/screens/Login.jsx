import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Login = () => {
  const navigate=useNavigate();
  const[email,Setemail]=useState("");
  const [password,setPassword]=useState("");

  const emailChange=(e)=>{
      Setemail(e.target.value);
  }
  const passwordChange=(e)=>{
      setPassword(e.target.value);
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const payload={
        email:email,
        password:password
      };
      console.log(payload);
      const res= await axios.post("http://localhost:8000/login",payload);
      console.log(res);
      if(res.statusText="Created"){
        alert(res.data.message);
        navigate("/");
        localStorage.setItem('user',JSON.stringify({username: res.data.Loggeduser.username,id:res.data.Loggeduser.id,token:res.data.Loggeduser.token}));
      }

    }
    catch(err){
    alert(err.response.data.message);
    if(err.response.data.message=="User not exist Signup again!!"){
      navigate("/signup");
    }

      console.log(err);
    }
  }



  return (
    <div className="w-full h-screen  bg-gray-100 mt-0 mb-0">
    <div className="flex  sm:mx-20 md:mx-40 lg:mx-70 bg-gray-100">

        <div className="w-5/12 mt-10 px-6 py-12  bg-blue-500 mt-20">
        <h1 className="text-white text-3xl font-bold leading-12 mb-10">Login</h1>
        <h4 className="text-gray-200 text-lg font-medium leading-8">Get access to your Orders, Wishlist and Recommendations</h4>
        <img className="mx-auto sm:mt-20 lg:mt-30" src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png"></img>
        </div>

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white mt-20">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Login Page
          </h2>
        </div>

        <div className="mt-10">
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                  onChange={emailChange}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
                <div class="text-sm">
            <a  class="font-semibold text-indigo-600 hover:text-indigo-500" onClick={()=>navigate("/forgot-password")}>Forgot password?</a>
          </div>

              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                  onChange={passwordChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-orange-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleSubmit}
              >
                Signup
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm/6 text-gray-500">

            <a className="font-semibold text-blue-600 hover:text-blue-500" onClick={()=>navigate("/signup")}>
            New to Flipkart? Create an account
            </a>
          </p>
        </div>
      </div>

    </div>
    </div>
  )
}

export default Login