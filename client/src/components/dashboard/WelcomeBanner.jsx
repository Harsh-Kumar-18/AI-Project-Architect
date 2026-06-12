import React from "react";
import { FaRocket, FaCode } from "react-icons/fa";
 
const WelcomeBanner = ({ name }) => {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";
 
  const emoji = hour < 12 ? "☀️" : hour < 18 ? "👋" : "🌙";
 
  return (
    <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-slate-800 via-slate-700 to-blue-900 text-white p-7 md:p-9 shadow-md">
      {/* Decorative code icon */}
      <div className="absolute -right-6 -top-4 opacity-[0.06]">
        <FaCode className="text-[200px]" />
      </div>
 
      <div className="relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-medium mb-4 border border-white/10">
          <FaRocket size={10} />
          AI Powered Workspace
        </div>
 
        {/* Greeting */}
        <h1 className="text-2xl md:text-3xl font-bold leading-tight">
          {greeting}, {name} {emoji}
        </h1>
 
        <p className="mt-2 text-slate-300 max-w-xl text-sm leading-relaxed">
          Generate complete project blueprints — tech stack, folder structure,
          roadmap, and starter code, all in seconds.
        </p>
 
        {/* Pills */}
        <div className="flex flex-wrap gap-2 mt-5">
          {["🚀 Project Generation", "📂 Saved Architectures", "🤖 AI Assistance"].map(
            (tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-medium"
              >
                {tag}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
};
 
export default WelcomeBanner;