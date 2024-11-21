import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRouter } from "next/router";
// internal
import { CloseEye, OpenEye } from "@/svg";
import ErrorMsg02 from "../common/error-msg02";
import { notifyError, notifySuccess } from "@/utils/toast";

// schema
const schema = Yup.object().shape({
   name: Yup.string().required().label("Name"),
   email: Yup.string().required().email().label("Email"),
   subject: Yup.string().required().label("Subject"),
   message: Yup.string().required().label("message"),
   remember: Yup.bool()
      .oneOf([true], "You must agree to the terms and conditions to proceed.")
      .label("Terms and Conditions"),
});

const ContactForm = () => {
   // react hook form
   const { register, handleSubmit, formState: { errors }, reset } = useForm({
      resolver: yupResolver(schema),
   });
   // on submit
   const onSubmit = (data) => {
      if (data) {
         notifySuccess('Bạn đã gửi tin nhắn cho chúng tôi thành công!');
      }
      reset();
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)} id="contact-form">
         <div className="tp-contact-input-wrapper">
            <div className="tp-contact-input-box">
               <div className="tp-contact-input">
                  <input {...register("name", { required: `Tên của bạn là bắt buộc !` })} name="name" id="name" type="text" placeholder="Tên của bạn" />
               </div>
               <div className="tp-contact-input-title">
                  <label htmlFor="name">Tên của bạn</label>
               </div>
               <ErrorMsg02 msg={errors.name?.message} />
            </div>
            <div className="tp-contact-input-box">
               <div className="tp-contact-input">
                  <input {...register("email", { required: `Email của bạn là bắt buộc !` })} name="email" id="email" type="email" placeholder="example@gmail.com" />
               </div>
               <div className="tp-contact-input-title">
                  <label htmlFor="email">Email của bạn</label>
               </div>
               <ErrorMsg02 msg={errors.email?.message} />
            </div>
            <div className="tp-contact-input-box">
               <div className="tp-contact-input">
                  <input {...register("subject", { required: `Tiêu đề nội dung là bắt buộc !` })} name="subject" id="subject" type="text" placeholder="Tiêu đề nội dung" />
               </div>
               <div className="tp-contact-input-title">
                  <label htmlFor="subject">Tiêu đề</label>
               </div>
               <ErrorMsg02 msg={errors.subject?.message} />
            </div>
            <div className="tp-contact-input-box">
               <div className="tp-contact-input">
                  <textarea {...register("message", { required: `Nội dung tin nhắn là bắt buộc !` })} id="message" name="message" placeholder="Nội dung tin nhắn của bạn ..." />
               </div>
               <div className="tp-contact-input-title">
                  <label htmlFor="message">Nội dung</label>
               </div>
               <ErrorMsg02 msg={errors.message?.message} />
            </div>
         </div>
         <div className="tp-contact-suggetions mb-20">
            <div className="tp-contact-remeber">
               <input  {...register("remember", { required: `Bạn phải đồng ý các điều khoản của chúng tôi!` })} name="remember" id="remember" type="checkbox" />
               <label htmlFor="remember">Bạn phải đồng ý với các điều khoản và điều kiện để tiếp tục.</label>
               <ErrorMsg02 msg={errors.remember?.message} />
            </div>
         </div>
         <div className="tp-contact-btn">
            <button type="submit">Gửi tin nhắn cho chúng tôi</button>
         </div>
      </form>
   );
};

export default ContactForm;