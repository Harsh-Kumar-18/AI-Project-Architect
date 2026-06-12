import React, { useState, useEffect } from "react";
import {
  FaReact, FaNodeJs, FaDatabase, FaShieldAlt,
  FaCloud, FaTerminal, FaLayerGroup, FaPlug,
} from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

const stack = [
  { icon: FaReact,     color: "text-cyan-500",   bg: "bg-cyan-50",   label: "Frontend",   value: "React + Tailwind CSS" },
  { icon: FaNodeJs,    color: "text-green-500",  bg: "bg-green-50",  label: "Backend",    value: "Node.js + Express.js" },
  { icon: FaDatabase,  color: "text-orange-500", bg: "bg-orange-50", label: "Database",   value: "MongoDB" },
  { icon: FaShieldAlt, color: "text-blue-500",   bg: "bg-blue-50",   label: "Auth",       value: "JWT + Bcrypt" },
  { icon: FaCloud,     color: "text-violet-500", bg: "bg-violet-50", label: "Deployment", value: "Vercel + Render" },
];

const features = [
  "User & restaurant registration with OTP verification",
  "Real-time order tracking with live map updates",
  "Multiple payment gateway integration (Stripe, Razorpay)",
  "Restaurant dashboard for menu & order management",
  "Rating and review system for restaurants",
  "Push notifications for order status updates",
];

const roadmap = [
  "Setup project structure & auth",
  "Build restaurant & menu APIs",
  "Integrate payment gateway",
  "Real-time order tracking",
  "Deploy & go live",
];

const layers = [
  { name: "Client Layer", items: ["React", "Redux", "Tailwind CSS"] },
  { name: "API Gateway", items: ["Express.js", "JWT Middleware"] },
  { name: "Service Layer", items: ["Node.js", "Business Logic"] },
  { name: "Data Layer", items: ["MongoDB", "Redis Cache"] },
];

const collections = [
  { name: "users", fields: ["_id", "name", "email", "role"] },
  { name: "restaurants", fields: ["_id", "name", "location", "menu[]"] },
  { name: "orders", fields: ["_id", "userId", "items[]", "status", "total"] },
];

const METHOD_COLORS = {
  GET: "text-green-600 bg-green-50",
  POST: "text-blue-600 bg-blue-50",
  PATCH: "text-purple-600 bg-purple-50",
};

const endpoints = [
  { method: "POST", path: "/api/auth/login", desc: "Authenticate user & return JWT" },
  { method: "GET", path: "/api/restaurants", desc: "List nearby restaurants" },
  { method: "POST", path: "/api/orders", desc: "Place a new order" },
  { method: "PATCH", path: "/api/orders/:id/status", desc: "Update live order status" },
];

const folderLines = [
  { indent: 0, text: "📁 food-delivery-app" },
  { indent: 1, text: "📁 frontend" },
  { indent: 2, text: "📁 src/components" },
  { indent: 2, text: "📁 src/pages" },
  { indent: 1, text: "📁 backend" },
  { indent: 2, text: "📁 routes" },
  { indent: 2, text: "📁 models" },
  { indent: 2, text: "📁 controllers" },
];

// Each tab maps to a list whose length drives the stagger animation
const TABS = [
  { label: "Features", items: features },
  { label: "Tech Stack", items: stack },
  { label: "Architecture", items: layers },
  { label: "Database", items: collections },
  { label: "API", items: endpoints },
  { label: "Roadmap", items: roadmap },
  { label: "Folder Structure", items: folderLines },
];

const ExampleOutputSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [visible, setVisible] = useState([]);
  const [typed, setTyped] = useState("");
  const prompt = "Build a Food Delivery App like Zomato";

  // Typewriter effect
  useEffect(() => {
    setTyped("");
    let i = 0;
    const t = setInterval(() => {
      setTyped(prompt.slice(0, i + 1));
      i++;
      if (i >= prompt.length) clearInterval(t);
    }, 40);
    return () => clearInterval(t);
  }, []);

  // Stagger animation on tab change — generalized for all tabs
  useEffect(() => {
    setVisible([]);
    const items = TABS[activeTab].items;

    items.forEach((_, i) => {
      setTimeout(() => setVisible((p) => [...p, i]), i * 90);
    });
  }, [activeTab]);

  const isVisible = (i) => visible.includes(i);

  return (
    <section id="demo" className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-500">
            Live Demo
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-slate-900">
            See What AI Generates
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            Type a simple idea — get a complete project blueprint in seconds.
          </p>
        </div>

        {/* Demo card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">

          {/* Window chrome */}
          <div className="flex items-center gap-1.5 px-4 py-3 bg-slate-800 border-b border-slate-700">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-amber-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
            <span className="ml-3 text-xs text-slate-400 font-mono">AI Project Architect</span>
          </div>

          <div className="p-6 space-y-5">

            {/* Prompt input simulation */}
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
              <FaTerminal className="text-blue-500 shrink-0" size={13} />
              <p className="text-sm text-slate-700 font-mono flex-1">
                {typed}
                <span className="inline-block w-0.5 h-4 bg-blue-500 ml-0.5 animate-pulse align-middle" />
              </p>
              <span className="text-xs text-white bg-blue-600 px-3 py-1 rounded-lg font-medium shrink-0">
                Generate
              </span>
            </div>

            {/* Project title */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-blue-500">
                    Example Project
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                  Food Delivery App
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  A modern food ordering and delivery platform
                </p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 flex-wrap bg-slate-100 p-1 rounded-xl">
              {TABS.map((tab, i) => (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(i)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === i
                      ? "bg-white text-slate-800 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="min-h-52">

              {/* Features */}
              {activeTab === 0 && (
                <div className="space-y-2.5">
                  {features.map((feature, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-3 transition-all duration-300 ${
                        isVisible(i) ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                      }`}
                    >
                      <div className="w-5 h-5 mt-0.5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <FaCheck size={9} />
                      </div>
                      <p className="text-sm text-slate-700">{feature}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Tech Stack */}
              {activeTab === 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {stack.map(({ icon: Icon, color, bg, label, value }, i) => (
                    <div
                      key={label}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 transition-all duration-300 ${
                        isVisible(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
                        <Icon className={color} size={16} />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">{label}</p>
                        <p className="text-sm font-semibold text-slate-800">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Architecture */}
              {activeTab === 2 && (
                <div className="space-y-2">
                  {layers.map((layer, i) => (
                    <div key={layer.name}>
                      <div
                        className={`flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 transition-all duration-300 ${
                          isVisible(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                        }`}
                      >
                        <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                          <FaLayerGroup size={14} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-slate-800">{layer.name}</p>
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            {layer.items.map((item) => (
                              <span key={item} className="px-2 py-0.5 bg-slate-50 border border-slate-100 rounded-md text-[11px] text-slate-500">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {i !== layers.length - 1 && (
                        <div className="flex justify-center py-0.5">
                          <div className="w-0.5 h-3 bg-indigo-100" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Database */}
              {activeTab === 3 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {collections.map((col, i) => (
                    <div
                      key={col.name}
                      className={`p-3.5 rounded-xl border border-slate-100 transition-all duration-300 ${
                        isVisible(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <FaDatabase className="text-blue-500" size={12} />
                        <p className="text-sm font-semibold text-slate-800">{col.name}</p>
                      </div>
                      <div className="space-y-1">
                        {col.fields.map((field) => (
                          <p key={field} className="text-[11px] font-mono text-slate-500">
                            {field}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* API */}
              {activeTab === 4 && (
                <div className="space-y-2">
                  {endpoints.map((ep, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 p-3 rounded-xl border border-slate-100 transition-all duration-300 ${
                        isVisible(i) ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                      }`}
                    >
                      <span className={`px-2 py-1 rounded-md text-[11px] font-bold font-mono shrink-0 ${METHOD_COLORS[ep.method]}`}>
                        {ep.method}
                      </span>
                      <span className="text-sm font-mono text-slate-700 shrink-0">{ep.path}</span>
                      <span className="text-xs text-slate-400 truncate">{ep.desc}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Roadmap */}
              {activeTab === 5 && (
                <div className="space-y-2.5">
                  {roadmap.map((step, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 transition-all duration-300 ${
                        isVisible(i) ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                      }`}
                    >
                      <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                        {isVisible(i) ? <FaCheck size={9} /> : i + 1}
                      </div>
                      <div className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5">
                        <p className="text-sm text-slate-700 font-medium">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Folder Structure */}
              {activeTab === 6 && (
                <div className="bg-slate-900 rounded-xl p-4 font-mono text-xs space-y-1.5">
                  {folderLines.map(({ indent, text }, i) => (
                    <div
                      key={i}
                      className={`transition-all duration-200 ${
                        isVisible(i) ? "opacity-100" : "opacity-0"
                      }`}
                      style={{ paddingLeft: `${indent * 16}px` }}
                    >
                      <span className="text-slate-300">{text}</span>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ExampleOutputSection;