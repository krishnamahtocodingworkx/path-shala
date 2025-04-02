import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { Link, useLocation, matchPath } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { ACCOUNT_TYPE } from "../../utils/constants";
import ProfileDropdown from "../core/Auth/ProfileDropDown";
import Logo from "./Logo";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        setSubLinks(res.data.data);
      } catch (error) {
        console.error("Could not fetch Categories.", error);
      }
      setLoading(false);
    })();
  }, []);

  const matchRoute = (route) => matchPath({ path: route }, location.pathname);

  return (
    <div
      className={`flex h-14 items-center justify-center border-b border-richblack-700 transition-all duration-200 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      }`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Navigation Links */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index} className="relative">
                {link.title === "Catalog" ? (
                  <div
                    className={`group flex cursor-pointer items-center gap-1 ${
                      matchRoute("/catalog/:catalogName")
                        ? "text-yellow-25"
                        : "text-richblack-25"
                    }`}
                  >
                    <p onClick={() => setIsCatalogOpen(!isCatalogOpen)}>
                      {link.title}
                    </p>
                    <BsChevronDown />

                    {/* Dropdown Menu */}
                    {isCatalogOpen && (
                      <div className="absolute left-1/2 top-10 z-50 w-48 -translate-x-1/2 rounded-lg bg-richblack-5 p-4 text-richblack-900 shadow-lg">
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : subLinks.length ? (
                          subLinks
                            .filter((subLink) => subLink?.courses?.length > 0)
                            .map((subLink, i) => (
                              <div onClick={() => setIsCatalogOpen(false)}>
                                <Link
                                  key={i}
                                  to={`/catalog/${subLink.name
                                    .replace(/\s+/g, "-")
                                    .toLowerCase()}`}
                                  className="block py-2 px-4 hover:bg-richblack-50 rounded"
                                >
                                  {subLink.name}
                                </Link>
                              </div>
                            ))
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to={link.path}>
                    <p
                      className={
                        matchRoute(link.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* User Actions */}
        <div className="hidden md:flex items-center gap-x-4">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-richblack-600 text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {!token && (
            <>
              <Link to="/login">
                <button className="rounded-md border border-richblack-700 bg-richblack-800 px-4 py-2 text-richblack-100 hover:bg-richblack-700">
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button className="rounded-md border border-richblack-700 bg-richblack-800 px-4 py-2 text-richblack-100 hover:bg-richblack-700">
                  Sign up
                </button>
              </Link>
            </>
          )}
          {token && <ProfileDropdown />}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <RxCross1 fontSize={24} color="white" />
          ) : (
            <AiOutlineMenu fontSize={24} color="white" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed top-14 left-0 w-full bg-richblack-700 p-6 shadow-lg z-50 md:hidden">
          <ul className="flex flex-col items-center gap-5 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index} className="w-full text-center">
                {link.title === "Catalog" ? (
                  <>
                    <div
                      className={`flex cursor-pointer items-center justify-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                      onClick={() => setIsCatalogOpen(!isCatalogOpen)}
                    >
                      <p>{link.title}</p>
                      <BsChevronDown />
                    </div>

                    {isCatalogOpen && (
                      <div className="mt-2 w-full rounded-lg bg-richblack-800 p-4">
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : subLinks.length ? (
                          subLinks
                            .filter((subLink) => subLink?.courses?.length > 0)
                            .map((subLink, i) => (
                              <Link
                                key={i}
                                to={`/catalog/${subLink.name
                                  .replace(/\s+/g, "-")
                                  .toLowerCase()}`}
                                className="block py-2 px-4 hover:bg-richblack-50 rounded"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {subLink.name}
                              </Link>
                            ))
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <Link to={link.path} onClick={() => setIsMenuOpen(false)}>
                    <p
                      className={
                        matchRoute(link.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col items-center gap-4">
            {!token ? (
              <>
                <Link to="/login">
                  <button className="w-40 py-2 rounded-md bg-blue-600 text-white">
                    Log in
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="w-40 py-2 rounded-md bg-blue-700 text-white">
                    Sign up
                  </button>
                </Link>
              </>
            ) : (
              <ProfileDropdown />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
