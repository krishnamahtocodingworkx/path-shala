import React from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";
import { FooterLink2 } from "../../data/footer-links";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];

const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];
const Footer = () => {
  return (
    <div className="bg-richblack-800 mt-12">
      <div className="w-11/12 max-w-maxContent mx-auto flex flex-row gap-5 text-richblack-400 py-10">
        {/* section1 */}
        <div className="w-[50%] flex flex-row gap-8">
          {/* ye niche wala div first section ka first part */}
          <div className="w-[30%] flex flex-col  gap-5">
            <div className="ml-[-6rem]">
              <Logo />
            </div>

            {/* <img src={Logo} alt="Logo" /> */}
            <h1 className="text-lg font-bold">Company</h1>

            <div className="flex flex-col gap-5">
              {["About", "Carrier", "Affiliates"].map((ele, ind) => {
                return (
                  <div key={ind}>
                    <Link>{ele}</Link>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-row gap-2 text-richblack-300">
              <FaFacebook />
              <FaGoogle />
              <FaTwitter />
              <FaYoutube />
            </div>
          </div>

          {/* niche wala div first section ka 2nd div hai */}
          <div className="flex flex-col ">
            {/* isme 2 div bnenge kiuki 2 highlighted text hai */}
            {/* first div ye hai */}
            <div className="flex flex-col gap-3">
              <h1 className="text-white">Resources</h1>
              {Resources.map((ele, ind) => (
                <div key={ind} className="text-[14px]">
                  <Link>{ele}</Link>
                </div>
              ))}
            </div>

            {/* 2nd div ye hai niche*/}
            <div>
              <h1>Support</h1>
              <div className="text-richblack-300 text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200 mt-2">
                <Link to={"/help-center"}>Help Center</Link>
              </div>
            </div>
          </div>

          <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
            <h1 className="text-richblack-50 font-semibold text-[16px]">
              Plans
            </h1>

            <div className="flex flex-col gap-2 mt-2">
              {Plans.map((ele, index) => {
                return (
                  <div
                    key={index}
                    className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                  >
                    <Link to={ele.split(" ").join("-").toLowerCase()}>
                      {ele}
                    </Link>
                  </div>
                );
              })}
            </div>
            <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">
              Community
            </h1>

            <div className="flex flex-col gap-2 mt-2">
              {Community.map((ele, index) => {
                return (
                  <div
                    key={index}
                    className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                  >
                    <Link to={ele.split(" ").join("-").toLowerCase()}>
                      {ele}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:w-[50%] flex flex-wrap flex-row justify-between pl-3 lg:pl-5 gap-3">
          {FooterLink2.map((ele, i) => {
            return (
              <div key={i} className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
                <h1 className="text-richblack-50 font-semibold text-[16px]">
                  {ele.title}
                </h1>
                <div className="flex flex-col gap-2 mt-2">
                  {ele.links.map((link, index) => {
                    return (
                      <div
                        key={index}
                        className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                      >
                        <Link to={link.link}>{link.title}</Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-400 mx-auto  pb-14 text-sm">
        {/* Section 1 */}
        <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
          <div className="flex flex-row">
            {BottomFooter.map((ele, i) => {
              return (
                <div
                  key={i}
                  className={` ${
                    BottomFooter.length - 1 === i
                      ? ""
                      : "border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200"
                  } px-3 `}
                >
                  <Link to={ele.split(" ").join("-").toLocaleLowerCase()}>
                    {ele}
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="text-center">Made with ❤️ © 2025 PathShala</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
