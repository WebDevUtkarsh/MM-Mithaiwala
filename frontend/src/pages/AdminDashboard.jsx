import React from "react";

const AdminDashboard = () => {
  return (
    <div className="w-full h-screen">
      <div className="flex items-center justify-center px-10 w-full h-full">
        <div className="w-[15%] border-r h-full font-serif">
            <ul className="space-y-4  pt-10">
                <li className="hover:bg-black transition-all duration-300 cursor-pointer w-fit px-5 py-2 hover:text-white rounded-full">Home</li>
                <li className="hover:bg-black transition-all duration-300 cursor-pointer w-fit px-5 py-2 hover:text-white rounded-full">Products</li>
                <li className="hover:bg-black transition-all duration-300 cursor-pointer w-fit px-5 py-2 hover:text-white rounded-full">Orders</li>
                <li className="hover:bg-black transition-all duration-300 cursor-pointer w-fit px-5 py-2 hover:text-white rounded-full">Offers</li>
                <li></li>
            </ul>
        </div>
        <div className="w-[85%]">main</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
