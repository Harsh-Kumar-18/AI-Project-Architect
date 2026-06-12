import React from "react";
import { FaRocket, FaArrowUp, FaArrowRight, FaArrowDown, FaLightbulb } from "react-icons/fa";

const PRIORITY_STYLES = {
  High: { color: "text-red-600 bg-red-50", border: "border-l-red-400", icon: <FaArrowUp size={11} /> },
  Medium: { color: "text-amber-600 bg-amber-50", border: "border-l-amber-400", icon: <FaArrowRight size={11} /> },
  Low: { color: "text-green-600 bg-green-50", border: "border-l-green-400", icon: <FaArrowDown size={11} /> },
};

const PRIORITY_ORDER = { High: 0, Medium: 1, Low: 2 };

const FutureEnhancements = ({ enhancements = [] }) => {
  if (!enhancements.length) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <p className="text-gray-400">No future enhancements available.</p>
      </div>
    );
  }

  // Sort so High priority items appear first
  const sorted = [...enhancements].sort(
    (a, b) => (PRIORITY_ORDER[a.priority] ?? 1) - (PRIORITY_ORDER[b.priority] ?? 1)
  );

  const counts = enhancements.reduce((acc, item) => {
    acc[item.priority] = (acc[item.priority] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 lg:p-8 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-sm">
              <FaLightbulb className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Future Enhancements</h2>
              <p className="text-sm text-gray-500">Ideas to extend this project after launch</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {["High", "Medium", "Low"].map(
              (level) =>
                counts[level] > 0 && (
                  <span
                    key={level}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${PRIORITY_STYLES[level].color}`}
                  >
                    {level} · {counts[level]}
                  </span>
                )
            )}
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sorted.map((item, idx) => {
          const priority = PRIORITY_STYLES[item.priority] || PRIORITY_STYLES.Medium;

          return (
            <div
              key={idx}
              className={`bg-white rounded-2xl border border-gray-200 border-l-4 ${priority.border} shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`}
            >
              <div className="flex items-center justify-between mb-3 gap-2">
                <div className="flex items-center gap-2">
                  <FaRocket className="text-blue-500 shrink-0" size={13} />
                  <h3 className="font-semibold text-gray-800">{item.feature}</h3>
                </div>

                <span className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold shrink-0 ${priority.color}`}>
                  {priority.icon}
                  {item.priority}
                </span>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FutureEnhancements;