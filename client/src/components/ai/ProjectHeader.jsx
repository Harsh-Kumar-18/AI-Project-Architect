import React from "react";
import {
  FaLayerGroup,
  FaChartLine,
  FaClock,
  FaRobot,
  FaCheckCircle,
  FaPlug,
  FaDatabase,
  FaRoute,
} from "react-icons/fa";

const InfoCard = ({ icon: Icon, label, value, color, bg }) => (
  <div className="bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-md transition-shadow">
    <div className="flex items-center gap-2 mb-2">
      <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center`}>
        <Icon className={`${color} text-sm`} />
      </div>
      <span className="text-sm text-gray-500 font-medium">{label}</span>
    </div>

    <p className="font-semibold text-gray-900 text-lg">{value || "N/A"}</p>
  </div>
);

const StatPill = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700">
    <Icon className="text-gray-400" />
    <span>{label}:</span>
    <span className="font-bold text-gray-900">{value}</span>
  </div>
);

// Maps difficulty levels to distinct colors
const DIFFICULTY_STYLES = {
  Beginner: "text-green-600",
  Intermediate: "text-blue-600",
  Advanced: "text-orange-500",
  Enterprise: "text-red-600",
};

const ProjectHeader = ({ projectData }) => {
  const difficultyColor =
    DIFFICULTY_STYLES[projectData?.difficulty] || "text-orange-500";

  return (
    <section className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-50 via-white to-indigo-50" />

      <div className="relative p-8 lg:p-10">
        {/* Top row: badge + project type tag */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
            <FaRobot />
            AI Generated Architecture
          </div>

          {projectData?.projectType && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-700 text-sm font-semibold">
              {projectData.projectType}
            </div>
          )}
        </div>

        {/* Title */}
        <h1 className="mt-5 text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
          {projectData?.title}
        </h1>

        {/* Overview */}
        <p className="mt-5 text-gray-600 text-lg leading-relaxed max-w-4xl">
          {projectData?.overview}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          <InfoCard
            icon={FaLayerGroup}
            label="Project Type"
            value={projectData?.projectType}
            color="text-blue-600"
            bg="bg-blue-50"
          />

          <InfoCard
            icon={FaChartLine}
            label="Difficulty"
            value={projectData?.difficulty}
            color={difficultyColor}
            bg="bg-orange-50"
          />

          <InfoCard
            icon={FaClock}
            label="Estimated Duration"
            value={projectData?.estimatedDuration}
            color="text-green-600"
            bg="bg-green-50"
          />
        </div>

        {/* Extra Stats */}
        <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-100">
          <StatPill
            icon={FaCheckCircle}
            label="Features"
            value={projectData?.features?.length || 0}
          />

          <StatPill
            icon={FaPlug}
            label="APIs"
            value={projectData?.apiEndpoints?.length || 0}
          />

          <StatPill
            icon={FaDatabase}
            label="Collections"
            value={projectData?.databaseSchema?.length || 0}
          />

          <StatPill
            icon={FaRoute}
            label="Roadmap Phases"
            value={projectData?.developmentRoadmap?.length || 0}
          />
        </div>
      </div>
    </section>
  );
};

export default ProjectHeader;