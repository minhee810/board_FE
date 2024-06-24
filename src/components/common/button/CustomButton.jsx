import React from "react";

export const CustomButton = ({ onClick, children, className, value }) => {
  return (
    <div>
      <button
        type="button"
        className={`btn btn-primary ${className}`}
        onClick={onClick}
        value={value}
      >
        {children}
      </button>
    </div>
  );
};
