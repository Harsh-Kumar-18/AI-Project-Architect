import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRobot, FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import Logo from "../../assets/images/Logo.png"
 
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
 
  const handleHome = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
 
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
 
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
  <img
    src={Logo}
    alt="Logo"
    className="w-full h-full object-contain"
  />
</div>
              <span className="text-sm font-bold text-white">
                AI Project Architect
              </span>
            </div>
 
            <p className="text-slate-400 text-xs leading-relaxed max-w-xs">
              Generate complete project blueprints, tech stacks, folder
              structures and roadmaps using AI — in seconds.
            </p>
 
            <div className="flex items-center gap-3 mt-5">
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition">
                <FaGithub size={14} className="text-slate-400" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition">
                <FaLinkedin size={14} className="text-slate-400" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition">
                <FaGlobe size={14} className="text-slate-400" />
              </a>
            </div>
          </div>
 
          {/* Quick Links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
              Quick Links
            </p>
            <ul className="space-y-2.5">
              {[
                { label: "Home", action: handleHome },
                { label: "Features", href: "#features" },
                { label: "Login", to: "/login" },
                { label: "Signup", to: "/signup" },
              ].map(({ label, action, href, to }) => (
                <li key={label}>
                  {action ? (
                    <button
                      onClick={action}
                      className="text-xs text-slate-400 hover:text-white transition"
                    >
                      {label}
                    </button>
                  ) : href ? (
                    <a href={href} className="text-xs text-slate-400 hover:text-white transition">
                      {label}
                    </a>
                  ) : (
                    <Link to={to} className="text-xs text-slate-400 hover:text-white transition">
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
 
          {/* Features */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
              Features
            </p>
            <ul className="space-y-2.5">
              {[
                "AI Project Blueprint",
                "Tech Stack Suggestions",
                "Folder Structure Generator",
                "Development Roadmap",
                "Project Saving",
              ].map((item) => (
                <li key={item} className="text-xs text-slate-400 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-blue-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
 
        </div>
 
        {/* Divider */}
        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-slate-500">
            © {currentYear} AI Project Architect. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            Built with React, Tailwind CSS & AI
          </p>
        </div>
 
      </div>
    </footer>
  );
};
 
export default Footer;