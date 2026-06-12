import React from "react";
import { FaLightbulb, FaBrain, FaRocket } from "react-icons/fa";
 
const steps = [
  {
    step: "01",
    icon: FaLightbulb,
    color: "bg-amber-50 text-amber-500",
    ring: "ring-amber-100",
    title: "Describe Your Idea",
    description:
      `Type a simple prompt like ${"Build a Netflix Clone"} — no technical knowledge needed.`,
  },
  {
    step: "02",
    icon: FaBrain,
    color: "bg-blue-50 text-blue-500",
    ring: "ring-blue-100",
    title: "AI Analyzes Requirements",
    description:
      "The AI understands your project scope and identifies the best technologies and patterns.",
  },
  {
    step: "03",
    icon: FaRocket,
    color: "bg-emerald-50 text-emerald-500",
    ring: "ring-emerald-100",
    title: "Get Complete Architecture",
    description:
      "Receive a full blueprint — tech stack, roadmap, folder structure, and starter code.",
  },
];
 
const HowItWorksSection = () => {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-6">
 
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-500">
            How It Works
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
            Three Steps to Your Blueprint
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            Generate a complete project architecture in seconds — no setup required.
          </p>
        </div>
 
        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
 
          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-px bg-linear-to-r from-amber-200 via-blue-200 to-emerald-200 z-0" />
 
          {steps.map(({ step, icon: Icon, color, ring, title, description }) => (
            <div
              key={step}
              className="relative z-10 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 text-center group"
            >
              {/* Step number */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-400 text-xs font-bold tracking-widest">
                  {step}
                </span>
              </div>
 
              {/* Icon */}
              <div className={`w-16 h-16 mx-auto mt-4 rounded-2xl ${color} ring-4 ${ring} flex items-center justify-center mb-5`}>
                <Icon size={22} />
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
 
export default HowItWorksSection;