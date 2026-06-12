import React from "react";


const StatsCard = ({
  title,
  value,
  icon: Icon,
}) => {
  return (
    <div
      className="
        bg-white
        p-6
        rounded-2xl
        border
        border-gray-200
        shadow-sm
        hover:shadow-lg
        transition-all
        duration-300
      "
    >
      <div className="flex items-center justify-between">

        <div>
          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h3 className="text-3xl font-bold text-gray-900 mt-2">
            {value}
          </h3>
        </div>

        {Icon && (
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
            <Icon className="text-blue-600 text-xl" />
          </div>
        )}

      </div>
    </div>
  );
};

export default StatsCard;
