import * as dayjs from "dayjs";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useElements, useStripe} from "@stripe/react-stripe-js";
import {useForm} from "react-hook-form";
import {useRouter} from "next/router";
import useCartInfo from "./use-cart-info";
import {set_shipping} from "@/redux/features/order/orderSlice";
import {load_cart_products} from "@/redux/features/cartSlice";
import {notifyError, notifySuccess} from "@/utils/toast";
import {useGetCartByUserQuery} from "@/redux/features/cartSlice";
import {useSaveOrderMutation} from "@/redux/features/order/orderApi";
import {useCheckVoucherMutation} from "@/redux/features/coupon/couponApi";

const useCheckoutSubmit = () => {
   // offerCoupons
   const [checkVoucher, {data, error, isLoading}] = useCheckVoucherMutation();
   // addOrder
   const [saveOrder, {}] = useSaveOrderMutation();
   // cart_products
   const {cart_products} = useSelector((state) => state.cart);
   // user
   const {user} = useSelector((state) => state.auth);

   // total amount
   const {total, setTotal} = useCartInfo();

   const [cartTotal, setCartTotal] = useState(0);
   // couponInfo
   const [couponInfo, setCouponInfo] = useState({});
   // discountAmount
   const [discountAmount, setDiscountAmount] = useState(0);
   // isCheckoutSubmit
   const [isCheckoutSubmit, setIsCheckoutSubmit] = useState(false);
   // coupon apply message
   const [couponApplyMsg, setCouponApplyMsg] = useState("");

   const {data: cartData} = useGetCartByUserQuery();

   const dispatch = useDispatch();
   const router = useRouter();

   const {
      handleSubmit,
      register,
      setValue,
      formState: {errors},
   } = useForm();

   let couponRef = useRef("");

   useEffect(() => {
      let discountAmount = 0;
      if (couponInfo) {
         const discountValue = Number(couponInfo?.gia_tri) || 0;
         discountAmount = Number(total * (discountValue / 100));
      }

      setDiscountAmount(discountAmount);
      let finalPrice = total - discountAmount;
      setCartTotal(finalPrice);
   }, [total, cart_products, couponInfo]);

   // handleCouponCode
   const handleCouponCode = (e) => {
      e.preventDefault();

      if (!couponRef.current?.value) {
         notifyError("Vui lòng nhập mã khuyến mãi nếu có !");
         return;
      }

      const voucherCode = couponRef.current.value;
      if (voucherCode) {
         checkVoucher({code: voucherCode, tong_tien: total}).then((res) => {
            if (res?.error) {
               notifyError(res?.error?.data?.message);
               return;
            } else {
               const coupon = res?.data?.metadata?.khuyen_mai;
               setCouponInfo(coupon);
               setCouponApplyMsg(`Mã khuyến mãi ${coupon.code} đã được áp dụng cho hóa đơn của bạn!`);
               setTimeout(() => {
                  couponRef.current.value = "";
                  setCouponApplyMsg("");
               }, 5000);
            }
         });
      } else {
         notifyError("Vui lòng nhập mã giảm giá nếu có !");
         return;
      }
   };

   useEffect(() => {
      const cart_products = cartData?.metadata?.gio_hang || [];
      dispatch(load_cart_products(cart_products));
   }, [cartData, dispatch]);

   //set values
   useEffect(() => {
      setValue("name", user.ten_khach_hang);
      setValue("phone", user.dien_thoai);
      // setValue("email", user.email);
      setValue("dia_chi", user.dia_chi);
   }, [user, setValue, router]);

   // submitHandler
   const submitHandler = async (data) => {
      setIsCheckoutSubmit(true);
      const details_products =
         cart_products?.map((item) => ({
            ma_thuoc_tinh: item.thuoc_tinh_san_pham.ma_thuoc_tinh,
            ma_san_pham: item.thuoc_tinh_san_pham.ma_san_pham,
            gia_ban: item.thuoc_tinh_san_pham.gia_ban,
            so_luong: item.thuoc_tinh_san_pham.so_luong,
         })) || [];
      let orderInfo = {
         name: data.name,
         address: data.dia_chi,
         ma_khach_hang: user.ma_khach_hang,
         phone: data.phone,
         trang_thai_giao_hang: "Pending",
         items: details_products,
         ma_khuyen_mai: couponInfo?.ma_khuyen_mai || "",
         paymentMethod: data.payment,
         totalPrice: total,
         discountAmount: discountAmount,
         finalPrice: cartTotal,
      };
      saveOrder({
         ...orderInfo,
      }).then((res) => {
         if (res?.error) {
            notifyError(res?.error?.data?.message);
         } else {
            notifySuccess("Đặt hàng thành công !");
            console.log("res", res);
            router.push(`/order/${res?.data?.metadata?.hoa_don?.hoa_don?.ma_hoa_don}`);
         }
         setIsCheckoutSubmit(false);
      });
   };

   return {
      handleCouponCode,
      couponRef,
      discountAmount,
      total,
      isCheckoutSubmit,
      setTotal,
      register,
      errors,
      submitHandler,
      handleSubmit,
      couponApplyMsg,
      cartTotal,
   };
};

export default useCheckoutSubmit;
