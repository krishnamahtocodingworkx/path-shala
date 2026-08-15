import React from 'react'
import * as Icons from "react-icons/vsc"
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { matchPath } from 'react-router-dom';


const SidebarLink = ({ link, iconName }) => {
    const Icon = Icons[iconName];
    const location = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname)
    }
    return (
        <NavLink
            to={link.path}
            //ye krna hai
            // onClick
            className={` text-white relative lg:px-8 py-2 ${matchRoute(link.path) ? "bg-yellow-800" : "bg:opacity-0"}`}
        >
            <span
                className={`absolute left-0 top-0 lg:h-full lg:w-[0.2rem] bg-yellow"
                ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}
            >
            </span>
                <div className="flex items-center lg:gap-x-2 text-white">
                <Icon className="lg:text-lg"/>
                <span className="text-white">{link.name}</span>
                </div>






        </NavLink>
    )
}

export default SidebarLink