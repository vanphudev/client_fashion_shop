import React, { useEffect, useState, useCallback } from "react";
import { Rating } from "react-simple-star-rating";
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { Minus, Plus } from '@/svg';
import { useRouter } from 'next/router';
import DetailsBottomInfo from "./details-bottom-info";
import { handleModalClose } from "@/redux/features/productModalSlice";
import { useAddToCartMutation } from "@/redux/features/cartSlice";
import formatCurrency from "@/lib/funcMoney";
import {
   load_cart_products,
} from "@/redux/features/cartSlice";
import { useIncreaseProductQuantityMutation, useDecreaseProductQuantityMutation, useGetCartByUserQuery } from "@/redux/features/cartSlice"
import { notifySuccess, notifyError } from "@/utils/toast";
const DetailsWrapper = ({ productItem, handleImageActive, activeImg, detailsBottom = false }) => {
   const product = productItem || {};

   const { data: cartData, refetch, isUninitialized } = useGetCartByUserQuery();
   const { cart_products } = useSelector((state) => state.cart);
   const isAddedToCart = Array.isArray(cart_products) && cart_products.some((prd) => prd?.productId._id === _id);
   const isCartReady = Array.isArray(cart_products) && cart_products.length > 0;
   const [ratingVal, setRatingVal] = useState(0);
   const [textMore, setTextMore] = useState(false);
   const dispatch = useDispatch();
   const [addToCart, { }] = useAddToCartMutation();
   const [orderQuantity, setOrderQuantity] = useState(1);
   const router = useRouter();

   const refetchTeam = useCallback(() => {
      if (!isUninitialized) {
         refetch();
      }
   }, [isUninitialized, refetch]);

   useEffect(() => {
      if (product?.danh_gia_san_pham && product?.danh_gia_san_pham.length > 0) {
         const rating = product?.danh_gia_san_pham?.reduce((acc, review) => acc + review.diem_danh_gia, 0) /product?. danh_gia_san_pham?.length;
         setRatingVal(rating);
      } else {
         setRatingVal(0);
      }
   }, [product?.danh_gia_san_pham]);

   const handleClick = () => {
      dispatch(handleModalClose());
      handleAddProduct(product);
   };

   const [increaseProductQuantity, { }] = useIncreaseProductQuantityMutation();
   const [decreaseProductQuantity, { }] = useDecreaseProductQuantityMutation();

   const handleIncreaseNonCart = () => {
      setOrderQuantity(prevQuantity => prevQuantity + 1);
   };

   const handleDecreaseNonCart = () => {
      setOrderQuantity(prevQuantity => Math.max(prevQuantity - 1, 1));
   };

   const handleIncrease = (prd) => {
      increaseProduct(prd);
   };

   const increaseProduct = async (product) => {
      try {
         handleIncreaseNonCart();

         if (!isAddedToCart) {
            return;
         }

         const isAuthenticate = Cookies.get("userInfo");
         if (!isAuthenticate) {
            router.push("/login")
            notifyError("Bạn chưa đăng nhập !");
            return;
         };

         const data = await increaseProductQuantity({
            productId: product._id,
         });

         if (data?.error) {
            notifyError(data.error.data.message);
            return;
         }

         if (data.data.status === 200) {
            refetchTeam();
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
         handleDecreaseNonCart();

         if (!isAddedToCart) {
            return;
         }
         const isAuthenticate = Cookies.get("userInfo");
         if (!isAuthenticate) {
            router.push("/login")
            notifyError("Bạn chưa đăng nhập !");
            return;
         };
         const data = await decreaseProductQuantity({
            productId: product._id,
         });

         if (data?.error) {
            notifyError(data.error.data.message);
            return;
         }

         if (data.data.status === 200) {
            refetchTeam();
         }
      } catch (error) {
         notifyError("Đã xảy ra lỗi khi giảm số lượng sản phẩm trong giỏ hàng.", error);
      }
   }

   const handleAddProduct = (prd) => {
      addProductToCart(prd);
   };

   const addProductToCart = async (product) => {
      try {
         if (isAddedToCart) {
            notifySuccess(`Sản phẩm ${product?.ten_san_pham} đã được thêm vào giỏ hàng !`);
            return;
         }

         const isAuthenticate = Cookies.get("userInfo");
         if (!isAuthenticate) {
            router.push("/login")
            notifyError("Bạn chưa đăng nhập !");
            return;
         };

         const data = await addToCart({
            productId: product._id,
            quantity: orderQuantity,
         });

         if (data?.error) {
            notifyError("Thêm sản phẩm thất bại !");
            return;
         }

         if (data.data.status === 200) {
            refetchTeam();
            notifySuccess("Thêm sản phẩm vào giỏ thành công !");
         }

      } catch (error) {
         notifyError("Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng." + error);
      }
   };

   useEffect(() => {
      if (cartData) {
         const cart_products = cartData?.data?.cart?.items || [];
         dispatch(load_cart_products(cart_products));
      }
   }, [cartData, dispatch]);

   const quantityCount = isCartReady
      ? cart_products.find((prd) => prd?.productId._id === _id)?.quantity || 0
      : 0;

   useEffect(() => {
      if (quantityCount > 0) {
         setOrderQuantity(quantityCount);
      }
   }, [quantityCount]);

   return (
      <div className='tp-product-details-wrapper'>
         <div className='tp-product-details-category'>
            <span>{product?.ten_san_pham}</span>
         </div>
         <h3 className='tp-product-details-title'>{product?.ten_san_pham}</h3>

         {/* inventory details */}
         <div className='tp-product-details-inventory d-flex align-items-center mb-10'>
            <div className='tp-product-details-rating-wrapper d-flex align-items-center mb-10'>
               <div className='tp-product-details-rating'>
                  <Rating allowFraction size={16} initialValue={ratingVal} readonly={true} />
               </div>
               <div className='tp-product-details-reviews'>
                  <span>({product?.ratings && product?.ratings.length > 0 ? product?.ratings.length : 0} Review)</span>
               </div>
            </div>
         </div>
         <p style={{ cursor: "pointer" }}>
            {textMore ? product?.mo_ta : `${product?.mo_ta?.substring(0, 100)}...  `}
            <span onClick={() => setTextMore(!textMore)}>{textMore ? "Thu gọn" : "Xem thêm"}</span>
         </p>

         <div className='tp-product-details-price-wrapper mb-20'>
            {product?.giam_gia > 0 ? (
               <>
                  <span className='tp-product-details-price old-price'>  {formatCurrency(product?.gia_thap_nhat)} {" - "} {formatCurrency(product?.gia_cao_nhat)}</span>
                  <span className='tp-product-details-price new-price'>
                  {formatCurrency(
                              (Number(product?.gia_thap_nhat) - (Number(product?.gia_thap_nhat) * Number(product?.giam_gia)) / 100).toFixed(3)
                           )}
                           {" - "}
                           {formatCurrency(
                              (Number(product?.gia_cao_nhat) - (Number(product?.gia_cao_nhat) * Number(product?.giam_gia)) / 100).toFixed(3)
                           )}
                  </span>
               </>
            ) : (
               <span className='tp-product-details-price new-price'> {formatCurrency(product?.gia_thap_nhat)} {" - "} {formatCurrency(product?.gia_cao_nhat)}</span>
            )}
         </div>

         {
            product?.allOutOfStock == false && (
               <div className='tp-product-details-action-wrapper'>
                  <h3 className='tp-product-details-action-title'>Quantity</h3>
                  <div className='tp-product-details-action-item-wrapper d-sm-flex align-items-center'>
                     <div className="tp-product-details-quantity">
                        <div className="tp-product-quantity mb-15 mr-15">
                           <span className="tp-cart-minus" id="tp-cart-minus" onClick={() => handleDecrease(product)}>
                              <Minus />
                           </span>
                           <input className="tp-cart-input" id="tp-cart-input" type="text" readOnly value={orderQuantity} />
                           <span className="tp-cart-plus" id="tp-cart-plus" onClick={() => handleIncrease(productItem)}>
                              <Plus />
                           </span>
                        </div>
                     </div>
                     <div className='tp-product-details-add-to-cart mb-15 w-100'>
                        {
                           isAddedToCart ? (
                              <button
                                 onClick={() => handleAddProduct(product)}
                                 disabled={product?.allOutOfStock == true}
                                 id="btn-add-to-cart"
                                 className='tp-product-details-add-to-cart-btn w-100'>
                                 Add To Cart
                              </button>
                           ) : (
                              <button
                                 onClick={handleClick}
                                 id="btn-add-to-cart"
                                 disabled={product?.allOutOfStock == true}
                                 className='tp-product-details-add-to-cart-btn w-100'>
                                 Add To Cart
                              </button>
                           )
                        }
                     </div>
                  </div>
                  <Link href='/cart' onClick={() => dispatch(handleModalClose())}>
                     <button className='tp-product-details-buy-now-btn w-100' disabled={product?.allOutOfStock == true}>Buy Now</button>
                  </Link>
               </div>
            )
         }
         {detailsBottom && <DetailsBottomInfo category={product?.loai_san_pham?.name} tag={product?.slug} />}
      </div>
   );
};

export default DetailsWrapper;
