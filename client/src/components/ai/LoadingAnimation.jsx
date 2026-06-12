import React from "react";

const LoadingAnimation = () => {
  return (
    <div
      className="
        bg-white
        border
        border-gray-200
        rounded-2xl
        p-10
        shadow-sm
        text-center
      "
    >
      {/* Spinner */}
      <div
        className="
          w-16
          h-16
          mx-auto
          border-4
          border-blue-200
          border-t-blue-600
          rounded-full
          animate-spin
        "
      />

      <h2 className="mt-6 text-2xl font-bold text-gray-900">
        Generating Project Architecture...
      </h2>

      <p className="mt-3 text-gray-600">
        AI is analyzing requirements, selecting the
        tech stack, creating folder structures and
        building your roadmap.
      </p>

      <div className="mt-6 flex justify-center gap-2">
        <span className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></span>

        <span
          className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
          style={{ animationDelay: "0.15s" }}
        ></span>

        <span
          className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
          style={{ animationDelay: "0.3s" }}
        ></span>
      </div>
    </div>
  );
};

export default LoadingAnimation;
