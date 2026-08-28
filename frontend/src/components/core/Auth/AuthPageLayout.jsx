import React from "react";

const AuthPageLayout = ({ title, description, children }) => {
  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center px-4 py-12">
      <div className="w-full max-w-[450px]">
        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
          {title}
        </h1>
        {description && (
          <p className="mt-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
            {description}
          </p>
        )}
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
};

export default AuthPageLayout;
