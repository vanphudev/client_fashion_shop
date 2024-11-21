import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/router";
import Cookies from "js-cookie"
import Link from 'next/link';
// internal
import { clearCart } from '@/redux/features/cartSlice';
import CartCheckout from './cart-checkout';
import CartItem from './cart-item';
import RenderCartProgress from '../common/render-cart-progress';
import { useGetCartByUserQuery, load_cart_products, useClearCartMutation } from '@/redux/features/cartSlice';
import { notifySuccess, notifyError } from "@/utils/toast";
import Loader from "@/components/loader/loader";
const CartArea = () => {
   const { cart_products } = useSelector((state) => state.cart);
   const router = useRouter();
   const dispatch = useDispatch();
   const { data: cartData, isError, isLoading, refetch } = useGetCartByUserQuery();
   const [clearCart, { isLoading: isRemoving }] = useClearCartMutation();

   // Kiểm tra người dùng có đăng nhập không
   useEffect(() => {
      const isAuthenticate = Cookies.get("userInfo");
      if (!isAuthenticate) {
         router.push("/login");
      }
   }, [router]);

   // Cập nhật Redux store với giỏ hàng
   useEffect(() => {
      if (cartData) {
         const cart_products = cartData?.data?.cart?.items || [];
         dispatch(load_cart_products(cart_products)); // Cập nhật Redux với giỏ hàng mới
      }
   }, [cartData, dispatch]);

   if (isLoading) {
      return (
         <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
            <Loader loading={isLoading} />
         </div>
      );
   }

   if (isError) {
      return (
         <div className="text-center">
            <h3>Error loading cart. Please try again later.</h3>
            <button onClick={() => router.reload()} className="btn btn-primary">
               Reload
            </button>
         </div>
      );
   }

   // Hàm xử lý xóa tất cả sản phẩm khỏi giỏ hàng
   const handleClearCart = async () => {
      try {
         const data = await clearCart(); // Gọi mutation để xóa giỏ hàng

         if (data?.error) {
            notifyError(data.error.data.message);
            return;
         }

         if (data.error?.data.code === 405) {
            notifyError(data.error.data.message);
            router.push("/login");
            return;
         }

         if (data.data.status === 200) {
            refetch(); // Refetch giỏ hàng sau khi xóa thành công
            notifySuccess("Xóa tất cả các sản phẩm trong giỏ hàng thành công !");
         }
      } catch (error) {
         notifyError("Đã xảy ra lỗi khi xóa các sản phẩm trong giỏ hàng.", error);
      }
   };

   return (
      <>
         <section className="tp-cart-area pb-120">
            <div className="container">
               {cart_products.length === 0 &&
                  <div className='text-center pt-50'>
                     <h3>Không có sản phẩm nào trong giỏ hàng</h3>
                     <Link href="/shop" className="tp-cart-checkout-btn mt-20">Tiếp tục mua hàng</Link>
                  </div>
               }
               {cart_products.length > 0 &&
                  <div className="row">
                     <div className="col-xl-9 col-lg-8">
                        <div className="tp-cart-list mb-25 mr-30">
                           <div className="cartmini__shipping">
                              <RenderCartProgress />
                           </div>
                           <table className="table">
                              <thead>
                                 <tr>
                                    <th colSpan="2" className="tp-cart-header-product">Product</th>
                                    <th className="tp-cart-header-price">Price</th>
                                    <th className="tp-cart-header-quantity">Quantity</th>
                                    <th></th>
                                 </tr>
                              </thead>
                              <tbody>
                                 {cart_products.map((item, i) => (
                                    <CartItem key={i} product={item} />
                                 ))}
                              </tbody>
                           </table>
                        </div>
                        <div className="tp-cart-bottom">
                           <div className="row align-items-end">
                              <div className="col-xl-6 col-md-8">
                              </div>
                              <div className="col-xl-6 col-md-4">
                                 <div className="tp-cart-update text-md-end mr-30">
                                    <button onClick={() => handleClearCart()} type="button" className="tp-cart-update-btn"> {isRemoving ? "Đang xóa..." : "Xóa tất cả sản phẩm"}</button>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="col-xl-3 col-lg-4 col-md-6">
                        <CartCheckout />
                     </div>
                  </div>
               }
            </div>
         </section>
      </>
   );
};

export default CartArea;