import React, {useEffect, useState, useCallback} from "react";
import {Rating} from "react-simple-star-rating";
import Cookies from "js-cookie";
import {useDispatch, useSelector} from "react-redux";
import Link from "next/link";
import {Minus, Plus} from "@/svg";
import {useRouter} from "next/router";
import DetailsBottomInfo from "./details-bottom-info";
import {handleModalClose} from "@/redux/features/productModalSlice";
import {useAddToCartMutation} from "@/redux/features/cartSlice";
import formatCurrency from "@/lib/funcMoney";
import {load_cart_products} from "@/redux/features/cartSlice";
import {
   useIncreaseProductQuantityMutation,
   useDecreaseProductQuantityMutation,
   useGetCartByUserQuery,
} from "@/redux/features/cartSlice";
import {notifySuccess, notifyError, notifyWarning} from "@/utils/toast";
const DetailsWrapper = ({productItem, handleImageActive, activeImg, detailsBottom = false}) => {
   const product = productItem || {};

   const [selectedColor, setSelectedColor] = useState(null);
   const [selectedSize, setSelectedSize] = useState(null);

   const attributes = product?.thuoc_tinh_san_pham || [];

   const filteredSizes = selectedColor
   ? attributes.filter(attr => attr.ma_mau_sac === selectedColor).map(attr => attr.kich_thuoc)
   : [];

   const filteredColors = selectedSize
      ? attributes.filter(attr => attr.ma_kich_thuoc === selectedSize).map(attr => attr.mau_sac)
      : [];

   const {data: cartData, refetch, isUninitialized} = useGetCartByUserQuery();
   const {cart_products} = useSelector((state) => state.cart);

   const [ratingVal, setRatingVal] = useState(0);
   const [textMore, setTextMore] = useState(false);

   const dispatch = useDispatch();

   const [addToCart, {}] = useAddToCartMutation();

   const [orderQuantity, setOrderQuantity] = useState(1);

   const [maxQuantity, setMaxQuantity] = useState(0);

   const [selectedAttributeId, setSelectedAttributeId] = useState(null);

   const router = useRouter();
   const refetchTeam = useCallback(() => {
      if (!isUninitialized) {
         refetch();
      }
   }, [isUninitialized, refetch]);

   useEffect(() => {
      if (selectedColor && selectedSize) {
         const selectedAttribute = attributes.find(attr => 
            attr.ma_mau_sac === selectedColor && attr.ma_kich_thuoc === selectedSize
         );
         if (selectedAttribute) {
            setMaxQuantity(selectedAttribute.so_luong_ton); 
            setSelectedAttributeId(selectedAttribute.ma_thuoc_tinh); 
         }
      }
   }, [selectedColor, selectedSize, attributes]);

   // const handleClick = () => {
   //    dispatch(handleModalClose());
   //    handleAddProduct(product);
   // };

   const handleIncreaseNonCart = () => {
      setOrderQuantity((prevQuantity) => {
         if (maxQuantity > 0) {
            if (prevQuantity < maxQuantity) {
               return prevQuantity + 1;
            } else {
               notifyWarning(`Số lượng tối đa là ${maxQuantity}.`); 
            }
         } else {
            notifyWarning(`Vui lòng chọn kích thước và màu sắc !`);
         }
         return prevQuantity; 
      });
   };

   const handleDecreaseNonCart = () => {
      setOrderQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
   };
   
   const handleAddProduct = (prd) => {
      addProductToCart(prd);
   };

   const addProductToCart = async (product) => {
      try {
         const isAuthenticate = Cookies.get("userInfo");
         if (!isAuthenticate) {
            router.push("/login");
            notifyError("Bạn chưa đăng nhập !");
            return;
         }

         const data = await addToCart({
            ma_thuoc_tinh: selectedAttributeId || -1,
            so_luong: orderQuantity,
            is_Decrease: false,
         });

         if (data?.error) {
            notifyError("Thêm sản phẩm thất bại !");
            return;
         }
         if (data.data.status === 200 || data.data.status === 201 ) {
            refetchTeam();
            notifySuccess("Thêm sản phẩm vào giỏ thành công !");
            router.push("/cart");
         }
      } catch (error) {
         notifyError("Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng." + error);
      }
   };

   useEffect(() => {
      if (cartData) {
         const cart_products = cartData?.metadata?.gio_hang || [];
         dispatch(load_cart_products(cart_products));
      }
   }, [cartData, dispatch]);

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
         <p style={{cursor: "pointer"}}>
            {textMore ? product?.mo_ta : `${product?.mo_ta?.substring(0, 100)}...  `}
            <span onClick={() => setTextMore(!textMore)}>{textMore ? "Thu gọn" : "Xem thêm"}</span>
         </p>

         <div className='tp-product-details-price-wrapper mb-20'>
            {product?.giam_gia > 0 ? (
               <>
                  <span className='tp-product-details-price old-price'>
                     {" "}
                     {formatCurrency(product?.gia_thap_nhat)} {" - "} {formatCurrency(product?.gia_cao_nhat)}
                  </span>
                  <span className='tp-product-details-price new-price'>
                     {formatCurrency(
                        (
                           Number(product?.gia_thap_nhat) -
                           (Number(product?.gia_thap_nhat) * Number(product?.giam_gia)) / 100
                        ).toFixed(3)
                     )}
                     {" - "}
                     {formatCurrency(
                        (
                           Number(product?.gia_cao_nhat) -
                           (Number(product?.gia_cao_nhat) * Number(product?.giam_gia)) / 100
                        ).toFixed(3)
                     )}
                  </span>
               </>
            ) : (
               <span className='tp-product-details-price new-price'>
                  {" "}
                  {formatCurrency(product?.gia_thap_nhat)} {" - "} {formatCurrency(product?.gia_cao_nhat)}
               </span>
            )}
         </div>


         <div className='tp-product-details-variation'>
            <h4 className='tp-product-details-variation-title'>Màu sắc:</h4>
            <div className='tp-product-details-variation-list'>
               {attributes.map((item) => (
                  <button
                     key={item.ma_mau_sac}
                     className={`size tp-size-variation-btn ${item.ma_mau_sac === selectedColor ? "active" : ""}`}
                     onClick={() => {
                        setSelectedColor(item.ma_mau_sac);
                        setSelectedAttributeId(null);
                        setMaxQuantity(0);
                        setSelectedSize(null);
                        setOrderQuantity(1);
                     }}>
                     <span style={{ backgroundColor: item.mau_sac.clrCode }}></span>
                     {item.mau_sac.ten_mau_sac}
                  </button>
               ))}
            </div>
         </div>

         {/* Chọn kích thước */}
         <div className='tp-product-details-variation'>
            <h4 className='tp-product-details-variation-title'>Kích thước:</h4>
            <div className='tp-product-details-variation-list'>
               {filteredSizes.map((size) => (
                  <button
                     key={size.ma_kich_thuoc}
                     className={`size tp-size-variation-btn ${size.ma_kich_thuoc === selectedSize ? "active" : ""}`}
                     onClick={() => setSelectedSize(size.ma_kich_thuoc)}>
                     {size.ten_kich_thuoc}
                  </button>
               ))}
            </div>
         </div>

         {product?.allOutOfStock == false && (
            <div className='tp-product-details-action-wrapper'>
               <h3 className='tp-product-details-action-title'>Quantity</h3>
               <div className='tp-product-details-action-item-wrapper d-sm-flex align-items-center'>
                  <div className='tp-product-details-quantity'>
                     <div className='tp-product-quantity mb-15 mr-15'>
                        <span className='tp-cart-minus' id='tp-cart-minus' onClick={() => handleDecreaseNonCart(product)}>
                           <Minus />
                        </span>
                        <input
                           className='tp-cart-input'
                           id='tp-cart-input'
                           type='text'
                           readOnly
                           value={orderQuantity}
                        />
                        <span className='tp-cart-plus' id='tp-cart-plus' onClick={() => handleIncreaseNonCart(product)}>
                           <Plus />
                        </span>
                     </div>
                  </div>
                  <div className='tp-product-details-add-to-cart mb-15 w-100'>
                  <button
                           onClick={() => handleAddProduct(product)}
                           disabled={product?.allOutOfStock == true}
                           id='btn-add-to-cart'
                           className='tp-product-details-add-to-cart-btn w-100'>
                           Add To Cart
                        </button>
                  </div>
               </div>
               <Link href='/cart' onClick={() => dispatch(handleModalClose())}>
                  <button className='tp-product-details-buy-now-btn w-100' disabled={product?.allOutOfStock == true}>
                     Buy Now
                  </button>
               </Link>
            </div>
         )}
         {detailsBottom && <DetailsBottomInfo category={product?.loai_san_pham?.name} tag={product?.slug} />}
      </div>
   );
};

export default DetailsWrapper;
