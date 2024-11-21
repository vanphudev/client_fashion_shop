import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import Link from "next/link";
// internal
import { Close, Minus, Plus } from "@/svg";
import { load_cart_products } from "@/redux/features/cartSlice";
import formatCurrency from "@/lib/funcMoney";
import { useIncreaseProductQuantityMutation, useDecreaseProductQuantityMutation, useGetCartByUserQuery, useRemoveFromCartMutation } from "@/redux/features/cartSlice";
import { notifySuccess, notifyError } from "@/utils/toast";
const CartItem = ({ product }) => {
   const { _id, productId, quantity } = product || {};
   const { data: cartData, refetch } = useGetCartByUserQuery();
   const [increaseProductQuantity, { }] = useIncreaseProductQuantityMutation();
   const [decreaseProductQuantity, { }] = useDecreaseProductQuantityMutation();
   const [removeToCart, { }] = useRemoveFromCartMutation();
   const dispatch = useDispatch();

   const handleIncrease = (prd) => {
      increaseProduct(prd);
   };

   const increaseProduct = async (product) => {
      try {
         const data = await increaseProductQuantity({
            productId: product._id,
         });

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
            refetch();
         }
      } catch (error) {
         notifyError("Đã xảy ra lỗi khi tăng số lượng sản phẩm trong giỏ hàng.", error);
      }
   }

   const handleDecrease = (prd) => {
      decreaseProduct(prd);
   };

   const decreaseProduct = async (product) => {
      try {
         const data = await decreaseProductQuantity({
            productId: product._id,
         });

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
            refetch();
         }
      } catch (error) {
         notifyError("Đã xảy ra lỗi khi giảm số lượng sản phẩm trong giỏ hàng.", error);
      }
   }

   const handleRemovePrd = (prd) => {
      removeProductCartById(prd);
   };

   const removeProductCartById = async (product) => {
      try {
         const data = await removeToCart({
            productId: product?.productId?._id,
         });

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
            refetch();
            notifySuccess("Xóa sản phẩm khỏi giỏ hàng thành công !");
         }
      } catch (error) {
         notifyError("Đã xảy ra lỗi khi xóa sản phẩm ra khỏi giỏ hàng.", error);
      }
   }


   useEffect(() => {
      if (cartData) {
         const cart_products = cartData?.data?.cart?.items || [];
         dispatch(load_cart_products(cart_products)); // Cập nhật Redux với giỏ hàng mới
      }
   }, [cartData, dispatch]);

   return (
      <tr>
         {/* img */}
         <td className='tp-cart-img'>
            <Link href={`/product-details/${productId.productUrl}`}>
               <Image src={productId.images[0]} alt='product img' width={70} height={100} />
            </Link>
         </td>
         {/* title */}
         <td className='tp-cart-title'>
            <Link href={`/product-details/${productId.productUrl}`} id={`product-${productId.productUrl}-name`}>
               {productId.name}
            </Link>
         </td>
         {/* price */}
         <td className='tp-cart-price'>
            <span>{formatCurrency((productId.price * quantity).toFixed(3))}</span>
         </td>
         {/* quantity */}
         <td className='tp-cart-quantity'>
            <div className='tp-product-quantity mt-10 mb-10'>
               <span onClick={() => handleDecrease(productId)} className='tp-cart-minus'>
                  <Minus />
               </span>
               <input className='tp-cart-input' id={`product-${productId.productUrl}-quantity`} type='text' value={quantity} readOnly />
               <span onClick={() => handleIncrease(productId)} className='tp-cart-plus'>
                  <Plus />
               </span>
            </div>
         </td>
         {/* action */}
         <td
            className='tp-cart-action'
         >
            <button
               onClick={() => handleRemovePrd(product)}
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
