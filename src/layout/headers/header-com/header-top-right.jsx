import Link from "next/link";
import {useRouter} from "next/router";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLogoutUserMutation} from "@/redux/features/auth/authApi";
import {userLoggedOut} from "@/redux/features/auth/authSlice";
import {User} from "@/svg";
import {notifySuccess, notifyError} from "@/utils/toast";
function ProfileSetting({active, handleActive}) {
   const {user} = useSelector((state) => state.auth);
   const [logoutUser, {}] = useLogoutUserMutation();
   const dispatch = useDispatch();
   const router = useRouter();

   const handleLogout = () => {
      logoutUser().then((result) => {
         if (result?.error) {
            notifyError(result?.error.data.message);
         } else {
            dispatch(userLoggedOut());
            router.push("/login");
            notifySuccess("Đăng xuất thành công !");
            return;
         }
      });
   };

   return (
      <>
         <div className='d-flex align-items-center gap-2'>
            <h6 className='p-0 m-0'>{user ? "Xin chào, " + user?.ten_khach_hang : "Thông tin Tài khoản"}</h6>
            <div className='tp-header-top-menu-item tp-header-setting'>
               <span
                  onClick={() => handleActive("setting")}
                  className='tp-header-setting-toggle'
                  id='tp-header-setting-toggle'>
                  <User />
               </span>
               <ul className={active === "setting" ? "tp-setting-list-open" : ""}>
                  <li>
                     <Link href='/profile'>Thông tin của tôi</Link>
                  </li>
                  <li>
                     <Link href='/cart'>Giỏ hàng</Link>
                  </li>
                  <li>
                     {!user?.ten_khach_hang && (
                        <Link href='/login' className='cursor-pointer'>
                           Đăng nhập
                        </Link>
                     )}
                     {user?.ten_khach_hang && (
                        <a onClick={handleLogout} className='cursor-pointer'>
                           Đăng xuất
                        </a>
                     )}
                  </li>
               </ul>
            </div>
         </div>
      </>
   );
}

const HeaderTopRight = () => {
   const [active, setIsActive] = useState("");
   const handleActive = (type) => {
      if (type === active) {
         setIsActive("");
      } else {
         setIsActive(type);
      }
   };
   return (
      <div className='tp-header-top-menu d-flex align-items-center justify-content-end'>
         <ProfileSetting active={active} handleActive={handleActive} />
      </div>
   );
};

export default HeaderTopRight;
