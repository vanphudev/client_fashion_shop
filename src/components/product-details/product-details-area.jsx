import React, {useState, useEffect} from "react";
import DetailsThumbWrapper from "./details-thumb-wrapper";
import DetailsWrapper from "./details-wrapper";
import {useDispatch} from "react-redux";
import DetailsTabNav from "./details-tab-nav";
import RelatedProducts from "./related-products";

const ProductDetailsArea = ({productItem}) => {
   const product = productItem || {};

   const [activeImg, setActiveImg] = useState(
      product?.hinh_anh_san_pham && product?.hinh_anh_san_pham.length > 0 && Array.isArray(product?.hinh_anh_san_pham)
         ? product?.hinh_anh_san_pham[0].hinh_anh
         : ""
   );
   const dispatch = useDispatch();

   useEffect(() => {
      if (Array.isArray(product?.hinh_anh_san_pham) && product?.hinh_anh_san_pham.length > 0) {
         setActiveImg(product?.hinh_anh_san_pham[0].hinh_anh);
      }
   }, [product?.hinh_anh_san_pham]);

   const handleImageActive = (item) => {
      setActiveImg(item);
   };

   return (
      <section className='tp-product-details-area'>
         <div className='tp-product-details-top pb-115'>
            <div className='container'>
               <div className='row'>
                  <div className='col-xl-7 col-lg-6'>
                     {/* product-details-thumb-wrapper start */}
                     <DetailsThumbWrapper
                        activeImg={activeImg}
                        handleImageActive={handleImageActive}
                        imageURLs={product.hinh_anh_san_pham}
                        imgWidth={580}
                        imgHeight={670}
                        status={product.allOutOfStock}
                     />
                     {/* product-details-thumb-wrapper end */}
                  </div>
                  <div className='col-xl-5 col-lg-6'>
                     {/* product-details-wrapper start */}
                     <DetailsWrapper
                        productItem={product}
                        handleImageActive={handleImageActive}
                        activeImg={activeImg}
                        detailsBottom={true}
                     />
                     {/* product-details-wrapper end */}
                  </div>
               </div>
            </div>
         </div>
         {/* product details description */}
         <div className='tp-product-details-bottom pb-140'>
            <div className='container'>
               <div className='row'>
                  <div className='col-xl-12'>
                     <DetailsTabNav product={product} />
                  </div>
               </div>
            </div>
         </div>
         {/* product details description */}
         {/* related products start */}
         <section className='tp-related-product pt-95 pb-50'>
            <div className='container'>
               <div className='row'>
                  <div className='tp-section-title-wrapper-6 text-center mb-40'>
                     <h3 className='tp-section-title-6'>Các sản phẩm liên quan</h3>
                  </div>
               </div>
               <div className='row'>
                  <RelatedProducts id={product?.loai_san_pham?.ma_loai} />
               </div>
            </div>
         </section>
         {/* related products end */}
      </section>
   );
};

export default ProductDetailsArea;
