import React from "react";
import Cookies from 'js-cookie';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import ErrorMsg02 from "../common/error-msg02";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { notifyError, notifySuccess } from "@/utils/toast";

// schema
const schema = Yup.object().shape({
   password: Yup.string().required().min(6).label("Old Password"),
  newPassword: Yup.string().required().min(6).label("New Password"),
  confirmPassword: Yup.string().required().min(6).label("Confirm Password")
});

const ChangePassword = () => {
  const { user } = useSelector((state) => state.auth);
  const [changePassword, {}] = useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });


  const onSubmit = (data) => {
      const isAuthenticate = Cookies.get("userInfo");
   if (!isAuthenticate) {
      router.push("/login")
      notifyError("Bạn chưa đăng nhập !");
      return;
   };
    changePassword({
      id: user?.khach_hang?.tai_khoan_id,
      oldPassword: data.password,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    }).then((result) => {
      if (result?.error) {
        notifyError(result?.error?.data?.message);
      } else {
        notifySuccess(result?.data?.message);
      }
    });
    reset();
  };
  return (
    <div className="profile__password">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-xxl-12">
              <div className="tp-profile-input-box">
                <div className="tp-contact-input">
                  <input
                    {...register("password", {
                      required: `Password is required!`,
                    })}
                    name="password"
                    id="password"
                    type="password"
                  />
                </div>
                <div className="tp-profile-input-title">
                  <label htmlFor="password">Old Password</label>
                </div>
                <ErrorMsg02 msg={errors.password?.message} />
              </div>
            </div>
          <div className="col-xxl-6 col-md-6">
            <div className="tp-profile-input-box">
              <div className="tp-profile-input">
                <input
                  {...register("newPassword", {
                    required: `New Password is required!`,
                  })}
                  name="newPassword"
                  id="newPassword"
                  type="password"
                />
              </div>
              <div className="tp-profile-input-title">
                <label htmlFor="new_pass">New Password</label>
              </div>
              <ErrorMsg02 msg={errors.newPassword?.message} />
            </div>
          </div>
          <div className="col-xxl-6 col-md-6">
            <div className="tp-profile-input-box">
              <div className="tp-profile-input">
                <input
                  {...register("confirmPassword", {
                    required: `Confirm Password is required!`,
                  })}
                  name="confirmPassword"
                  id="confirmPassword"
                  type="password"
                />
              </div>
              <div className="tp-profile-input-title">
                <label htmlFor="confirmPassword">Confirm Password</label>
              </div>
              <ErrorMsg02 msg={errors.confirmPassword?.message} />
            </div>
          </div>
          <div className="col-xxl-6 col-md-6">
            <div className="profile__btn">
              <button type="submit" className="tp-btn">
                Update
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
