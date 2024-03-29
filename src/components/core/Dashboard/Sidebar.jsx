import React from 'react'


import { logout } from "../../../services/operations/authAPI";
import { useSelector, useDispatch } from 'react-redux';
import SidebarLink from "./SidebarLink"
import { sidebarLinks } from "../../../data/dashboard-links"

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { VscSignOut } from "react-icons/vsc";
import { NavLink } from 'react-router-dom';
import ConfirmationModal from "../../common/ConfirmationModal"



const Sidebar = () => {

    const { user, loading: profileLoading } = useSelector((state) => state.profile);

    const { loading: authLoading } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmationModal, setConfirmationModal] = useState(null);

    if (profileLoading || authLoading) {
        return (
            <div className="mt-10">
                Loading...
            </div>
        )
    }
    return (
        <>
            <div>
                <div className="flex min-w-[222px] flex-col border-r[1px] border-r-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 py-10">

                    <div className="flex flex-col">

                        {
                            sidebarLinks.map((link) => {
                                if (link.type && user?.accountType !== link.type) return null
                                console.log("aayahai sidebarme map ke andar")
                                return (

                                    <SidebarLink link={link} iconName={link.icon} key={link.id} />
                                )

                            })
                        }

                    </div>

                    <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600">

                    </div>

                    <div className="flex flex-col text-white">
                        <SidebarLink
                            link={{ name: "Setting", path: "dashboard/setting" }}
                            iconName={"VscSettingsGear"}

                        >
                        </SidebarLink>


                        <button
                            onClick={() => setConfirmationModal({
                                text1: "Are you sure",
                                text2: "You will be logged out of your account",
                                btn1Text: "LogOut",
                                btn2Text: "Cancel",
                                btn1Handler: () => dispatch(logout(navigate)),
                                btn2Handler: () => setConfirmationModal(null)
                            })}
                            className="text-sm font-medium text-richblack-300"
                        >
                            <div className="flex items-center gap-x-2">
                                <VscSignOut className="text-lg" />
                                <span>Logout</span>
                            </div>

                        </button>

                    </div>

                </div>



            </div>
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </>
    )
}

export default Sidebar