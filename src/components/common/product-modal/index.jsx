import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactModal from "react-modal";
// internal
import { handleModalClose } from "@/redux/features/productModalSlice";
import DetailsThumbWrapper from "@/components/product-details/details-thumb-wrapper";
import DetailsWrapper from "@/components/product-details/details-wrapper";
import { initialOrderQuantity } from "@/redux/features/cartSlice";

const customStyles = {
   content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "calc(100% - 300px)",
   },
};

const ProductModal = () => {
   const { productItem, isModalOpen } = useSelector((state) => state.productModal);
   const { images, inventory } = productItem || {};
   const [activeImg, setActiveImg] = useState(images && images.length > 0 ? images[0] : null);
   const [loading, setLoading] = useState(false);
   const dispatch = useDispatch();

   useEffect(() => {
      if (Array.isArray(images) && images.length > 0) {
         setActiveImg(images[0]);
      }
      dispatch(initialOrderQuantity());
      setLoading(false);
   }, [images, dispatch]);

   const handleImageActive = (item) => {
      if (item) {
         setActiveImg(item);
         setLoading(true);
      }
   };
   return (
      <div>
         <ReactModal
            isOpen={isModalOpen}
            onRequestClose={() => dispatch(handleModalClose())}
            style={customStyles}
            contentLabel='Product Modal'>
            <div className='tp-product-modal'>
               <div className='tp-product-modal-content d-lg-flex'>
                  <button
                     onClick={() => dispatch(handleModalClose())}
                     type='button'
                     className='tp-product-modal-close-btn'>
                     <i className='fa-regular fa-xmark'></i>
                  </button>
                  <DetailsThumbWrapper
                     activeImg={activeImg}
                     handleImageActive={handleImageActive}
                     imageURLs={images}
                     imgWidth={416}
                     imgHeight={480}
                     loading={loading}
                     status={inventory}
                  />
                  <DetailsWrapper
                     productItem={productItem}
                     handleImageActive={handleImageActive}
                     activeImg={activeImg}
                  />
               </div>
            </div>
         </ReactModal>
      </div>
   );
};

export default ProductModal;
