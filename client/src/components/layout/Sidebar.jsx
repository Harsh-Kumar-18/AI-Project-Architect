import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome, FaFolderPlus, FaFolderOpen,
  FaUser, FaSignOutAlt, FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";

const Sidebar = ({ isOpen, onClose }) => {

  const navigate = useNavigate();

const handleLogout = () => {
  logout();
  navigate("/login");
};

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
      isActive
        ? "bg-blue-600 text-white shadow-sm"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/30 z-40 lg:hidden backdrop-blur-sm"
        />
      )}

      <aside
        className={`
          fixed lg:static top-0 left-0 z-50
          w-64 h-full shrink-0
          bg-white border-r border-slate-200
          flex flex-col
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >

        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-slate-100">
          <span className="text-base font-semibold text-blue-600 tracking-tight">
            AI Project Architect
          </span>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
            aria-label="Close sidebar"
          >
            <FaTimes size={13} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">

          <p className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Menu
          </p>

          <NavLink to="/dashboard" className={navLinkClass} onClick={onClose}>
            <FaHome size={14} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/generate" className={navLinkClass} onClick={onClose}>
            <FaFolderPlus size={14} />
            <span>Generate Project</span>
          </NavLink>

          <NavLink to="/saved-projects" className={navLinkClass} onClick={onClose}>
            <FaFolderOpen size={14} />
            <span>Saved Projects</span>
          </NavLink>

        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-slate-100 space-y-1">

          <NavLink to="/profile">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900
            hover:cursor-pointer transition-all duration-150">
            <FaUser size={13} />
            <span>Profile</span>
          </button>
          </NavLink>

          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600
          hover:cursor-pointer transition-all duration-150">
            <FaSignOutAlt size={13} />
            <span>Logout</span>
          </button>

        </div>
      </aside>
    </>
  );
};

export default Sidebar;