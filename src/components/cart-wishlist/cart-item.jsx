import React, { useEffect, useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import Link from "next/link";
// internal
import { Close, Minus, Plus } from "@/svg";
import { load_cart_products } from "@/redux/features/cartSlice";
import {useAddToCartMutation} from "@/redux/features/cartSlice";
import formatCurrency from "@/lib/funcMoney";
import { useIncreaseProductQuantityMutation, useDecreaseProductQuantityMutation, useGetCartByUserQuery, useRemoveFromCartMutation } from "@/redux/features/cartSlice";
import { notifySuccess, notifyError } from "@/utils/toast";



const CartItem = ({ product }) => {

   const { thuoc_tinh_san_pham, so_luong } = product || {};
   const { data: cartData, refetch } = useGetCartByUserQuery();
   const [removeToCart, { }] = useRemoveFromCartMutation();
   const dispatch = useDispatch();
   const [addToCart, {}] = useAddToCartMutation();

   const handleIncrease = (prd) => {
      increaseProduct(prd);
   };

   const increaseProduct = async (product) => {
      try {
         const isAuthenticate = Cookies.get("userInfo");
         if (!isAuthenticate) {
            router.push("/login");
            notifyError("Bạn chưa đăng nhập !");
            return;
         }
         const data = await addToCart({
            ma_thuoc_tinh: product.ma_thuoc_tinh,
            so_luong: 1,
            is_Decrease: false,
         });
         if (data?.error) {
            notifyError("Đã có lỗi khi cập nhật - Load lại trang !");
            return;
         }
         if (data.data.status === 200) {
            refetch();
         }
      } catch (error) {
         notifyError("Đã xảy ra lỗi khi tăng số lượng sản phẩm trong giỏ hàng." + error);
      }
   }

   const handleDecrease = (prd) => {
      decreaseProduct(prd);
   };

   const decreaseProduct = async (product) => {
      try {
         const isAuthenticate = Cookies.get("userInfo");
         if (!isAuthenticate) {
            router.push("/login");
            notifyError("Bạn chưa đăng nhập !");
            return;
         }
         const data = await addToCart({
            ma_thuoc_tinh: product.ma_thuoc_tinh,
            so_luong: so_luong,
            is_Decrease: true,
         });
         if (data?.error) {
            notifyError("Đã có lỗi khi cập nhật - Load lại trang !");
            return;
         }
         if (data.data.status === 200) {
            refetch();
         }
      } catch (error) {
         notifyError("Đã xảy ra lỗi khi giảm số lượng sản phẩm trong giỏ hàng." + error);
      }
   }

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
   }

   useEffect(() => {
      if (cartData) {
         const cart_products = cartData?.metadata?.gio_hang || [];
         dispatch(load_cart_products(cart_products));
      }
   }, [cartData, dispatch]);

   return (
      <tr>
         {/* img */}
         <td className='tp-cart-img'>
            <Link href={`/product-details/${thuoc_tinh_san_pham?.san_pham?.slug}`}>
               <Image src={thuoc_tinh_san_pham?.san_pham?.thumbnail_image} alt='product img' width={70} height={100} />
            </Link>
         </td>
         {/* title */}
         <td className='tp-cart-title'>
            <Link href={`/product-details/${thuoc_tinh_san_pham?.san_pham?.slug}`} id={`product-${thuoc_tinh_san_pham?.san_pham?.slug}-name`}>
               {thuoc_tinh_san_pham?.san_pham?.ten_san_pham}
            </Link>
         </td>
         {/* price */}
         <td className='tp-cart-price'>
            <span>{formatCurrency((thuoc_tinh_san_pham?.gia_ban * so_luong).toFixed(3))}</span>
         </td>
         {/* quantity */}
         <td className='tp-cart-quantity'>
            <div className='tp-product-quantity mt-10 mb-10'>
               <span onClick={() => handleDecrease(thuoc_tinh_san_pham)} className='tp-cart-minus'>
                  <Minus />
               </span>
               <input className='tp-cart-input' type='text' value={so_luong} readOnly />
               <span onClick={() => handleIncrease(thuoc_tinh_san_pham)} className='tp-cart-plus'>
                  <Plus />
               </span>
            </div>
         </td>
         {/* action */}
         <td className='tp-cart-attributes'>
            <div>
               <span>Màu sắc: {thuoc_tinh_san_pham.mau_sac.ten_mau_sac || "Chưa chọn"}</span>
            </div>
            <div>
               <span>Kích thước: {thuoc_tinh_san_pham.kich_thuoc.ten_kich_thuoc || "Chưa chọn"}</span>
            </div>
         </td>
         <td
            className='tp-cart-action'
         >
            <button
               onClick={() => handleRemovePrd(thuoc_tinh_san_pham)}
               style={{
                  backgroundColor: '#ff4d4f', // Màu nền đỏ
                  color: '#fff',              // Màu chữ trắng
                  border: 'none',             // Không có viền
                  borderRadius: '5px',        // Bo tròn các góc
                  padding: '8px 16px',        // Khoảng cách bên trong nút
                  fontSize: '16px',           // Kích thước chữ
                  cursor: 'pointer',          // Hiệu ứng con trỏ khi hover
                  transition: 'background-color 0.3s ease', // Hiệu ứng chuyển màu
               }}
               onMouseEnter={(e) => (e.target.style.backgroundColor = '#ff7875')} // Hiệu ứng hover
               onMouseLeave={(e) => (e.target.style.backgroundColor = '#ff4d4f')} // Trở về màu ban đầu
            >
               <span>Xóa</span>
            </button>
         </td>
      </tr>
   );
};

export default CartItem;
