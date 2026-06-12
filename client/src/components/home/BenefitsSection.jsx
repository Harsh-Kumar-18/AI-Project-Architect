import React from "react";
import { FaClock, FaBuilding, FaRocket, FaGraduationCap } from "react-icons/fa";
 
const benefits = [
  {
    icon: FaClock,
    color: "bg-amber-50 text-amber-500",
    ring: "group-hover:ring-amber-200",
    title: "Save Time",
    description: "Skip hours of planning. Get a complete architecture in seconds.",
  },
  {
    icon: FaBuilding,
    color: "bg-blue-50 text-blue-500",
    ring: "group-hover:ring-blue-200",
    title: "Better Architecture",
    description: "Industry-level structure and design patterns baked in.",
  },
  {
    icon: FaRocket,
    color: "bg-emerald-50 text-emerald-500",
    ring: "group-hover:ring-emerald-200",
    title: "Faster Development",
    description: "Start coding immediately with a clear folder structure.",
  },
  {
    icon: FaGraduationCap,
    color: "bg-violet-50 text-violet-500",
    ring: "group-hover:ring-violet-200",
    title: "Beginner Friendly",
    description: "Step-by-step roadmap included — perfect for learners.",
  },
];
 
const BenefitsSection = () => {
  return (
    <section className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-5xl mx-auto px-6">
 
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-500">
            Why Us
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
            Why Use AI Project Architect?
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            Build smarter, faster, and with confidence.
          </p>
        </div>
 
        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map(({ icon: Icon, color, ring, title, description }) => (
            <div
              key={title}
              className={`group bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 text-center`}
            >
              <div className={`w-12 h-12 mx-auto rounded-2xl ${color} ring-4 ring-transparent ${ring} flex items-center justify-center mb-4 transition-all duration-200`}>
                <Icon size={18} />
              </div>
              <h3 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition">
                {title}
              </h3>
              <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
 
      </div>
    </section>
  );
};
 
export default BenefitsSection;