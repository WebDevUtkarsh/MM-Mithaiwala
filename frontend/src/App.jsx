import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./components/Login";
import AuthButton from "./components/AuthButton";
import { UserCircleIcon } from "lucide-react";
import Signup from "./components/Signup";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  return (
    <AuthProvider>
      <div className="w-full h-screen">
        <header className="flex items-center justify-between px-10 py-4">
          <div>
            <Link to={"/"}>
              <img src="/logo.webp" alt="logo" width={70} height={70} />
            </Link>
          </div>
          <div>
            {/* <AuthButton /> */}
            <Link to={"/login"}>
              <button className="cursor-pointer flex items-center justify-center gap-2">
                <UserCircleIcon /> Login
              </button>
            </Link>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
