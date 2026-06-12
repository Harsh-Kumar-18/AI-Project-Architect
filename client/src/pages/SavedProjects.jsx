import React, { useState, useEffect } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import SearchBar from "../components/dashboard/SearchBar";
import ProjectCard from "../components/dashboard/ProjectCard";
import EmptyState from "../components/ai/EmptyState";
import { getProjects, deleteProject } from "../services/projectService";
import { FaLayerGroup } from "react-icons/fa";
 
const SavedProjects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");
 
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data.projects);
      } catch (error) {
        console.error(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);
 
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };
 
  const filteredProjects = projects
    .filter((project) =>
      (project.title || "").toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === "az") return (a.title || "").localeCompare(b.title || "");
      if (sortBy === "za") return (b.title || "").localeCompare(a.title || "");
      return 0;
    });
 
  const getTechStack = (generatedOutput) => {
    const stack = generatedOutput?.techStack;
    if (!stack) return [];
    return Object.values(stack).flat().slice(0, 5);
  };
 
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6 pb-10">
 
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-500">
                My Library
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Saved Projects</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              All your AI-generated project architectures in one place.
            </p>
          </div>
 
          {/* Count badge */}
          {!loading && projects.length > 0 && (
            <div className="hidden sm:flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-600 px-4 py-2 rounded-xl text-sm font-semibold">
              <FaLayerGroup size={13} />
              {projects.length} {projects.length === 1 ? "Project" : "Projects"}
            </div>
          )}
        </div>
 
        {/* Search + Sort */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <SearchBar
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
 
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="az">A → Z</option>
            <option value="za">Z → A</option>
          </select>
        </div>
 
        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 animate-pulse">
                <div className="h-4 bg-slate-100 rounded w-2/3" />
                <div className="h-3 bg-slate-100 rounded w-full" />
                <div className="h-3 bg-slate-100 rounded w-4/5" />
                <div className="flex gap-2 mt-2">
                  <div className="h-5 w-14 bg-slate-100 rounded-full" />
                  <div className="h-5 w-14 bg-slate-100 rounded-full" />
                  <div className="h-5 w-14 bg-slate-100 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        )}
 
        {/* Projects Grid */}
        {!loading && filteredProjects.length > 0 && (
          <>
            {/* Search result count */}
            {searchTerm && (
              <p className="text-xs text-slate-400">
                {filteredProjects.length} result{filteredProjects.length !== 1 ? "s" : ""} for{" "}
                <span className="text-slate-600 font-medium">"{searchTerm}"</span>
              </p>
            )}
 
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredProjects.map((project) => (
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
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </>
        )}
 
        {/* Empty State */}
        {!loading && filteredProjects.length === 0 && (
          <EmptyState
            title="No Saved Projects"
            description="Generate and save your first AI project architecture."
            buttonText="Generate Project"
            buttonLink="/generate"
          />
        )}
 
      </div>
    </DashboardLayout>
  );
};
 
export default SavedProjects;