import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate=useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mt-2">
        Page Not Found <span className="text-yellow-500">⚠️</span>
      </h2>
      <p className="text-gray-500 mt-2">we couldn't find the page you are looking for.</p>
      <button className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 transition cursor-pointer"
      onClick={()=>navigate("/")}>
        Back To Home
      </button>
      <img
        src="https://demos.themeselection.com/sneat-mui-nextjs-admin-template/demo-1/images/illustrations/characters-with-objects/13.png"
        alt="Error Illustration"
        className="w-1/2 max-w-lg mt-6"
      />
    </div>
  );
};

export default NotFound;
