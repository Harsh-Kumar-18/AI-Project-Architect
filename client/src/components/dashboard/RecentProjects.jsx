import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import { getProjects } from "../../services/projectService";
 
const RecentProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        const projectsData = Array.isArray(data) ? data : data.projects || [];
        const recent = projectsData
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 6);
        setProjects(recent);
      } catch (error) {
        console.error(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);
 
  const getTechStack = (generatedOutput) => {
    const stack = generatedOutput?.techStack;
    if (!stack) return [];
    return Object.values(stack).flat().slice(0, 5);
  };
 
  return (
    <section>
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Recent
          </p>
          <h2 className="text-lg font-bold text-slate-800 mt-0.5">Projects</h2>
        </div>
 
        <Link
          to="/saved-projects"
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition"
        >
          View All →
        </Link>
      </div>
 
      {/* Loading skeleton */}
      {loading && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 animate-pulse">
              <div className="h-4 bg-slate-100 rounded w-2/3" />
              <div className="h-3 bg-slate-100 rounded w-full" />
              <div className="h-3 bg-slate-100 rounded w-4/5" />
              <div className="flex gap-2 mt-2">
                <div className="h-5 w-14 bg-slate-100 rounded-full" />
                <div className="h-5 w-14 bg-slate-100 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      )}
 
      {/* Empty state */}
      {!loading && projects.length === 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
          <p className="text-slate-400 text-sm">No projects yet.</p>
          <Link
            to="/generate"
            className="inline-block mt-3 text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
          >
            Generate your first one →
          </Link>
        </div>
      )}
 
      {/* Grid */}
      {!loading && projects.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              id={project._id}
              title={project.title}
              description={project.prompt}
              techStack={getTechStack(project.generatedOutput)}
              date={new Date(project.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            />
          ))}
        </div>
      )}
    </section>
  );
};
 
export default RecentProjects;