// import React from 'react'
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import IconBtn from '../../common/IconBtn';

// const MyProfile = () => {

//     const {user} = useSelector((state)=>state.profile);
//     const navigate = useNavigate();
//   return (
//     <div>
//         <h1 className="mb-14 text-3xl font-medium text-richblack-5">
//             My Profile
//         </h1>

//         <div className="flex lg:items-center lg:justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 lg:p-8 lg:px-12 flex-col">
//             <div className="flex lg:items-center lg:gap-x-4 flex-col">
//                 <img src={user?.image}
//                     alt={`profile${user.firstName}`}
//                     className="aspect-square w-[78px] rounded-full object-cover"
//                 />
                
//                 <div  className="space-y-1">
//                     <p className="text-lg font-semibold text-richblack-5">{user?.firstName + " " + user?.lastName}</p>
//                     <p className="text-sm text-richblack-300">{user?.email}</p>
//                 </div>
//             </div>
//             <IconBtn
//                 text="Edit"
//                 onClick={()=>{
//                     navigate("/dashboard/setting")
//                 }}>

//                 </IconBtn>
//         </div>

//         {/* section2 */}
//         <div className="my-10 flex lg:flex-col lg:gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 lg:p-8 lg:px-12">
//             <div className="flex w-full items-center justify-between">
//                 <p className="text-lg font-semibold text-richblack-5">About</p>
//                 <IconBtn
//                 text="Edit"
//                 onClick={()=>{
//                     navigate("/dashboard/setting")
//                 }}

//                 />
//                 <p
                
//                 className={`${
//             user?.additionalDetails?.about
//               ? "text-richblack-5"
//               : "text-richblack-400"
//           } text-sm font-medium`}>{user?.additionalDetails?.about??"there is nothing in user.addtional details.about"}</p>
//             </div>

//         </div>

//         {/* section3 */}

//         <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
//             <div className="flex w-full items-center justify-between">
//                 <p className="text-lg font-semibold text-richblack-5">Personal Details</p>
//                 <IconBtn
//                 text="Edit"
//                 onClick={()=>{
//                     navigate("/dashboard/setting")
//                 }}
//                 />

               
//             </div>

//             <div>
//                 <p>First Name</p>
//                 <p>{user?.firstName}</p>
//             </div>
//             <div>
//                 <p>Email</p>
//                 <p>{user?.email}</p>
//             </div>
//             <div>
//                 <p>Gender</p>
//                 <p>{user?.addtionaDetais?.gender??"Add Gender"}</p>
//             </div>
//             <div>
//                 <p>lastName</p>
//                 <p>{user?.lastName}</p>
//             </div>
//             <div>
//                 <p>Phone Number</p>
//                 <p>{user?.additionalDetails?.contactNumber??"Add Contact Number"}</p>
//             </div>

//             <div>
//                 <p>Date of birth</p>
//                 <p>{user?.additionalDetails?.dateOfBirtch??"Add date of birth"}</p>
//             </div>
//         </div>

//     </div>
//   )
// }

// export default MyProfile


import React from 'react';
import { useSelector } from 'react-redux';

const MyProfile = () => {
    const { user } = useSelector((state) => state.profile);

    return (
        <div className="p-8 bg-richblack-900 min-h-screen">
            <h1 className="mb-8 text-3xl font-bold text-richblack-5">My Profile</h1>

            <div className="flex flex-col items-center rounded-md border border-richblack-700 bg-richblack-800 p-6 text-center">
                <img
                    src={user?.image}
                    alt={`Profile of ${user.firstName}`}
                    className="w-24 h-24 rounded-full object-cover border-2 border-yellow-500"
                />
                <p className="mt-4 text-lg font-semibold text-richblack-5">
                    {user?.firstName} {user?.lastName}
                </p>
                <p className="text-sm text-richblack-300">{user?.email}</p>
            </div>

            <div className="mt-10 rounded-md border border-richblack-700 bg-richblack-800 p-6">
                <h2 className="text-xl font-semibold text-richblack-5 mb-4">Personal Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-richblack-400">First Name</p>
                        <p className="text-richblack-200">{user?.firstName}</p>
                    </div>
                    <div>
                        <p className="text-sm text-richblack-400">Last Name</p>
                        <p className="text-richblack-200">{user?.lastName}</p>
                    </div>
                    <div>
                        <p className="text-sm text-richblack-400">Email</p>
                        <p className="text-richblack-200">{user?.email}</p>
                    </div>
                    <div>
                        <p className="text-sm text-richblack-400">Gender</p>
                        <p className="text-richblack-200">{user?.additionalDetails?.gender || "Not provided"}</p>
                    </div>
                    <div>
                        <p className="text-sm text-richblack-400">Phone Number</p>
                        <p className="text-richblack-200">{user?.additionalDetails?.contactNumber || "Not provided"}</p>
                    </div>
                    <div>
                        <p className="text-sm text-richblack-400">Date of Birth</p>
                        <p className="text-richblack-200">{user?.additionalDetails?.dateOfBirth || "Not provided"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
