import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import ToastNotification from '../Alert Styling/ToastNotification';

const UpdatePassword = () => {
 const location=useLocation();
 console.log(location);
 const email=location.state.email;
 console.log(email);
  const navigate=useNavigate();
  const[newPass,SetnewPass]=useState("");
  const [confirmPass,setconfirmPass]=useState("");

  const newPassChange=(e)=>{
      SetnewPass(e.target.value);
  }
  const confirmPassChange=(e)=>{
      setconfirmPass(e.target.value);
  }
  const handleSubmit=async(e)=>{
    // e.preventDefault();
    try{
        if(newPass!==confirmPass){
            return ToastNotification("error","Bothe Passwords Eneterd are not same!!");
        }
        if(newPass==confirmPass){
            const payload={
                email:email,
                password:newPass
            }
            try{
                const res= await axios.post("http://localhost:8000/updatepassword",payload);
                console.log(res);
                console.log(res.data.upadtedUser)
                if(res.statusText=="OK"){
                  // alert(res.data.message);
                  ToastNotification("success",res.data.message);
                  navigate("/");
                  localStorage.setItem('user',JSON.stringify({username: res.data.upadtedUser.username,id:res.data.
                    upadtedUser.id,token:res.data.upadtedUser.token}));
                }
            }
            catch(err){
                // ToastNotification("error","Both passwords are not Same!!");
                console.log(err);
                ToastNotification("error",err.response.data.message);

            }

        }



    }
    catch(err){
    // alert(err.response.data.message);
    ToastNotification("error",err.response.data.message);
      console.log(err);
    }
                SetnewPass("");
                setconfirmPass("");
  }



  return (
    <div className="w-full h-screen  bg-gray-100 mt-0 mb-0">
    <div className="flex  sm:mx-20 md:mx-40 lg:mx-70 bg-gray-100">

        <div className="w-5/12 mt-10 px-6 py-12  bg-blue-500 mt-20">
        <h1 className="text-white text-3xl font-bold leading-12 mb-10">Update Password</h1>
        <h4 className="text-gray-200 text-lg font-medium leading-8">Get access to your Orders, Wishlist and Recommendations</h4>
        <img className="mx-auto sm:mt-20 lg:mt-30" src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png"></img>
        </div>

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white mt-20">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Update Password
          </h2>
        </div>

        <div className="mt-10">
          <div className="space-y-6">
            <div>
              <label htmlFor="new-password" className="block text-sm/6 font-medium text-gray-900">
                New Password
              </label>
              <div className="mt-2">
                <input
                  id="new-password"
                  name="new-password"
                  type="password"
                  required
                  autoComplete="password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                  onChange={newPassChange}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="confirm-password" className="block text-sm/6 font-medium text-gray-900">
                 Confirm Password
                </label>
                <div class="text-sm">
          </div>

              </div>
              <div className="mt-2">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  required
                  autoComplete="confirm-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                  onChange={confirmPassChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-orange-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>


        </div>
      </div>

    </div>
    </div>
  )
}

export default UpdatePassword;