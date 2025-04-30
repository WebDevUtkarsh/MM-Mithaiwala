import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import React from "react";
import AuthButton from "../components/AuthButton";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();
  const { logout } = useAuth();
  return (
    <div className="w-full">
      { user ? <button onClick={logout}>Logout</button> : <></>}
    </div>
  );
};

export default Home;
