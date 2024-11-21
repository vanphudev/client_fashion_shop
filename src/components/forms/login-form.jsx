import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRouter } from 'next/router';
import Link from 'next/link';
// internal
import { CloseEye, OpenEye } from '@/svg';
import ErrorMsg02 from "../common/error-msg02";
import { useLoginUserMutation } from '@/redux/features/auth/authApi';
import { notifyError, notifySuccess } from '@/utils/toast';


// schema
const schema = Yup.object().shape({
   username: Yup.string().required().label("Username"),
   password: Yup.string().required().min(6).label("Password"),
});
const LoginForm = () => {
   const [showPass, setShowPass] = useState(false);
   const [loginUser, { }] = useLoginUserMutation();
   const router = useRouter();
   const { redirect } = router.query;
   // react hook form
   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm({
      resolver: yupResolver(schema),
   });
   // onSubmit
   const onSubmit = (data) => {
      loginUser({
         username: data.username,
         password: data.password,
      })
         .then((data) => {
            if (data?.data?.metadata?.khach_hang) {
               notifySuccess("Login successfully !");
               router.push(redirect || "/");
            }
            else {
               notifyError(data?.data?.message)
            }
         })
      reset();
   };
   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className="tp-login-input-wrapper">
            <div className="tp-login-input-box">
               <div className="tp-login-input">
                  <input {...register("username", { required: `Username is required!` })} name="username" id="username" type="text" placeholder="Username" />
               </div>
               <div className="tp-login-input-title">
                  <label htmlFor="username">Your Username</label>
               </div>
               <ErrorMsg02 msg={errors.username?.message} />
            </div>
            <div className="tp-login-input-box">
               <div className="p-relative">
                  <div className="tp-login-input">
                     <input
                        {...register("password", { required: `Password is required!` })}
                        id="password"
                        type={showPass ? "text" : "password"}
                        placeholder="Min. 6 character"
                     />
                  </div>
                  <div className="tp-login-input-eye" id="password-show-toggle">
                     <span className="open-eye" onClick={() => setShowPass(!showPass)}>
                        {showPass ? <CloseEye /> : <OpenEye />}
                     </span>
                  </div>
                  <div className="tp-login-input-title">
                     <label htmlFor="password">Password</label>
                  </div>
               </div>
               <ErrorMsg02 msg={errors.password?.message} />
            </div>
         </div>
         <div className="tp-login-suggetions d-sm-flex align-items-center justify-content-between mb-20">
            <div className="tp-login-forgot">
               <Link href="/forgot">Forgot Password?</Link>
            </div>
         </div>
         <div className="tp-login-bottom">
            <button type='submit' id="btn-login" className="tp-login-btn w-100">Login</button>
         </div>
      </form>
   );
};

export default LoginForm;