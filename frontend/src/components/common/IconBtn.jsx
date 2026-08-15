import React from "react";

const IconBtn = ({
  text,
  onClick,
  children,
  disabled,
  outline = false,
  customClasses,
  type,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`cursor-pointer rounded-md py-[8px] px-[20px] font-semibold transition duration-200 
    ${
      disabled
        ? "bg-gray-500 text-gray-300 cursor-not-allowed"
        : "bg-yellow-600 text-white hover:bg-yellow-700"
    }`}
    >
      {children ? (
        <span className="flex items-center gap-x-2">
          <span>{text}</span>
          {children}
        </span>
      ) : (
        text
      )}
    </button>
  );
};

export default IconBtn;
