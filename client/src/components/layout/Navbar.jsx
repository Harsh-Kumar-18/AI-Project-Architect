import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import Button from "../common/Button";
import Logo from "../../assets/images/Logo.png";
import { getUser, logout, isLoggedIn } from "../../services/authService";
 
const Navbar = () => {
  const [user, setUser] = useState(getUser());
  const [loggedIn, setLoggedIn] = useState(isLoggedIn()); // ✅ state mein
  const navigate = useNavigate();
 
  useEffect(() => {
    const handleUpdate = () => {
      setUser(getUser());
      setLoggedIn(isLoggedIn()); // ✅ sync karo
    };
    window.addEventListener("userUpdated", handleUpdate);
 
    // ✅ dusre tab mein login/logout hone par bhi update ho
    window.addEventListener("storage", handleUpdate);
 
    return () => {
      window.removeEventListener("userUpdated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);
 
  const handleLogout = () => {
    logout();
    setLoggedIn(false); // ✅ turant update
    setUser(null);
    navigate("/login");
  };
 
  const handleHome = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
 
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
 
        {/* Logo */}
        <div className="flex items-center gap-2">
          <button onClick={handleHome}>
            <img
              src={Logo}
              alt="AI Project Architect"
              className="w-8 h-10 object-contain border-2 border-gray-300 rounded-lg cursor-pointer"
            />
          </button>
          <button
            onClick={handleHome}
            className="text-sm font-semibold text-slate-700 hidden sm:block hover:text-blue-600 transition"
          >
            AI Project Architect
          </button>
        </div>
 
        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={handleHome}
            className="text-sm text-slate-600 hover:text-blue-600 transition"
          >
            Home
          </button>
          <a
            href="#features"
            className="text-sm text-slate-600 hover:text-blue-600 transition"
          >
            Features
          </a>
        </div>
 
        {/* Right side */}
        {loggedIn ? (
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
              </div>
            </div>
 
            {/* Divider */}
            <div className="w-px h-6 bg-slate-200 mx-1 hidden md:block" />
 
            {/* Dashboard shortcut */}
            <button
              onClick={() => navigate("/dashboard")}
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition text-xs font-medium"
            >
              Dashboard
            </button>
 
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
        ) : (
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/signup">
              <Button variant="primary">Signup</Button>
            </Link>
          </div>
        )}
 
      </div>
    </nav>
  );
};
 
export default Navbar;