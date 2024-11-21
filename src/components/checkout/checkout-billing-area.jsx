import React, { useEffect, useState } from "react";
import ErrorMsg02 from "../common/error-msg02";
import { useSelector } from "react-redux";
import { useGetApiProvinceQuery, useGetApiDistrictQuery, useGetApiWardQuery } from "@/redux/features/order/orderApi"

const CheckoutBillingArea = ({ register, errors }) => {
   const { user } = useSelector((state) => state.auth);
   const [name, setName] = useState(user?.fullName ? user?.fullName : "");
   const [email, setEmail] = useState(user?.email ? user?.email : "");
   const [phone, setPhone] = useState(user?.phone ? user?.phone : "");
   const [selectedProvince, setSelectedProvince] = useState('');
   const [selectedDistrict, setSelectedDistrict] = useState('');
   const { data: provinces, isError: provinceError, isLoading: provinceLoading } = useGetApiProvinceQuery();
   const { data: districts, isError: districtError, isLoading: districtLoading } = useGetApiDistrictQuery(selectedProvince, {
      skip: !selectedProvince,
   });

   const { data: wards, isError: wardError, isLoading: wardLoading } = useGetApiWardQuery(selectedDistrict, {
      skip: !selectedDistrict,
   });

   const handleNameChange = (e) => {
      setName(e.target.value);
   };

   const handleEmailChange = (e) => {
      setEmail(e.target.value);
   };

   const handlePhoneChange = (e) => {
      setPhone(e.target.value);
   };

   const handleProvinceChange = (e) => {
      const provinceCode = e.target.value;
      setSelectedProvince(provinceCode);
      setSelectedDistrict('');
   };

   const handleDistrictChange = (e) => {
      const districtCode = e.target.value;
      setSelectedDistrict(districtCode);
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
                           placeholder='Nhập Tên của bạn'
                           onChange={handleNameChange}
                        />
                        <ErrorMsg02 msg={errors.name?.message} />
                     </div>
                  </div>
                  <div className='col-md-12'>
                     <div className='tp-checkout-input'>
                        <label>Tên đường <span>*</span></label>
                        <input
                           {...register("address", { required: `Address is required!` })}
                           name='address'
                           id='address'
                           type='text'
                           placeholder='Nhập số nhà và tên đường của bạn !'
                        />
                        <ErrorMsg02 msg={errors.address?.message} />
                     </div>
                  </div>
                  <div className='col-md-4'>
                     <div className='tp-checkout-input'>
                        <label>Tỉnh thành <span>*</span></label>
                        <select {...register("province", { required: `Province is required!` })} id='province' name="province" onChange={handleProvinceChange} disabled={provinceLoading || provinceError}>
                           {provinceLoading ? (
                              <option >Đang tải...</option>
                           ) : provinceError ? (
                              <option >Lỗi dữ liệu</option>
                           ) : (
                              <>
                                 <option >Chọn Tỉnh/Thành phố</option>
                                 {provinces?.results.map((province) => (
                                    <option key={province.province_id} value={province.province_id}>
                                       {province.province_name}
                                    </option>
                                 ))}
                              </>
                           )}
                        </select>
                        <ErrorMsg02 msg={errors.province?.message} />
                     </div>
                  </div>
                  <div className='col-md-4'>
                     <div className='tp-checkout-input'>
                        <label>Quận/Huyện <span>*</span></label>
                        <select {...register("district", { required: `District is required!` })} onChange={handleDistrictChange} id="district" name="district" disabled={!selectedProvince || districtLoading || districtError}>
                           {!selectedProvince ? (
                              <option value=''>Chọn Quận/huyện</option>
                           ) : districtLoading ? (
                              <option value=''>Đang tải...</option>
                           ) : districtError ? (
                              <option value=''>Lỗi dữ liệu</option>
                           ) : (
                              <>
                                 <option value=''>Chọn Quận/Huyện</option>
                                 {districts?.results.map((district) => (
                                    <option key={district.district_id} value={district.district_id}>
                                       {district.district_name}
                                    </option>
                                 ))}
                              </>
                           )}
                        </select>
                        <ErrorMsg02 msg={errors.district?.message} />
                     </div>
                  </div>
                  <div className='col-md-4'>
                     <div className='tp-checkout-input'>
                        <label>Xã/Phường <span>*</span></label>
                        <select {...register("ward", { required: `Ward is required!` })} name="ward" id="ward" disabled={!selectedDistrict || wardLoading || wardError}>
                           {!selectedDistrict ? (
                              <option value=''>Chọn Xã/Phường</option>
                           ) : wardLoading ? (
                              <option value=''>Đang tải...</option>
                           ) : wardError ? (
                              <option value=''>Lỗi dữ liệu</option>
                           ) : (
                              <>
                                 <option value=''>Chọn Xã/Phường</option>
                                 {wards?.results.map((ward) => (
                                    <option key={ward.ward_id} value={ward.ward_id}>
                                       {ward.ward_name}
                                    </option>
                                 ))}
                              </>
                           )}
                        </select>
                        <ErrorMsg02 msg={errors.ward?.message} />
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
                        name='contactNo'
                        id='contactNo'
                        type='text'
                        placeholder='Phone'
                        // value={phone}
                        onChange={handlePhoneChange}
                     />
                     <ErrorMsg02 msg={errors.contactNo?.message} />
                  </div>
               </div>
               <div className='col-md-12'>
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
                  </div>
               </div>
               <div className='col-md-12'>
                  <div className='tp-checkout-input'>
                     <label>Ghi chú cho đơn hàng của bạn</label>
                     <textarea
                        {...register("orderNote", { required: false })}
                        name='orderNote'
                        id='orderNote'
                        placeholder='Ghi chú cho đơn hàng của bạn !'
                     />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default CheckoutBillingArea;
