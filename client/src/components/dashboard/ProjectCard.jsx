import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaTrash } from "react-icons/fa";

const ProjectCard = ({ id, title, description, techStack, date, onDelete }) => {
  const handleDelete = (e) => {
    e.preventDefault(); // prevent Link navigation
    onDelete(id);
  };

  return (
    <Link
      to={`/projects/${id}`}
      className="group flex flex-col bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md hover:border-slate-300 transition-all duration-200 no-underline"
    >

      {/* Title */}
      <h3 className="text-sm font-semibold text-slate-800 leading-snug line-clamp-2">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="mt-2 text-xs text-slate-500 leading-relaxed line-clamp-3 flex-1">
          {description}
        </p>
      )}

      {/* Tech Stack */}
      {techStack?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-md border border-slate-200"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Date */}
          {date && (
            <span className="text-xs text-slate-400">{date}</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Delete button */}
          {onDelete && (
            <button
              onClick={handleDelete}
              className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center hover:bg-red-100 transition-all duration-200"
            >
              <FaTrash size={9} className="text-slate-400 hover:text-red-500 transition-colors duration-200" />
            </button>
          )}

          {/* Arrow */}
          <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-blue-600 transition-all duration-200">
            <FaArrowRight size={9} className="text-slate-500 group-hover:text-white transition-colors duration-200" />
          </span>
        </div>
      </div>

    </Link>
  );
};

export default ProjectCard;
