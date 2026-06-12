import React from "react";
import { FaRocket, FaArrowRight } from "react-icons/fa";

// Rotating accent palette so cards don't look monotone, but stay professional
const ACCENTS = [
  { bg: "bg-blue-50", text: "text-blue-600", ring: "group-hover:ring-blue-200" },
  { bg: "bg-indigo-50", text: "text-indigo-600", ring: "group-hover:ring-indigo-200" },
  { bg: "bg-violet-50", text: "text-violet-600", ring: "group-hover:ring-violet-200" },
  { bg: "bg-cyan-50", text: "text-cyan-600", ring: "group-hover:ring-cyan-200" },
];

const FeaturesList = ({ features = [] }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-sm">
            <FaRocket className="text-white" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Key Features
            </h2>

            <p className="text-sm text-gray-500">
              Core functionality included in this architecture
            </p>
          </div>
        </div>

        {features.length > 0 && (
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-2xl font-bold text-gray-900 leading-none">
              {features.length}
            </span>
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wide mt-1">
              Features
            </span>
          </div>
        )}
      </div>

      {features.length === 0 ? (
        <p className="text-gray-400">No features available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, index) => {
            const accent = ACCENTS[index % ACCENTS.length];

            return (
              <div
                key={index}
                className="
                  group
                  relative
                  flex
                  items-start
                  gap-4
                  p-5
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  hover:border-gray-300
                  hover:shadow-lg
                  hover:-translate-y-0.5
                  transition-all
                  duration-200
                "
              >
                {/* Index badge */}
                <div
                  className={`
                    w-10 h-10 shrink-0 rounded-xl
                    ${accent.bg} ${accent.text}
                    flex items-center justify-center
                    font-bold text-sm
                    ring-1 ring-transparent ${accent.ring}
                    transition-all
                  `}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Feature text */}
                <p className="text-gray-700 font-medium leading-relaxed pt-1.5">
                  {feature}
                </p>

                {/* Hover arrow accent */}
                <FaArrowRight
                  className={`
                    absolute top-5 right-5
                    text-gray-200
                    opacity-0
                    group-hover:opacity-100
                    group-hover:${accent.text}
                    transition-all
                    duration-200
                  `}
                  size={14}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FeaturesList;