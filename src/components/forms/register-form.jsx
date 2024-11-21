import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {useRouter} from "next/router";
// internal
import {CloseEye, OpenEye} from "@/svg";
import ErrorMsg02 from "../common/error-msg02";
import {notifyError, notifySuccess} from "@/utils/toast";
import {useRegisterUserMutation} from "@/redux/features/auth/authApi";

// schema
const schema = Yup.object().shape({
   name: Yup.string().required().label("Name"),
   username: Yup.string().required().label("Username"),
   password: Yup.string().required().min(6).label("Password"),
   phone: Yup.string()
      .required("Phone is required")
      .matches(/^\d{10,15}$/, "Phone must be between 10 and 12 digits") // Kiểm tra số điện thoại có từ 10-12 chữ số
      .label("Phone"),
});

const RegisterForm = () => {
   const [showPass, setShowPass] = useState(false);
   const [registerUser, {}] = useRegisterUserMutation();
   const router = useRouter();
   const {redirect} = router.query;
   // react hook form
   const {
      register,
      handleSubmit,
      formState: {errors},
      reset,
   } = useForm({
      resolver: yupResolver(schema),
   });

   const onSubmit = (data) => {
      registerUser({
         name: data.name,
         username: data.username,
         password: data.password,
         phone: data.phone,
      }).then((result) => {
         console.log("result", result);
         if (result?.error) {
            notifyError(result?.error.data.message);
         } else {
            notifySuccess(result?.data?.message);
            router.push(redirect || "/login");
         }
      });
      reset();
   };
   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className='tp-login-input-wrapper'>
            <div className='tp-login-input-box'>
               <div className='tp-login-input'>
                  <input
                     {...register("name", {required: `Name is required!`})}
                     id='name'
                     name='name'
                     type='text'
                     placeholder='Your name'
                  />
               </div>
               <div className='tp-login-input-title'>
                  <label htmlFor='name'>Your Name</label>
               </div>
               <ErrorMsg02 msg={errors.name?.message} />
            </div>
            <div className='tp-login-input-box'>
               <div className='tp-login-input'>
                  <input
                     {...register("phone", {required: `Phone is required!`})}
                     id='phone'
                     name='phone'
                     type='text'
                     placeholder='Ex: (+84)'
                  />
               </div>
               <div className='tp-login-input-title'>
                  <label htmlFor='phone'>Your Phone</label>
               </div>
               <ErrorMsg02 msg={errors.phone?.message} />
            </div>
            <div className='tp-login-input-box'>
               <div className='tp-login-input'>
                  <input
                     {...register("username", {required: `Username is required!`})}
                     id='username'
                     name='username'
                     type='text'
                     placeholder='Username'
                  />
               </div>
               <div className='tp-login-input-title'>
                  <label htmlFor='username'>Your Username</label>
               </div>
               <ErrorMsg02 msg={errors.username?.message} />
            </div>
            <div className='tp-login-input-box'>
               <div className='p-relative'>
                  <div className='tp-login-input'>
                     <input
                        {...register("password", {required: `Password is required!`})}
                        id='password'
                        name='password'
                        type={showPass ? "text" : "password"}
                        placeholder='Min. 6 character'
                     />
                  </div>
                  <div className='tp-login-input-eye' id='password-show-toggle'>
                     <span className='open-eye' onClick={() => setShowPass(!showPass)}>
                        {showPass ? <CloseEye /> : <OpenEye />}
                     </span>
                  </div>
                  <div className='tp-login-input-title'>
                     <label htmlFor='password'>Password</label>
                  </div>
               </div>
               <ErrorMsg02 msg={errors.password?.message} />
            </div>
         </div>
         <div className='tp-login-bottom mt-4'>
            <button id='signup' type='submit' className='tp-login-btn w-100'>
               Sign Up
            </button>
         </div>
      </form>
   );
};

export default RegisterForm;
