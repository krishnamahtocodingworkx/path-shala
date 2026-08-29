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
      className={`cursor-pointer rounded-md py-[8px] px-[20px] font-semibold transition duration-200 ${
        disabled
          ? "cursor-not-allowed bg-gray-500 text-gray-300"
          : outline
          ? "border border-yellow-50 bg-transparent text-yellow-50 hover:bg-yellow-50 hover:text-richblack-900"
          : "bg-yellow-50 text-richblack-900 hover:bg-yellow-100"
      } ${customClasses || ""}`}
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
