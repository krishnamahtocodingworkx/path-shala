import React from "react";

const AuthSubmitButton = ({
  isSubmitting,
  children,
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <button
      type="submit"
      disabled={isSubmitting || disabled}
      className={`mt-6 flex w-full items-center justify-center gap-2 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900 transition disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
      {...props}
    >
      {isSubmitting && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-richblack-900 border-t-transparent" />
      )}
      {isSubmitting ? "Please wait..." : children}
    </button>
  );
};

export default AuthSubmitButton;
