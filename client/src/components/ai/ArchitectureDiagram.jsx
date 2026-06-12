import React from "react";
import {
  FaLayerGroup,
  FaExchangeAlt,
  FaPlug,
  FaArrowRight,
  FaArrowLeft,
  FaExchangeAlt as FaBidirectional,
} from "react-icons/fa";

// Strips leading numbering like "1. " or "Step 2:" since we render our own badges
const cleanStep = (text = "") => text.replace(/^(\d+\.|\d+\)|step\s*\d+:?)\s*/i, "");

const DIRECTION_CONFIG = {
  inbound: { icon: FaArrowLeft, label: "Inbound", color: "text-green-600", bg: "bg-green-50" },
  outbound: { icon: FaArrowRight, label: "Outbound", color: "text-blue-600", bg: "bg-blue-50" },
  bidirectional: { icon: FaBidirectional, label: "Bidirectional", color: "text-purple-600", bg: "bg-purple-50" },
};

const SectionCard = ({ icon: Icon, iconColor, iconBg, title, children }) => (
  <div className="bg-white rounded-2xl border border-gray-200 p-6 lg:p-8 shadow-sm">
    <div className="flex items-center gap-3 mb-6">
      <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center`}>
        <Icon className={iconColor} size={15} />
      </div>
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
    </div>
    {children}
  </div>
);

const ArchitectureDiagram = ({ architecture }) => {
  if (!architecture) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <p className="text-gray-400">No architecture available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview */}
      <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
        <div className="absolute inset-0 bg-linear-to-br from-blue-50 via-white to-indigo-50" />

        <div className="relative p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-xl bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-sm">
              <FaLayerGroup className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">System Architecture</h2>
          </div>

          {architecture.pattern && (
            <span className="inline-block px-3 py-1 bg-white border border-blue-200 text-blue-700 rounded-full text-sm font-semibold mb-4">
              {architecture.pattern}
            </span>
          )}

          <p className="text-gray-600 leading-relaxed">{architecture.description}</p>
        </div>
      </div>

      {/* Layers */}
      {architecture.layers?.length > 0 && (
        <SectionCard icon={FaLayerGroup} iconColor="text-blue-600" iconBg="bg-blue-50" title="Architecture Layers">
          <div className="space-y-4">
            {architecture.layers.map((layer, index) => (
              <div key={index}>
                <div className="border border-gray-200 rounded-xl p-5 hover:border-blue-200 hover:shadow-md transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-7 h-7 shrink-0 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </span>
                    <h4 className="font-semibold text-lg text-gray-900">{layer.layer}</h4>
                  </div>

                  <p className="text-gray-500 text-sm mt-1 ml-10">{layer.description}</p>

                  {layer.components?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4 ml-10">
                      {layer.components.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {index !== architecture.layers.length - 1 && (
                  <div className="flex justify-center py-1">
                    <div className="w-0.5 h-6 bg-linear-to-b from-blue-200 to-indigo-100" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* Data Flow */}
      {architecture.dataFlow?.length > 0 && (
        <SectionCard icon={FaExchangeAlt} iconColor="text-green-600" iconBg="bg-green-50" title="Data Flow">
          <div className="space-y-3">
            {architecture.dataFlow.map((step, index) => (
              <div key={index} className="relative flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 shrink-0 rounded-full bg-linear-to-br from-green-500 to-emerald-600 text-white flex items-center justify-center text-sm font-bold shadow-sm">
                    {index + 1}
                  </div>
                  {index !== architecture.dataFlow.length - 1 && (
                    <div className="w-0.5 flex-1 bg-green-100 mt-1 min-h-4" />
                  )}
                </div>

                <p className="text-sm text-gray-700 leading-relaxed pt-1 pb-3">
                  {cleanStep(step)}
                </p>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* Integrations */}
      {architecture.integrations?.length > 0 && (
        <SectionCard icon={FaPlug} iconColor="text-purple-600" iconBg="bg-purple-50" title="Integrations">
          <div className="grid md:grid-cols-2 gap-4">
            {architecture.integrations.map((integration, index) => {
              const dir = DIRECTION_CONFIG[integration.direction] || DIRECTION_CONFIG.bidirectional;
              const DirIcon = dir.icon;

              return (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl p-4 hover:border-purple-200 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{integration.name}</h4>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${dir.bg} ${dir.color}`}>
                      <DirIcon size={10} />
                      {dir.label}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600">{integration.purpose}</p>
                </div>
              );
            })}
          </div>
        </SectionCard>
      )}
    </div>
  );
};

export default ArchitectureDiagram;