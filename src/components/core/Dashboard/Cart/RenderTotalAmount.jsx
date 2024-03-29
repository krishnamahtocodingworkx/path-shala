import React from 'react'
import { useSelector ,useDispatch} from 'react-redux';
import IconBtn from '../../../common/IconBtn';

import { BuyCourse } from '../../../../services/operations/studentFeaturesAPI';
import { useNavigate } from 'react-router-dom';


const RenderTotalAmount = () => {
    const {total} = useSelector((state)=>state.cart);
    const {cart} = useSelector((state)=>state.cart);

    const {token} = useSelector((state)=>state.auth);

    const {user} = useSelector((state)=>state.profile);

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleBuyCourse = ()=>{
        const courses = cart.map((course)=>course._id);
        console.log("bought these courses ",courses);
        //api integration is pending in this 
        BuyCourse(token,courses,user,navigate,dispatch);

    }
  return (
    <div>
    <p>Total</p>
    <p>{total}</p>
    <IconBtn
        text="Buy Now"
        onClick={handleBuyCourse}
        className="w-full justify-center"
    />
    </div>
  )
}

export default RenderTotalAmount