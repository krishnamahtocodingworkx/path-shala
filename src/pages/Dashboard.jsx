import React from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from "../components/core/Dashboard/Sidebar"
import { useSelector } from 'react-redux';
const Dashboard = () => {

    const { loading: authLoading } = useSelector((state) => state.auth);
    const { loading: profileLoading } = useSelector((state) => state.profile);

    if (profileLoading || authLoading) {
        return (
            <div className="mt-10">
                Loading...
            </div>
        )
    }
    return (
        <div className="relative flex min-h-[calc(100vh-3.5rem)] text-white">
            <Sidebar />

            <div className=" mx-auto w-11/12 h-[calc(100vh-3.5rem)] overflow-auto   ">
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard