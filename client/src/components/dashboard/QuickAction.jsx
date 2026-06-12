import React from "react";
import { Link } from "react-router-dom";
import { FaRocket, FaFolderOpen, FaArrowRight } from "react-icons/fa";
 
const actions = [
  {
    to: "/generate",
    icon: FaRocket,
    iconBg: "bg-blue-600",
    cardBg: "bg-blue-50 border-blue-100 hover:bg-blue-100/70",
    title: "Generate Project",
    desc: "Create a new AI-powered project architecture",
  },
  {
    to: "/saved-projects",
    icon: FaFolderOpen,
    iconBg: "bg-slate-700",
    cardBg: "bg-slate-50 border-slate-200 hover:bg-slate-100/70",
    title: "Saved Projects",
    desc: "Browse and manage your generated projects",
  },
];
 
const QuickActions = () => (
  <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
    <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
      Quick Actions
    </p>
 
    <div className="space-y-3">
      {actions.map(({ to, icon: Icon, iconBg, cardBg, title, desc }) => (
        <Link
          key={to}
          to={to}
          className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 group ${cardBg}`}
        >
          <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}>
            <Icon className="text-white" size={14} />
          </div>
 
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
            <p className="text-xs text-slate-500 mt-0.5 truncate">{desc}</p>
          </div>
 
          <FaArrowRight
            size={11}
            className="text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all shrink-0"
          />
        </Link>
      ))}
    </div>
  </section>
);
 
export default QuickActions;