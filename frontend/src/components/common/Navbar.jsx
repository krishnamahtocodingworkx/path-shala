import { useEffect, useState } from "react"
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { RxCross1 } from "react-icons/rx"
import { useSelector } from "react-redux"
import { Link, useLocation, matchPath } from "react-router-dom"

import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiconnector"
import { categories } from "../../services/apis"
import { ACCOUNT_TYPE } from "../../utils/constants"
import { toCatalogSlug } from "../../utils/catalogSlug"
import ProfileDropdown from "../core/Auth/ProfileDropDown"
import Logo from "./Logo"

function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCatalogOpen, setIsCatalogOpen] = useState(false)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        setSubLinks(res?.data?.data || [])
      } catch (error) {
        console.error("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
    setIsCatalogOpen(false)
  }, [location.pathname])

  const matchRoute = (route) => matchPath({ path: route }, location.pathname)
  const showCart = user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR

  const catalogLinks = subLinks.filter((subLink) => subLink?.name)

  const renderCatalogItems = (onNavigate) => {
    if (loading) {
      return <p className="px-3 py-2 text-sm text-richblack-500">Loading...</p>
    }

    if (!catalogLinks.length) {
      return (
        <p className="px-3 py-2 text-sm text-richblack-500">
          No categories yet
        </p>
      )
    }

    return catalogLinks.map((subLink) => (
      <Link
        key={subLink._id}
        to={`/catalog/${toCatalogSlug(subLink.name)}`}
        onClick={onNavigate}
        className="flex items-center justify-between rounded-md px-3 py-2 text-sm text-richblack-800 transition hover:bg-richblack-50 hover:text-richblack-900"
      >
        <span>{subLink.name}</span>
        {typeof subLink?.courses?.length === "number" && (
          <span className="text-xs text-richblack-400">
            {subLink.courses.length}
          </span>
        )}
      </Link>
    ))
  }

  return (
    <header
      className={`sticky top-0 z-[1000] flex h-14 items-center justify-center border-b border-richblack-700 backdrop-blur-md transition-all duration-200 ${
        location.pathname !== "/" ? "bg-richblack-800" : "bg-richblack-900/80"
      }`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        <Logo />

        <nav className="hidden md:block">
          <ul className="flex items-center gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index} className="relative">
                {link.title === "Catalog" ? (
                  <div
                    className={`group relative flex cursor-pointer items-center gap-1 ${
                      matchRoute("/catalog/:catalogName")
                        ? "text-yellow-25"
                        : "text-richblack-25 hover:text-richblack-5"
                    }`}
                  >
                    <p className="flex items-center gap-1 py-4">
                      {link.title}
                      <BsChevronDown className="text-sm transition-transform duration-200 group-hover:rotate-180" />
                    </p>

                    <div className="absolute left-1/2 top-[calc(100%-0.35rem)] z-[1000] hidden w-[280px] -translate-x-1/2 pt-2 group-hover:block">
                      <div className="relative rounded-lg border border-richblack-200 bg-richblack-5 p-2 text-richblack-900 shadow-xl">
                        <div className="absolute left-1/2 top-0 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border-l border-t border-richblack-200 bg-richblack-5"></div>
                        <p className="px-3 pb-2 pt-1 text-xs font-semibold uppercase tracking-wide text-richblack-400">
                          Browse categories
                        </p>
                        <div className="max-h-72 overflow-y-auto">
                          {renderCatalogItems()}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link to={link.path}>
                    <p
                      className={`transition ${
                        matchRoute(link.path)
                          ? "text-yellow-25"
                          : "text-richblack-25 hover:text-richblack-5"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-x-4 md:flex">
          {showCart && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100 transition hover:text-yellow-50" />
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
                <button className="rounded-md border border-richblack-700 bg-richblack-800 px-4 py-2 text-richblack-100 transition hover:bg-richblack-700 hover:text-richblack-5">
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button className="rounded-md bg-yellow-50 px-4 py-2 font-semibold text-richblack-900 transition hover:bg-yellow-100">
                  Sign up
                </button>
              </Link>
            </>
          )}
          {token && <ProfileDropdown />}
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <RxCross1 fontSize={24} color="white" />
          ) : (
            <AiOutlineMenu fontSize={24} color="white" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className="fixed left-0 top-14 z-50 h-[calc(100vh-3.5rem)] w-full overflow-y-auto bg-richblack-800 p-6 shadow-lg md:hidden">
          <ul className="flex flex-col items-center gap-5 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index} className="w-full text-center">
                {link.title === "Catalog" ? (
                  <>
                    <button
                      type="button"
                      className={`mx-auto flex items-center justify-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                      onClick={() => setIsCatalogOpen(!isCatalogOpen)}
                    >
                      <span>{link.title}</span>
                      <BsChevronDown
                        className={`transition-transform ${
                          isCatalogOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isCatalogOpen && (
                      <div className="mt-3 rounded-lg bg-richblack-5 p-2 text-left text-richblack-900">
                        {renderCatalogItems(() => {
                          setIsMenuOpen(false)
                          setIsCatalogOpen(false)
                        })}
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

          <div className="mt-8 flex flex-col items-center gap-4">
            {showCart && (
              <Link
                to="/dashboard/cart"
                className="relative text-richblack-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="inline-flex items-center gap-2">
                  <AiOutlineShoppingCart className="text-2xl" />
                  Cart
                  {totalItems > 0 && (
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-richblack-600 text-xs font-bold text-yellow-100">
                      {totalItems}
                    </span>
                  )}
                </span>
              </Link>
            )}
            {!token ? (
              <>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-40 rounded-md border border-richblack-600 py-2 text-white">
                    Log in
                  </button>
                </Link>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-40 rounded-md bg-yellow-50 py-2 font-semibold text-richblack-900">
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
    </header>
  )
}

export default Navbar
