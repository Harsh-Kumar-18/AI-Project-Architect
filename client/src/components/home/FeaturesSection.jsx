import React from "react";
import SectionTitle from "../common/SectionTitle";
import {
  FaBrain,
  FaCode,
  FaFolderTree,
  FaServer,
  FaDatabase,
  FaRoad,
} from "react-icons/fa6";
 
const features = [
  {
    icon: FaBrain,
    color: "bg-blue-50 text-blue-600",
    border: "hover:border-blue-200",
    title: "AI Project Blueprint",
    description:
      "Complete project planning, architecture decisions and implementation guidance generated instantly.",
  },
  {
    icon: FaCode,
    color: "bg-violet-50 text-violet-600",
    border: "hover:border-violet-200",
    title: "Tech Stack Generator",
    description:
      "Frontend, backend, database and deployment recommendations tailored to your project.",
  },
  {
    icon: FaFolderTree,
    color: "bg-emerald-50 text-emerald-600",
    border: "hover:border-emerald-200",
    title: "Folder Structure",
    description:
      "Scalable, production-ready project structures used in real-world applications.",
  },
  {
    icon: FaServer,
    color: "bg-orange-50 text-orange-600",
    border: "hover:border-orange-200",
    title: "API Design",
    description:
      "Endpoint recommendations, request flows and backend architecture suggestions.",
  },
  {
    icon: FaDatabase,
    color: "bg-rose-50 text-rose-600",
    border: "hover:border-rose-200",
    title: "Database Design",
    description:
      "Collections, tables, relationships and data modeling recommendations.",
  },
  {
    icon: FaRoad,
    color: "bg-cyan-50 text-cyan-600",
    border: "hover:border-cyan-200",
    title: "Development Roadmap",
    description:
      "Step-by-step execution plan from idea validation to deployment.",
  },
];
 
const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
 
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-500">
            Features
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
            Everything You Need To Start Building
          </h2>
          <p className="mt-4 text-slate-500 text-sm md:text-base leading-relaxed">
            From idea to implementation — AI Project Architect provides everything
            required to plan and build modern software projects.
          </p>
        </div>
 
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, color, border, title, description }) => (
            <div
              key={title}
              className={`bg-white rounded-2xl border border-slate-200 ${border} p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 group`}
            >
              {/* Icon */}
              <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-4`}>
                <Icon size={17} />
              </div>
 
              {/* Text */}
              <h3 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition">
                {title}
              </h3>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
 
      </div>
    </section>
  );
};
 
export default FeaturesSection;