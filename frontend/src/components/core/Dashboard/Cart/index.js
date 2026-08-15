// import React from 'react'
// import {useSelector} from "react-redux";
// import RenderCartCourses from './RenderCartCourses';
// import RenderTotalAmount from './RenderTotalAmount';

// const Cart = () => {

//     const {total, totalItems} = useSelector((state)=>state.cart);
//   return (
//     <div>
//         <h1>Your Cart</h1>
//         <p>{totalItems} in cart</p>
//         {
//             total>0
//             ?(<div>
//             <RenderCartCourses/>
//             <RenderTotalAmount/>


//             </div>):(
//                 <p>Your Cart is Empty</p>
//             )
//         }

//     </div>
//   )
// }

// export default Cart

import React from 'react';
import { useSelector } from 'react-redux';
import RenderCartCourses from './RenderCartCourses';
import RenderTotalAmount from './RenderTotalAmount';

const Cart = () => {
  const { total, totalItems } = useSelector((state) => state.cart);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-richblack-900">Your Cart</h1>
      <p className="text-lg text-gray-600">{totalItems} item(s) in cart</p>
      {total > 0 ? (
        <div className="mt-4 flex flex-col gap-6">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <p className="mt-4 text-lg text-gray-500">Your cart is empty. Start adding courses now!</p>
      )}
    </div>
  );
};

export default Cart;
