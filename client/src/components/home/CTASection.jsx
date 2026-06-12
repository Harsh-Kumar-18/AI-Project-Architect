import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaRocket } from "react-icons/fa";
 
const CTASection = () => {
  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-slate-800 via-slate-700 to-blue-900 px-8 py-14 md:px-16 text-center shadow-xl">
 
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-10 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500 rounded-full blur-3xl opacity-10 translate-y-1/2 -translate-x-1/2" />
 
          <div className="relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/80 text-xs font-medium mb-5">
              <FaRocket size={10} />
              Free to Get Started
            </div>
 
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
              Ready To Build Your Next Project?
            </h2>
 
            <p className="mt-4 text-slate-300 text-sm max-w-lg mx-auto leading-relaxed">
              Generate complete project blueprints, tech stacks, roadmaps and
              folder structures in seconds — no setup required.
            </p>
 
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/signup">
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-800 hover:bg-slate-100 text-sm font-bold rounded-xl shadow transition">
                  Generate Project Now
                  <FaArrowRight size={11} />
                </button>
              </Link>
 
              <Link to="/login">
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 text-white text-sm font-semibold rounded-xl transition">
                  Login to Dashboard
                </button>
              </Link>
            </div>
          </div>
 
        </div>
      </div>
    </section>
  );
};
 
export default CTASection;