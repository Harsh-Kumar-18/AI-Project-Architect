import React from "react";

const Card = ({
  children,
  className = "",
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white
        rounded-xl
        shadow-md
        border
        border-gray-200
        p-6
        transition-all
        duration-200
        hover:shadow-lg
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
