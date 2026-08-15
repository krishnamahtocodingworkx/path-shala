// import React, { useEffect } from 'react'
// import { useForm } from 'react-hook-form';
// import { useSelector } from 'react-redux'
// import IconBtn from '../../common/IconBtn';
// import { createRating } from '../../../services/operations/courseDetailsAPI';
// import ReactStars from 'react-stars'


// const CourseReviewModal = ({setReviewModal}) => {
//     const {user} = useSelector((state)=>state.profile);
//     const {token} = useSelector((state) => state.auth);
//     const {courseEntireData} = useSelector((state)=> state.viewCourse);

//     const {
//         register,
//         handleSubmit,
//         setValue,
//         formState: {errors},
//     } = useForm();

//     useEffect(()=> {
//         setValue("courseExperience", "");
//         setValue("courseRating", 0);
//     },[])

//     const ratingChanged = (newRating) => {
//         setValue("courseRating", newRating);
//     }

//     const onSubmit = async(data) => {
//         await createRating(
//             {
//                 courseId:courseEntireData._id,
//                 rating:data.courseRating,
//                 review:data.courseExperience,
//             },
//             token
//         );
//         setReviewModal(false);
//     }

//   return (
//     <div className='text-white'>
//         <div>
//             {/* Modal header */}
//             <div>
//                 <p>Add Review</p>
//                 <button 
//                 onClick={()=>setReviewModal(false)}
//                 >
//                     Close
//                 </button>
//             </div>

//             {/* Modal Body */}
//             <div>

//                 <div>
//                     <img 
//                         src={user?.image}
//                         alt='user Image'
//                         className='aspect-square  w-[50px] rounded-full object-cover'
//                     />
//                     <div>
//                         <p>{user?.firstName} {user?.lastName}</p>
//                         <p>Posting Publicly</p>
//                     </div>
//                 </div>


//                 <form
//                 onSubmit={handleSubmit(onSubmit)}
//                 className='mt-6 flex flex-col items-center'>

//                     <ReactStars 
//                         count={5}
//                         onChange={ratingChanged}
//                         size={24}
//                         activeColor="#ffd700"
//                     />

//                     <div>
//                         <label htmlFor='courseExperience'>
//                             Add Your Experience*
//                         </label>
//                         <textarea 
//                             id='courseExperience'
//                             placeholder='Add Your Experience here'
//                             {...register("courseExperience", {required:true})}
//                             className='form-style min-h-[130px] w-full'
//                         />
//                         {
//                             errors.courseExperience && (
//                                 <span>
//                                     Please add your experience
//                                 </span>
//                             )
//                         }
//                     </div>
//                     {/* Cancel and Save button */}
//                     <div>
//                         <button
//                         onClick={() => setReviewModal(false)}
//                         >
//                             Cancel
//                         </button>
//                         <IconBtn 
//                             text="save"
//                         />
//                     </div>


//                 </form>

//             </div>
//         </div>
//     </div>
//   )
// }

// export default CourseReviewModal


import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import IconBtn from '../../common/IconBtn';
import { createRating } from '../../../services/operations/courseDetailsAPI';
import ReactStars from 'react-stars';

const CourseReviewModal = ({ setReviewModal }) => {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const { courseEntireData } = useSelector((state) => state.viewCourse);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        setValue("courseExperience", "");
        setValue("courseRating", 0);
    }, []);

    const ratingChanged = (newRating) => {
        setValue("courseRating", newRating);
    };

    const onSubmit = async (data) => {
        await createRating(
            {
                courseId: courseEntireData._id,
                rating: data.courseRating,
                review: data.courseExperience,
            },
            token
        );
        setReviewModal(false);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-richblack-800 p-6 rounded-lg w-[90%] max-w-md shadow-lg">
                {/* Modal header */}
                <div className="flex justify-between items-center border-b border-richblack-600 pb-3 mb-4">
                    <p className="text-lg font-semibold text-white">Add Review</p>
                    <button 
                        onClick={() => setReviewModal(false)}
                        className="text-richblack-300 hover:text-red-500 transition"
                    >
                        Close
                    </button>
                </div>

                {/* Modal Body */}
                <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <img 
                            src={user?.image}
                            alt={`Profile of ${user?.firstName}`}
                            className='w-12 h-12 rounded-full object-cover border border-richblack-600'
                        />
                        <div>
                            <p className="text-white font-medium">{user?.firstName} {user?.lastName}</p>
                            <p className="text-xs text-richblack-400">Posting Publicly</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-4'>
                        <ReactStars 
                            count={5}
                            onChange={ratingChanged}
                            size={28}
                            color2="#ffd700"
                        />

                        <div>
                            <label htmlFor='courseExperience' className="block text-sm text-richblack-300 mb-1">
                                Add Your Experience*
                            </label>
                            <textarea 
                                id='courseExperience'
                                placeholder='Share your thoughts...'
                                {...register("courseExperience", { required: true })}
                                className='w-full p-2 border border-richblack-600 rounded-lg bg-richblack-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500'
                            />
                            {errors.courseExperience && (
                                <span className="text-red-400 text-xs">Please add your experience</span>
                            )}
                        </div>

                        {/* Cancel and Save button */}
                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={() => setReviewModal(false)}
                                className="px-4 py-2 text-richblack-300 hover:text-white border border-richblack-600 rounded-md transition"
                            >
                                Cancel
                            </button>
                            <IconBtn 
                                text="Save"
                                type="submit"
                                className="px-4 py-2 bg-yellow-500 text-richblack-900 rounded-md hover:bg-yellow-600 transition"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CourseReviewModal;
