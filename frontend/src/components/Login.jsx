import React from "react";

const Login = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-1/2 flex items-center justify-center">
        <div className="flex items-center justify-center flex-col space-y-8 pt-8">
          <h1 className="text-3xl">Welcome back! Login</h1>
          <form className="flex flex-col items-center justify-center space-y-3">
            <input type="text" placeholder="Enter email" className="border px-5 py-1.5 rounded-lg" />
            <input type="text" placeholder="Enter password" className="border px-5 py-1.5 rounded-lg" />
            <button type="submit" className="cursor-pointer border bg-black text-white px-8 py-2 rounded-xl">
              Login
            </button>
            <p>Don't have an account? <span className="text-blue-400 cursor-pointer">Sign Up</span></p>
          </form>
        </div>
      </div>
      <div className="w-1/2 object-cover">
        <img src="/login-img.jpg" alt="img" width={400} className="rounded-tl-4xl rounded-br-4xl"/>
      </div>
    </div>
  );
};

export default Login;
