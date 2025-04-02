// import React from 'react'
// import { useSelector ,useDispatch} from 'react-redux';
// import IconBtn from '../../../common/IconBtn';

// import { BuyCourse } from '../../../../services/operations/studentFeaturesAPI';
// import { useNavigate } from 'react-router-dom';


// const RenderTotalAmount = () => {
//     const {total} = useSelector((state)=>state.cart);
//     const {cart} = useSelector((state)=>state.cart);

//     const {token} = useSelector((state)=>state.auth);

//     const {user} = useSelector((state)=>state.profile);

//     const navigate = useNavigate();
//     const dispatch = useDispatch();


//     const handleBuyCourse = ()=>{
//         const courses = cart.map((course)=>course._id);
//         console.log("bought these courses ",courses);
//         //api integration is pending in this 
//         BuyCourse(token,courses,user,navigate,dispatch);

//     }
//   return (
//     <div>
//     <p>Total</p>
//     <p>{total}</p>
//     <IconBtn
//         text="Buy Now"
//         onClick={handleBuyCourse}
//         className="w-full justify-center"
//     />
//     </div>
//   )
// }

// export default RenderTotalAmount
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import IconBtn from '../../../common/IconBtn';
import { BuyCourse } from '../../../../services/operations/studentFeaturesAPI';
import { useNavigate } from 'react-router-dom';

const RenderTotalAmount = () => {
    const { total, cart } = useSelector((state) => state.cart);
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleBuyCourse = () => {
        if (cart.length === 0) return;
        const courses = cart.map((course) => course._id);
        console.log("Purchasing courses: ", courses);
        BuyCourse(token, courses, user, navigate, dispatch);
    };

    return (
        <div className="p-6 bg-richblack-800 shadow-lg rounded-lg border border-richblack-600">
            <div className="flex justify-between items-center mb-4">
                <p className="text-lg font-semibold text-richblack-200">Total Amount</p>
                <p className="text-xl font-bold text-yellow-200">${total.toFixed(2)}</p>
            </div>
            <IconBtn
                text="Buy Now"
                onClick={handleBuyCourse}
                className="w-full justify-center bg-yellow-500 text-richblack-900 py-2 rounded-md hover:bg-yellow-600 transition"
            />
        </div>
    );
};

export default RenderTotalAmount;