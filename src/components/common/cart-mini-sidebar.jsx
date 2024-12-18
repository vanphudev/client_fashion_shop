import React, {useEffect, useState} from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import useCartInfo from "@/hooks/use-cart-info";
import RenderCartProgress from "./render-cart-progress";
import empty_cart_img from "@assets/img/product/cartmini/empty-cart.png";
import {closeCartMini, load_cart_products} from "@/redux/features/cartSlice";
import {useRemoveFromCartMutation} from "@/redux/features/cartSlice";
import {useGetCartByUserQuery} from "@/redux/features/cartSlice";
import formatCurrency from "@/lib/funcMoney";
import {notifySuccess, notifyError} from "@/utils/toast";
import {useRouter} from "next/router";

const CartMiniSidebar = () => {
   const {cart_products, cartMiniOpen} = useSelector((state) => state.cart);
   const [removeToCart, {}] = useRemoveFromCartMutation();
   const {data: cartData, refetch} = useGetCartByUserQuery();
   const {total} = useCartInfo();
   const dispatch = useDispatch();

   const router = useRouter();

   const handleRemovePrd = (prd) => {
      removeProductCartById(prd);
   };

   const removeProductCartById = async (product) => {
      try {
         const isAuthenticate = Cookies.get("userInfo");
         if (!isAuthenticate) {
            router.push("/login");
            notifyError("Bạn chưa đăng nhập !");
            return;
         }
         const data = await removeToCart({
            ma_thuoc_tinh: product.ma_thuoc_tinh,
         });
         if (data?.error) {
            notifyError("Đã có lỗi khi cập nhật - Load lại trang !");
            return;
         }
         if (data.data.status === 200) {
            refetch();
            notifySuccess("Xóa sản phẩm khỏi giỏ hàng thành công !");
         }
      } catch (error) {
         notifyError("Đã xảy ra lỗi khi xóa sản phẩm ra khỏi giỏ hàng." + error);
      }
   };

   useEffect(() => {
      if (cartData) {
         const cart_products = cartData?.metadata?.gio_hang || [];
         dispatch(load_cart_products(cart_products));
      }
   }, [cartData, dispatch]);

   const handleCloseCartMini = () => {
      dispatch(closeCartMini());
   };
   return (
      <>
         <div className={`cartmini__area tp-all-font-roboto ${cartMiniOpen ? "cartmini-opened" : ""}`}>
            <div className='cartmini__wrapper d-flex justify-content-between flex-column'>
               <div className='cartmini__top-wrapper'>
                  <div className='cartmini__top p-relative'>
                     <div className='cartmini__top-title'>
                        <h4>Giỏ hàng mua sắm</h4>
                     </div>
                     <div className='cartmini__close'>
                        <button
                           onClick={() => dispatch(closeCartMini())}
                           type='button'
                           className='cartmini__close-btn cartmini-close-btn'>
                           <i className='fal fa-times'></i>
                        </button>
                     </div>
                  </div>
                  <div className='cartmini__shipping'>
                     <RenderCartProgress />
                  </div>
                  {cart_products?.length > 0 && (
                     <div className='cartmini__widget'>
                        {cart_products?.map((item, i) => (
                           <div key={i} className='cartmini__widget-item'>
                              <div className='cartmini__thumb'>
                                 <Link href={`/product-details/${item?.thuoc_tinh_san_pham?.san_pham?.slug}`}>
                                    <Image
                                       src={item?.thuoc_tinh_san_pham?.san_pham?.thumbnail_image}
                                       width={70}
                                       height={60}
                                       alt='product img'
                                    />
                                 </Link>
                              </div>
                              <div className='cartmini__content'>
                                 <h5 className='cartmini__title'>
                                    <Link href={`/product-details/${item?.thuoc_tinh_san_pham?.san_pham?.slug}`}>
                                       {item?.thuoc_tinh_san_pham?.san_pham?.ten_san_pham}
                                    </Link>
                                 </h5>
                                 <div className='cartmini__price-wrapper'>
                                    {item?.thuoc_tinh_san_pham?.san_pham?.giam_gia > 0 ? (
                                       <span className='cartmini__price'>
                                          {formatCurrency(
                                             (
                                                Number(item?.thuoc_tinh_san_pham?.gia_ban) -
                                                (Number(item?.thuoc_tinh_san_pham?.gia_ban) *
                                                   Number(item?.thuoc_tinh_san_pham?.san_pham?.giam_gia)) /
                                                   100
                                             ).toFixed(3)
                                          )}
                                       </span>
                                    ) : (
                                       <span className='cartmini__price'>
                                          {formatCurrency(Number(item?.thuoc_tinh_san_pham?.gia_ban))}
                                       </span>
                                    )}
                                    <span className='cartmini__quantity'> x{item.so_luong}</span>
                                 </div>
                              </div>
                              <a
                                 onClick={() => handleRemovePrd(item?.thuoc_tinh_san_pham)}
                                 className='cartmini__del cursor-pointer'>
                                 <i className='fa-regular fa-xmark'></i>
                              </a>
                           </div>
                        ))}
                     </div>
                  )}
                  {/* if no item in cart */}
                  {cart_products?.length === 0 && (
                     <div className='cartmini__empty text-center'>
                        <Image src={empty_cart_img} alt='empty-cart-img' />
                        <p>Your Cart is empty</p>
                        <Link href='/shop' className='tp-btn'>
                           Go to Shop
                        </Link>
                     </div>
                  )}
               </div>
               <div className='cartmini__checkout'>
                  <div className='cartmini__checkout-title mb-30'>
                     <h4>Tổng tiền:</h4>
                     <span>{formatCurrency(total.toFixed(3))}</span>
                  </div>
                  <div className='cartmini__checkout-btn'>
                     <Link href='/cart' onClick={handleCloseCartMini} className='tp-btn mb-10 w-100'>
                        {" "}
                        View cart
                     </Link>
                     <Link href='/checkout' onClick={handleCloseCartMini} className='tp-btn tp-btn-border w-100'>
                        {" "}
                        Checkout
                     </Link>
                  </div>
               </div>
            </div>
         </div>
         {/* overlay start */}
         <div onClick={handleCloseCartMini} className={`body-overlay ${cartMiniOpen ? "opened" : ""}`}></div>
         {/* overlay end */}
      </>
   );
};

export default CartMiniSidebar;
