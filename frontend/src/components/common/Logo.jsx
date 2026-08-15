import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to="/"
      className="text-white shadow-2xl shadow-blue-500/20    flex justify-center items-center"
    >
      <span className=" text-yellow-5  font-semibold  text-[1.5rem]">
        {"P"}
      </span>
      <span className=" tracking-wider ">{"athShala"}</span>
    </Link>
  );
};

export default Logo;
