import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import ErrorMsg02 from "../common/error-msg02";
import ErrorMsg from '../common/error-msg';
import { EmailTwo, LocationTwo, PhoneThree, UserThree } from '@/svg';
import { useUpdateProfileMutation } from '@/redux/features/auth/authApi';
import { notifyError, notifySuccess } from '@/utils/toast';
import { useGetApiProvinceQuery, useGetApiDistrictQuery, useGetApiWardQuery } from "@/redux/features/order/orderApi"

const schema = Yup.object().shape({
   name: Yup.string().required().label("Name"),
   phone: Yup.string()
      .required('Phone number is required')
      .matches(
         /^(\+84|0)(\d{9,10})$/,
         'Phone number is not valid'
      )
      .label('Phone'),
   address: Yup.string().required().label("Address"),
});

const ProfileInfo = () => {
   const { user } = useSelector((state) => state.auth);
   const [updateProfile, { }] = useUpdateProfileMutation();
      // react hook form
   const { register, handleSubmit, formState: { errors }, reset } = useForm({
      resolver: yupResolver(schema),
   });
   // on submit
   const onSubmit = (data) => {
      updateProfile({
         id: user?.tai_khoan_id,
         name: data.name,
         phone: data.phone,
         address: data.address,
      }).then((result) => {
         if (result?.error) {
            notifyError(result?.error?.data?.message);
         }
         else {
            notifySuccess("Cập nhật thông tin Profile thành công !");
         }
      })
      reset();
   };
   return (
      <div className="profile__info">
         <h3 className="profile__info-title">Personal Details</h3>
         <div className="profile__info-content">
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className="row">
                  <div className="col-xxl-12 ">
                     <div className="profile__input-box">
                        <label>Tên của bạn </label>
                        <div className="profile__input">
                           <input {...register("name", { required: `Name is required!` })} name='name' type="text" placeholder="Enter your username" id="name" defaultValue={user?.ten_khach_hang} />
                           <span>
                              <UserThree />
                           </span>
                           <ErrorMsg02 msg={errors.name?.message} />
                        </div>
                     </div>
                  </div>
                  <div className="col-xxl-12">
                     <div className="profile__input-box">
                        <label>Phone </label>
                        <div className="profile__input">
                           <input {...register("phone", { required: true })}id="phone" name='phone' type="text" placeholder="Enter your number" defaultValue={user?.dien_thoai} />
                           <span>
                              <PhoneThree />
                           </span>
                           <ErrorMsg02 msg={errors.phone?.message} />
                        </div>
                     </div>
                  </div>

                  <div className="col-xxl-12" style={{ marginBottom: '25px' }}>
                     <div className="profile__input-box">
                        <div style={{ flex: '1 1 200px', }}>
                           <label>Tên đường</label>
                           <input
                              {...register("address", { required: `Address is required!` })}
                              name='address'
                              id='address'
                              type='text'
                              defaultValue={user?.dia_chi}
                              placeholder='Nhập địa chỉ của bạn !'
                              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                           />
                           <ErrorMsg02 msg={errors?.address?.message} />
                        </div>
                     </div>
                  </div>
                  <div className="col-xxl-12">
                     <div className="profile__btn">
                        <button type="submit" className="tp-btn" id="btn-update">Update Profile</button>
                     </div>
                  </div>
               </div>
            </form>
         </div>
      </div>
   );
};

export default ProfileInfo;