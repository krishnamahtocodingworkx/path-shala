import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';

const MyProfile = () => {

    const {user} = useSelector((state)=>state.profile);
    const navigate = useNavigate();
  return (
    <div>
        <h1 className="mb-14 text-3xl font-medium text-richblack-5">
            My Profile
        </h1>

        <div className="flex lg:items-center lg:justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 lg:p-8 lg:px-12 flex-col">
            <div className="flex lg:items-center lg:gap-x-4 flex-col">
                <img src={user?.image}
                    alt={`profile${user.firstName}`}
                    className="aspect-square w-[78px] rounded-full object-cover"
                />
                
                <div  className="space-y-1">
                    <p className="text-lg font-semibold text-richblack-5">{user?.firstName + " " + user?.lastName}</p>
                    <p className="text-sm text-richblack-300">{user?.email}</p>
                </div>
            </div>
            <IconBtn
                text="Edit"
                onClick={()=>{
                    navigate("/dashboard/setting")
                }}>

                </IconBtn>
        </div>

        {/* section2 */}
        <div className="my-10 flex lg:flex-col lg:gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 lg:p-8 lg:px-12">
            <div className="flex w-full items-center justify-between">
                <p className="text-lg font-semibold text-richblack-5">About</p>
                <IconBtn
                text="Edit"
                onClick={()=>{
                    navigate("/dashboard/setting")
                }}

                />
                <p
                
                className={`${
            user?.additionalDetails?.about
              ? "text-richblack-5"
              : "text-richblack-400"
          } text-sm font-medium`}>{user?.additionalDetails?.about??"there is nothing in user.addtional details.about"}</p>
            </div>

        </div>

        {/* section3 */}

        <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
            <div className="flex w-full items-center justify-between">
                <p className="text-lg font-semibold text-richblack-5">Personal Details</p>
                <IconBtn
                text="Edit"
                onClick={()=>{
                    navigate("/dashboard/setting")
                }}
                />

               
            </div>

            <div>
                <p>First Name</p>
                <p>{user?.firstName}</p>
            </div>
            <div>
                <p>Email</p>
                <p>{user?.email}</p>
            </div>
            <div>
                <p>Gender</p>
                <p>{user?.addtionaDetais?.gender??"Add Gender"}</p>
            </div>
            <div>
                <p>lastName</p>
                <p>{user?.lastName}</p>
            </div>
            <div>
                <p>Phone Number</p>
                <p>{user?.additionalDetails?.contactNumber??"Add Contact Number"}</p>
            </div>

            <div>
                <p>Date of birth</p>
                <p>{user?.additionalDetails?.dateOfBirtch??"Add date of birth"}</p>
            </div>
        </div>

    </div>
  )
}

export default MyProfile