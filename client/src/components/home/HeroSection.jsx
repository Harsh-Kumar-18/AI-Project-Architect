import React from "react";
import { Link } from "react-router-dom";
import {
  FaRobot,
  FaCheckCircle,
  FaArrowRight,
  FaCode,
  FaLayerGroup,
  FaRocket,
} from "react-icons/fa";
import Button from "../common/Button";
 
const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
 
      {/* Background grid decoration */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(to right, #3b82f6 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
 
      {/* Glow blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-blue-100 rounded-full blur-3xl opacity-40 z-0" />
 
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
 
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold mb-6">
          <FaRobot size={11} />
          AI-Powered Project Planning
        </div>
 
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900 tracking-tight">
          Generate Complete{" "}
          <span className="relative inline-block">
            <span className="text-blue-600">Software Architecture</span>
            <svg
              className="absolute -bottom-1 left-0 w-full"
              viewBox="0 0 300 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 5.5 C75 1, 150 8, 300 3"
                stroke="#3b82f6"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.4"
              />
            </svg>
          </span>{" "}
          Using AI
        </h1>
 
        {/* Subtext */}
        <p className="mt-6 text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Get tech stack recommendations, folder structures, database design,
          development roadmap, API architecture and deployment strategy —
          all in seconds.
        </p>
 
        {/* CTA buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/signup">
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-sm transition cursor-pointer">
              Get Started Free
              <FaArrowRight size={11} />
            </button>
          </Link>
 
          <button
  onClick={() => {
    document
      .getElementById("demo")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  }}
  className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-sm font-semibold rounded-xl cursor-pointer shadow-sm transition"
>
  View Demo
</button>
        </div>
 
        {/* Trust chips */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs text-slate-500">
          {[
            { icon: FaCheckCircle, label: "AI Architecture" },
            { icon: FaCheckCircle, label: "Tech Stack Generator" },
            { icon: FaCheckCircle, label: "Development Roadmap" },
          ].map(({ icon: Icon, label }) => (
            <span key={label} className="flex items-center gap-1.5">
              <Icon className="text-green-500" size={12} />
              {label}
            </span>
          ))}
        </div>
 
        {/* Feature cards row */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          {[
            {
              icon: FaCode,
              color: "bg-blue-50 text-blue-600",
              title: "Tech Stack",
              desc: "AI picks the best stack based on your project requirements.",
            },
            {
              icon: FaLayerGroup,
              color: "bg-violet-50 text-violet-600",
              title: "Folder Structure",
              desc: "Production-ready folder architecture generated instantly.",
            },
            {
              icon: FaRocket,
              color: "bg-emerald-50 text-emerald-600",
              title: "Roadmap",
              desc: "Step-by-step development plan from idea to deployment.",
            },
          ].map(({ icon: Icon, color, title, desc }) => (
            <div
              key={title}
              className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
            >
              <div className={`w-9 h-9 rounded-xl ${color} flex items-center justify-center mb-3`}>
                <Icon size={15} />
              </div>
              <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
 
      </div>
    </section>
  );
};
 
export default HeroSection;