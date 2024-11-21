import * as dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import useCartInfo from "./use-cart-info";
import { set_shipping } from "@/redux/features/order/orderSlice";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useSaveOrderMutation } from "@/redux/features/order/orderApi";
import { useCheckVoucherMutation } from "@/redux/features/coupon/couponApi";

const useCheckoutSubmit = () => {
   // offerCoupons
   const [checkVoucher, { data, error, isLoading }] = useCheckVoucherMutation();
   // addOrder
   const [saveOrder, { }] = useSaveOrderMutation();
   // cart_products
   const { cart_products } = useSelector((state) => state.cart);
   // user
   const { user } = useSelector((state) => state.auth);
   // shipping_info
   const { shipping_info } = useSelector((state) => state.order);
   // total amount
   const { total, setTotal } = useCartInfo();

   const [cartTotal, setCartTotal] = useState(0);
   // couponInfo
   const [couponInfo, setCouponInfo] = useState({});
   // discountAmount
   const [discountAmount, setDiscountAmount] = useState(0);
   // isCheckoutSubmit
   const [isCheckoutSubmit, setIsCheckoutSubmit] = useState(false);
   // coupon apply message
   const [couponApplyMsg, setCouponApplyMsg] = useState("");

   const dispatch = useDispatch();
   const router = useRouter();

   const {
      handleSubmit,
      register,
      setValue,
      formState: { errors },
   } = useForm();

   let couponRef = useRef("");

   useEffect(() => {
      let discountAmount = 0;
      if (couponInfo) {
         const discountValue = Number(couponInfo?.discountValue) || 0;
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
         notifyError("Vui lòng nhập mã giảm giá nếu có !");
         return;
      }

      const voucherCode = couponRef.current.value;
      if (voucherCode) {
         checkVoucher({ voucherCode, totalPrice: total }).then((res) => {
            console.log("res", res);
            if (res?.error) {
               notifyError(res?.error.data.message);
               return;
            } else {
               const coupon = res.data?.data?.voucher;
               setCouponInfo(coupon);
               setCouponApplyMsg(`Mã giảm giá ${coupon.code} đã được áp dụng cho hóa đơn của bạn!`);
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

   //set values
   useEffect(() => {
      setValue("name", user.fullName);
      setValue("contactNo", user.phone);
      setValue("email", user.email);
      setValue("orderNote", "");
   }, [user, setValue, shipping_info, router]);

   // submitHandler
   const submitHandler = async (data) => {
      setIsCheckoutSubmit(true);
      const details_products = cart_products?.map((item) => ({
         productId: item.productId._id,
         name: item.productId.name,
         price: item.productId.price,
         quantity: item.quantity
      })) || [];
      let orderInfo = {
         name: data.name,
         shippingAddress: {
            province: data.province,
            district: data.district,
            ward: data.ward,
            address: data.address,
         },
         userId: user._id,
         phone: data.contactNo,
         email: data.email,
         status: "Pending",
         items: details_products,
         voucherId: couponInfo?._id || "",
         paymentMethod: data.payment,
         totalPrice: total,
         discountAmount: discountAmount,
         finalPrice: cartTotal,
         note: data.orderNote,
      };
      if (data.payment === "COD") {
         saveOrder({
            ...orderInfo,
         }).then((res) => {
            if (res?.error) {
               notifyError(res?.error?.data?.message);
            } else {
               notifySuccess("Đặt hàng thành công !");
               router.push(`/order/${res?.data?.data?.orders?._id}`);
            }
            setIsCheckoutSubmit(false);
         });
      }
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
      cartTotal
   };
};

export default useCheckoutSubmit;
