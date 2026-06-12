import React from "react";
import { FaCheckCircle, FaRoute, FaCalendarAlt } from "react-icons/fa";

const RoadmapTimeline = ({ roadmap = [] }) => {
  if (!roadmap?.length) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <p className="text-gray-400">No roadmap available.</p>
      </div>
    );
  }

  const totalTasks = roadmap.reduce((sum, step) => sum + (step.tasks?.length || 0), 0);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 lg:p-8 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-sm">
            <FaRoute className="text-white" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Development Roadmap
            </h2>
            <p className="text-sm text-gray-500">
              {roadmap.length} phases · {totalTasks} tasks
            </p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-2">
        {roadmap.map((step, index) => (
          <div key={index} className="relative flex gap-5">
            {/* Timeline rail */}
            <div className="flex flex-col items-center">
              <div
                className="
                  w-10 h-10 shrink-0 rounded-full
                  bg-linear-to-br from-blue-600 to-indigo-600
                  text-white
                  flex items-center justify-center
                  font-bold text-sm
                  shadow-sm
                "
              >
                {index + 1}
              </div>

              {index !== roadmap.length - 1 && (
                <div className="w-0.5 flex-1 bg-linear-to-b from-blue-200 to-indigo-100 mt-2 min-h-6" />
              )}
            </div>

            {/* Content card */}
            <div className="flex-1 pb-8">
              <div
                className="
                  border border-gray-200 rounded-2xl p-5
                  hover:border-blue-200 hover:shadow-md
                  transition-all duration-200
                "
              >
                <div className="flex items-center gap-3 flex-wrap mb-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {step.phase}
                  </h3>

                  {step.duration && (
                    <span
                      className="
                        inline-flex items-center gap-1.5
                        px-3 py-1 text-xs font-medium
                        rounded-full bg-blue-50 text-blue-700
                      "
                    >
                      <FaCalendarAlt size={10} />
                      {step.duration}
                    </span>
                  )}
                </div>

                {/* Tasks */}
                {step.tasks?.length > 0 && (
                  <div className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                    {step.tasks.map((task, taskIndex) => (
                      <div key={taskIndex} className="flex items-start gap-2">
                        <FaCheckCircle className="text-green-500 mt-1 shrink-0" size={13} />
                        <span className="text-sm text-gray-600 leading-relaxed">
                          {task}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapTimeline;