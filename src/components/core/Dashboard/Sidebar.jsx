import React from "react";

import { logout } from "../../../services/operations/authAPI";
import { useSelector, useDispatch } from "react-redux";
import SidebarLink from "./SidebarLink";
import { sidebarLinks } from "../../../data/dashboard-links";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { VscSignOut } from "react-icons/vsc";
import { NavLink } from "react-router-dom";
import ConfirmationModal from "../../common/ConfirmationModal";

const Sidebar = () => {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );

  const { loading: authLoading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null);

  if (profileLoading || authLoading) {
    return <div className="mt-10">Loading...</div>;
  }
  return (
    <div className="flex flex-col w-full lg:w-[222px] lg:h-[calc(100vh-3.5rem)] bg-richblack-800 border-r border-richblack-700 py-6">
      {/* Sidebar Links */}
      <div className="flex flex-col space-y-2">
        {sidebarLinks.map((link) =>
          link.type && user?.accountType !== link.type ? null : (
            <SidebarLink key={link.id} link={link} iconName={link.icon} />
          )
        )}
      </div>

      {/* Divider */}
      <div className="mx-auto my-6 h-px w-10/12 bg-richblack-600"></div>

      {/* Settings & Logout */}
      <div className="flex flex-col text-white space-y-2 px-4">
        <SidebarLink
          link={{ name: "Setting", path: "dashboard/setting" }}
          iconName="VscSettingsGear"
        />

        <button
          onClick={() =>
            setConfirmationModal({
              text1: "Are you sure?",
              text2: "You will be logged out of your account.",
              btn1Text: "Log Out",
              btn2Text: "Cancel",
              btn1Handler: () => dispatch(logout(navigate)),
              btn2Handler: () => setConfirmationModal(null),
            })
          }
          className="text-sm font-medium text-richblack-300 flex items-center gap-x-2 hover:text-red-400 transition"
        >
          <VscSignOut className="text-lg" />
          <span>Logout</span>
        </button>
      </div>

      {/* Confirmation Modal */}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default Sidebar;
