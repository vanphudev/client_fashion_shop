import {useState} from "react";
import {useSelector} from "react-redux";

const CheckoutCoupon = ({handleCouponCode, couponRef, couponApplyMsg}) => {
   const [isOpen, setIsOpen] = useState(false);
   return (
      <div className='tp-checkout-verify-item'>
         <p className='tp-checkout-verify-reveal'>
            Bạn có mã khuyến mãi?{" "}
            <button onClick={() => setIsOpen(!isOpen)} type='button' className='tp-checkout-coupon-form-reveal-btn'>
               Nhập mã khuyến mãi của bạn
            </button>
         </p>
         {isOpen && (
            <div id='tpCheckoutCouponForm' className='tp-return-customer'>
               <form onSubmit={handleCouponCode}>
                  <div className='tp-return-customer-input'>
                     <label>Mã khuyến mãi :</label>
                     <input ref={couponRef} type='text' placeholder='Nhập Mã khuyến mãi ...' />
                  </div>
                  <button type='submit' className='tp-return-customer-btn tp-checkout-btn'>
                     Xác nhận khuyến mãi
                  </button>
               </form>
               {couponApplyMsg && (
                  <p className='p-2' style={{color: "green"}}>
                     {couponApplyMsg}
                  </p>
               )}
            </div>
         )}
      </div>
   );
};

export default CheckoutCoupon;
