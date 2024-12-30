import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import gambarudang from "../gambar/gambarudang.png";
import showicon from "../ikon/show.png";
import hideicon from "../ikon/hide.png";
import logo from "../ikon/icon.png";

const Login = () => {
  const [passwordType, setPasswordType] = useState("password");
  const navigate = useNavigate(); // Initialize useNavigate

  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submission
    // Logic for authentication can be added here
    navigate("/monitoring"); // Navigate to Monitoring Page
  };

  return (
    <div className="flex flex-col md:flex-row h-screen font-bold">
      {/* Left Section */}
      <div className="relative w-full md:w-1/3">
        <img
          src={gambarudang}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black bg-opacity-40">
          {/* Logo and Admin Text */}
          <div className="absolute top-4 left-4 flex items-center">
            <img src={logo} alt="Logo" className="h-10 w-10 mr-2" />
            <span className="text-xl">Admin</span>
          </div>
          <h1 className="text-4xl md:text-5xl mb-4">Welcome Back!</h1>
          <p className="text-center text-lg px-6 md:px-12">
            Use your access in the application and login to your dashboard account.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-2/3 flex flex-col justify-center items-center bg-gray-100 py-8 md:py-0">
        <div className="w-11/12 md:w-3/4">
          <h2 className="text-3xl md:text-4xl mb-8 text-left">Login</h2>
          <form onSubmit={handleLogin}>
            {/* Email Field */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-600 text-sm mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Enter your email"
              />
            </div>
            {/* Password Field */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-600 text-sm mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={passwordType}
                  id="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Enter your password"
                />
                <span
                  onClick={togglePasswordVisibility}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                >
                  <img
                    src={passwordType === "password" ? hideicon : showicon}
                    alt="Toggle Password"
                    className="h-5 w-5"
                  />
                </span>
              </div>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-600 text-left">
            Don't have an account yet?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Register Here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
