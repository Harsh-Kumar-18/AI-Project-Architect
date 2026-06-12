import React from "react";
import {
  FaReact, FaNodeJs, FaDocker, FaGitAlt, FaGithub,
  FaAws, FaDatabase, FaFire,
} from "react-icons/fa";
import {
  SiNextdotjs, SiJavascript, SiTypescript, SiTailwindcss,
  SiBootstrap, SiExpress, SiSocketdotio, SiJsonwebtokens,
  SiMongodb, SiPostgresql, SiMysql, SiVercel, SiNetlify,
  SiOpenai, SiGooglegemini,
} from "react-icons/si";
 
const techCategories = [
  {
    label: "Frontend",
    color: "bg-cyan-50 text-cyan-700 border-cyan-100",
    dot: "bg-cyan-400",
    techs: [
      { name: "React",        icon: FaReact,       color: "text-cyan-500" },
      { name: "Next.js",      icon: SiNextdotjs,   color: "text-slate-800" },
      { name: "JavaScript",   icon: SiJavascript,  color: "text-amber-400" },
      { name: "TypeScript",   icon: SiTypescript,  color: "text-blue-500" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-400" },
      { name: "Bootstrap",    icon: SiBootstrap,   color: "text-violet-500" },
    ],
  },
  {
    label: "Backend",
    color: "bg-green-50 text-green-700 border-green-100",
    dot: "bg-green-400",
    techs: [
      { name: "Node.js",    icon: FaNodeJs,       color: "text-green-500" },
      { name: "Express.js", icon: SiExpress,      color: "text-slate-700" },
      { name: "REST API",   icon: FaDatabase,     color: "text-orange-400" },
      { name: "Socket.IO",  icon: SiSocketdotio,  color: "text-slate-700" },
      { name: "JWT",        icon: SiJsonwebtokens,color: "text-rose-400" },
    ],
  },
  {
    label: "Databases",
    color: "bg-orange-50 text-orange-700 border-orange-100",
    dot: "bg-orange-400",
    techs: [
      { name: "MongoDB",    icon: SiMongodb,    color: "text-green-500" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-500" },
      { name: "MySQL",      icon: SiMysql,      color: "text-blue-400" },
      { name: "Firebase",   icon: FaFire,       color: "text-amber-500" },
    ],
  },
  {
    label: "DevOps & Deployment",
    color: "bg-violet-50 text-violet-700 border-violet-100",
    dot: "bg-violet-400",
    techs: [
      { name: "Docker",   icon: FaDocker,   color: "text-blue-500" },
      { name: "Git",      icon: FaGitAlt,   color: "text-orange-500" },
      { name: "GitHub",   icon: FaGithub,   color: "text-slate-700" },
      { name: "AWS",      icon: FaAws,      color: "text-amber-500" },
      { name: "Vercel",   icon: SiVercel,   color: "text-slate-800" },
      { name: "Netlify",  icon: SiNetlify,  color: "text-teal-500" },
    ],
  },
  {
    label: "AI & Automation",
    color: "bg-rose-50 text-rose-700 border-rose-100",
    dot: "bg-rose-400",
    techs: [
      { name: "OpenAI", icon: SiOpenai,        color: "text-slate-700" },
      { name: "Gemini", icon: SiGooglegemini,  color: "text-blue-500" },
    ],
  },
];
 
const TechStackSection = () => {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-6">
 
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-500">
            Technologies
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
            Supported Tech Stack
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            Build projects using modern and industry-standard technologies.
          </p>
        </div>
 
        {/* Categories */}
        <div className="space-y-8">
          {techCategories.map(({ label, color, dot, techs }) => (
            <div key={label}>
 
              {/* Category label */}
              <div className="flex items-center gap-2 mb-4">
                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${color}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
                  {label}
                </span>
                <div className="flex-1 h-px bg-slate-100" />
              </div>
 
              {/* Tech pills */}
              <div className="flex flex-wrap gap-3">
                {techs.map(({ name, icon: Icon, color: iconColor }) => (
                  <div
                    key={name}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default group"
                  >
                    <Icon className={`${iconColor} group-hover:scale-110 transition-transform`} size={16} />
                    <span className="text-sm font-medium text-slate-700">{name}</span>
                  </div>
                ))}
              </div>
 
            </div>
          ))}
        </div>
 
      </div>
    </section>
  );
};
 
export default TechStackSection;