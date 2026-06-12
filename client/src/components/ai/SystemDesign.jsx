import React from "react";
import {
  FaShieldAlt,
  FaChartLine,
  FaRocket,
  FaServer,
  FaKey,
  FaSitemap,
} from "react-icons/fa";

const SECTION_CONFIG = {
  securityMeasures: {
    title: "Security Measures",
    icon: FaShieldAlt,
    color: "text-red-600",
    bg: "bg-red-50",
  },
  scalabilityStrategy: {
    title: "Scalability Strategy",
    icon: FaServer,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  performanceOptimizations: {
    title: "Performance Optimizations",
    icon: FaRocket,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  monitoringAndLogging: {
    title: "Monitoring & Logging",
    icon: FaChartLine,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
};

const ListSection = ({ config, items }) => {
  if (!items?.length) return null;
  const Icon = config.icon;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 lg:p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-9 h-9 rounded-xl ${config.bg} flex items-center justify-center`}>
          <Icon className={config.color} size={14} />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">{config.title}</h2>
      </div>

      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-gray-600 text-sm leading-relaxed">
            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${config.bg.replace("50", "400")}`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

const SystemDesign = ({ systemDesign }) => {
  if (!systemDesign) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <p className="text-gray-400">No system design available.</p>
      </div>
    );
  }

  const hasFlowData = systemDesign.architecturePattern || systemDesign.authenticationFlow?.length;

  return (
    <div className="space-y-6">
      {/* Architecture pattern + auth flow */}
      {hasFlowData && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-xl bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-sm">
              <FaSitemap className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">System Design Overview</h2>
              {systemDesign.architecturePattern && (
                <p className="text-sm text-gray-500">{systemDesign.architecturePattern}</p>
              )}
            </div>
          </div>

          {systemDesign.authenticationFlow?.length > 0 && (
            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <FaKey className="text-amber-500" size={12} />
                Authentication Flow
              </h3>

              <div className="space-y-2">
                {systemDesign.authenticationFlow.map((step, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="w-6 h-6 shrink-0 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </span>
                    <p className="text-sm text-gray-600 pt-0.5">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2x2 grid of recommendation lists */}
      <div className="grid lg:grid-cols-2 gap-6">
        {Object.entries(SECTION_CONFIG).map(([key, config]) => (
          <ListSection key={key} config={config} items={systemDesign[key]} />
        ))}
      </div>
    </div>
  );
};

export default SystemDesign;