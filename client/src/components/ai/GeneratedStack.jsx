import React from "react";
import {
  FaLaptopCode,
  FaServer,
  FaDatabase,
  FaCloud,
  FaVial,
  FaCog,
  FaShieldAlt,
  FaTools,
  FaLayerGroup,
} from "react-icons/fa";

const CATEGORY_CONFIG = [
  {
    key: "frontend",
    title: "Frontend",
    icon: FaLaptopCode,
  },
  {
    key: "backend",
    title: "Backend",
    icon: FaServer,
  },
  {
    key: "database",
    title: "Database",
    icon: FaDatabase,
  },
  {
    key: "authentication",
    title: "Authentication",
    icon: FaShieldAlt,
  },
  {
    key: "deployment",
    title: "Deployment",
    icon: FaCloud,
  },
  {
    key: "devTools",
    title: "Dev Tools",
    icon: FaTools,
  },
  {
    key: "testing",
    title: "Testing",
    icon: FaVial,
  },
  {
    key: "ciCd",
    title: "CI/CD",
    icon: FaCog,
  },
];

const GeneratedStack = ({ stack = {} }) => {
  const categories = CATEGORY_CONFIG.map((cfg) => ({
    ...cfg,
    technologies: stack?.[cfg.key] || [],
  }));

  const visibleCategories = categories.filter(
    (c) => c.technologies.length > 0
  );

  const totalTechnologies = visibleCategories.reduce(
    (sum, category) => sum + category.technologies.length,
    0
  );

  if (visibleCategories.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
        <p className="text-gray-400">
          No tech stack data available.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
  <div className="flex items-center gap-3">
    <div
      className="
        w-11 h-11
        rounded-xl
        bg-linear-to-br
        from-blue-600
        to-indigo-600
        flex
        items-center
        justify-center
        shadow-sm
      "
    >
      <FaLayerGroup className="text-white" />
    </div>

    <div>
      <h2 className="text-2xl font-bold text-gray-900">
        Recommended Tech Stack
      </h2>

      <p className="text-sm text-gray-500">
        Production-ready technologies selected by AI
      </p>
    </div>
  </div>

  <div className="hidden sm:flex flex-col items-end">
    <span className="text-2xl font-bold text-gray-900 leading-none">
      {totalTechnologies}
    </span>

    <span className="text-xs text-gray-400 font-medium uppercase tracking-wide mt-1">
      Technologies
    </span>
  </div>
</div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 pb-5">
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <p className="text-sm text-gray-500">
            Categories
          </p>

          <h3 className="text-3xl font-bold text-gray-900 mt-2">
            {visibleCategories.length}
          </h3>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <p className="text-sm text-gray-500">
            Technologies
          </p>

          <h3 className="text-3xl font-bold text-gray-900 mt-2">
            {totalTechnologies}
          </h3>
        </div>
      </div>

      {/* Categories */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {visibleCategories.map((category) => {
          const Icon = category.icon;

          return (
            <div
              key={category.key}
              className="
                bg-white
                border
                border-gray-200
                rounded-2xl
                p-6
                shadow-sm
                hover:shadow-md
                transition-all
                duration-200
              "
            >
              {/* Card Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div
                    className="
                      w-11
                      h-11
                      rounded-xl
                      bg-gray-50
                      border
                      border-gray-100
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <Icon className="text-blue-600" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {category.title}
                    </h3>

                    <p className="text-xs text-gray-400">
                      {category.technologies.length} technologies
                    </p>
                  </div>
                </div>

                <span
                  className="
                    px-2.5
                    py-1
                    rounded-lg
                    bg-gray-50
                    border
                    border-gray-100
                    text-xs
                    font-semibold
                    text-gray-600
                  "
                >
                  {category.technologies.length}
                </span>
              </div>

              {/* Tech Pills */}
              <div className="flex flex-wrap gap-2">
                {category.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="
                      px-3
                      py-1.5
                      rounded-lg
                      bg-gray-50
                      border
                      border-gray-100
                      text-sm
                      font-medium
                      text-gray-700
                    "
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GeneratedStack;