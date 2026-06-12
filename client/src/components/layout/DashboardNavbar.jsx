import React, { useState, useEffect } from "react";
import { FaBars, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { getUser, logout } from "../../services/authService";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../../assets/images/Logo.png"
 
const DashboardNavbar = ({ toggleSidebar }) => {
  const [user, setUser] = useState(getUser());
  const navigate = useNavigate();
 
  useEffect(() => {
    const handleUpdate = () => setUser(getUser());
    window.addEventListener("userUpdated", handleUpdate);
    return () => window.removeEventListener("userUpdated", handleUpdate);
  }, []);
 
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
 
  return (
    <header className="h-16 bg-white border-b border-slate-100 px-5 flex items-center justify-between">
      
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 transition"
        >
          <FaBars size={16} />
        </button>
 
        <div className="flex items-center gap-2">
  <Link to="/">
  <img
    src={Logo}
    alt="AI Project Architect"
    className="w-8 h-10 object-contain border-2 border-gray-300 rounded-lg cursor-pointer"
  />
</Link>
  <h1 className="text-sm font-semibold text-slate-700 hover:text-blue-700 hidden sm:block">
    AI Project Architect
  </h1>
</div>
      </div>
 
      {/* Right */}
      <div className="flex items-center gap-2">
 
        {/* Profile pill */}
        <div
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2.5 cursor-pointer pl-1.5 pr-3 py-1.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition group"
        >
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt="Profile"
              className="w-8 h-8 rounded-lg object-cover border border-slate-200"
            />
          ) : (
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-sm font-bold">
              {user?.name?.charAt(0)?.toUpperCase() || <FaUserCircle />}
            </div>
          )}
 
          <div className="hidden md:block">
            <p className="text-xs font-semibold text-slate-700 leading-tight group-hover:text-blue-600 transition">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-slate-400 truncate max-w-36">
              {user?.email}
            </p>
          </div>
        </div>
 
        {/* Divider */}
        <div className="w-px h-6 bg-slate-200 mx-1 hidden md:block" />
 
        {/* Logout */}
        <button
          onClick={handleLogout}
          title="Logout"
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-500 transition text-xs font-medium"
        >
          <FaSignOutAlt size={13} />
          <span className="hidden md:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};
 
export default DashboardNavbar;