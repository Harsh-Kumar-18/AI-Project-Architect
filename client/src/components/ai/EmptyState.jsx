import React from "react";
import { Link } from "react-router-dom";

import { FaRocket } from "react-icons/fa";
import Button from "../common/Button";

const EmptyState = ({
  title = "Ready to Generate",
  description = "Enter your project idea and let AI create a complete architecture.",
  buttonText = "Generate Project",
  buttonLink = "/generate",
}) => {
  return (
    <div
      className="
        bg-white
        border
        border-gray-200
        rounded-2xl
        p-10
        text-center
        shadow-sm
      "
    >
      <div
        className="
          w-16
          h-16
          mx-auto
          rounded-full
          bg-blue-100
          flex
          items-center
          justify-center
        "
      >
        <FaRocket className="text-blue-600 text-2xl" />
      </div>

      <h2 className="mt-6 text-2xl font-bold text-gray-900">{title}</h2>

      <p className="mt-3 text-gray-600 max-w-md mx-auto">{description}</p>

      {buttonText && buttonLink && (
        <Link to={buttonLink}>
          <Button variant="primary" className="mt-6">
            {buttonText}
          </Button>
        </Link>
      )}
      
    </div>
  );
};

export default EmptyState;
