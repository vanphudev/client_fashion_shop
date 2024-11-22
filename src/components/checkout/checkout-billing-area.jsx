import React, { useEffect, useState } from "react";
import ErrorMsg02 from "../common/error-msg02";
import { useSelector } from "react-redux";

const CheckoutBillingArea = ({ register, errors }) => {
   const { user } = useSelector((state) => state.auth);
   const [name, setName] = useState(user?.ten_khach_hang ? user?.ten_khach_hang : "");
   const [phone, setPhone] = useState(user?.dien_thoai ? user?.dien_thoai : "");
   const [dia_chi, setDia_chi] = useState(user?.dia_chi ? user?.dia_chi : "");

   const handleNameChange = (e) => {
      setName(e.target.value);
   };

   const handlePhoneChange = (e) => {
      setPhone(e.target.value);
   };

   const handleAddressChange = (e) => {
      setDia_chi(e.target.value);
   };

   return (
      <div className='tp-checkout-bill-area'>
         <h3 className='tp-checkout-bill-title'>Chi tiết thanh toán</h3>
         <div className='tp-checkout-bill-form'>
            <div className='tp-checkout-bill-inner'>
               <div className='row'>
                  <div className='col-md-12'>
                     <div className='tp-checkout-input'>
                        <label>
                           Tên của bạn <span>*</span>
                        </label>
                        <input
                           {...register("name", {
                              required: `Tên của bạn bắt buộc !`,
                           })}
                           name='name'
                           id='name'
                           type='text'
                           value={name}
                           placeholder='Nhập Tên của bạn'
                           onChange={handleNameChange}
                        />
                        <ErrorMsg02 msg={errors.name?.message} />
                     </div>
                  </div>
                  <div className='col-md-12'>
                     <div className='tp-checkout-input'>
                        <label>Address <span>*</span></label>
                        <input
                           {...register("dia_chi", { required: `Address is required!` })}
                           name='dia_chi'
                           id='dia_chi'
                           type='text'
                           value={dia_chi}
                           onChange={handleAddressChange}
                           placeholder='Nhập địa chỉ giao hàng !'
                        />
                        <ErrorMsg02 msg={errors.dia_chi?.message} />
                     </div>
                  </div>
                                              </div>
               <div className='col-md-12'>
                  <div className='tp-checkout-input'>
                     <label>
                        Phone <span>*</span>
                     </label>
                     <input
                        {...register("contactNo", {
                           required: `Phone is required!`,
                        })}
                        name='phone'
                        id='phone'
                        type='text'
                        placeholder='Phone'
                        value={phone}
                        onChange={handlePhoneChange}
                     />
                     <ErrorMsg02 msg={errors.phone?.message} />
                  </div>
               </div>
               {/* <div className='col-md-12'>
                  <div className='tp-checkout-input'>
                     <label>
                        Địa chỉ Email <span>*</span>
                     </label>
                     <input
                        {...register("email", { required: `Email is required!` })}
                        name='email'
                        id='email'
                        type='email'
                        placeholder='Email'
                        // value={email}
                        onChange={handleEmailChange}
                     />
                     <ErrorMsg02 msg={errors.email?.message} />
                  </div> */}
               </div>
            </div>
         </div>
   );
};

export default CheckoutBillingArea;
