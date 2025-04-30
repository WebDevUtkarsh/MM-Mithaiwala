import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState({});
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/api/users/register", {
        name,
        email,
        password,
      });

      const user = res.data;
      setData(user);

      localStorage.setItem("token", user.token);

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError(error.response?.data?.message || "Login failed");
    }
  };
  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-1/2 flex items-center justify-center">
        <div className="flex items-center justify-center flex-col space-y-8 pt-8">
          <h1 className="text-3xl">Create an Account!</h1>
          <form
            onSubmit={handleSignUp}
            className="flex flex-col items-center justify-center space-y-3"
          >
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter your name"
              className="border px-5 py-1.5 rounded-lg"
              required
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter email"
              className="border px-5 py-1.5 rounded-lg"
              required
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              placeholder="Enter password"
              className="border px-5 py-1.5 rounded-lg"
              required
            />
            <button
              type="submit"
              className="cursor-pointer border bg-black text-white px-8 py-2 rounded-xl"
            >
              Sign Up
            </button>
            <p>
              Already have an account?{" "}
              <span className="text-blue-400 cursor-pointer">
                <Link to={"/login"}>Login</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
      <div className="w-1/2 object-cover">
        <img
          src="/login-img.jpg"
          alt="img"
          width={400}
          className="rounded-tl-4xl rounded-br-4xl"
        />
      </div>
    </div>
  );
};

export default Signup;
