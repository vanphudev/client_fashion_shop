import React, {useRef, useEffect, useState} from "react";
import ReviewForm from "../forms/review-form";
import ReviewItem from "./review-item";
import Cookies from "js-cookie";

const DetailsTabNav = ({product}) => {
   const activeRef = useRef(null);
   const marker = useRef(null);
   const isAuthenticate = Cookies.get("userInfo");
   const {renderCompnent, setRenderCompnent} = useState(0);

   const handleRenderCompnent = () => {
      setRenderCompnent(!renderCompnent);
   };

   // handleActive
   const handleActive = (e) => {
      if (e.target.classList.contains("active")) {
         marker.current.style.left = e.target.offsetLeft + "px";
         marker.current.style.width = e.target.offsetWidth + "px";
      }
   };
   useEffect(() => {
      if (activeRef.current?.classList.contains("active")) {
         marker.current.style.left = activeRef.current.offsetLeft + "px";
         marker.current.style.width = activeRef.current.offsetWidth + "px";
      }
   }, []);
   // nav item
   function NavItem({active = false, id, title, linkRef}) {
      return (
         <button
            ref={linkRef}
            className={`nav-link ${active ? "active" : ""}`}
            id={`nav-${id}-tab`}
            data-bs-toggle='tab'
            data-bs-target={`#nav-${id}`}
            type='button'
            role='tab'
            aria-controls={`nav-${id}`}
            aria-selected={active ? "true" : "false"}
            tabIndex='-1'
            onClick={(e) => handleActive(e)}>
            {title}
         </button>
      );
   }

   return (
      <>
         <div className='tp-product-details-tab-nav tp-tab'>
            <nav>
               <div
                  className='nav nav-tabs justify-content-center p-relative tp-product-tab'
                  id='navPresentationTab'
                  role='tablist'>
                  <NavItem active={true} linkRef={activeRef} id='desc' title='Description' />
                  <NavItem id='additional' title='Additional information' />
                  <NavItem id='review' title={`Reviews (${product?.danh_gia_san_pham?.length})`} />
                  <span ref={marker} id='productTabMarker' className='tp-product-details-tab-line'></span>
               </div>
            </nav>
            <div className='tab-content' id='navPresentationTabContent'>
               {/* nav-desc */}
               <div
                  className='tab-pane fade show active'
                  id='nav-desc'
                  role='tabpanel'
                  aria-labelledby='nav-desc-tab'
                  tabIndex='-1'>
                  <div className='tp-product-details-desc-wrapper pt-60'>
                     <div className='row'>
                        <div className='col-xl-12'>
                           <div className='tp-product-details-desc-item'>
                              <div className='row align-items-center'>
                                 <div className='col-lg-12'>
                                    <div className='tp-product-details-desc-content'>
                                       <p>{product?.mo_ta}</p>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               {/* addInfo */}
               <div
                  className='tab-pane fade'
                  id='nav-additional'
                  role='tabpanel'
                  aria-labelledby='nav-additional-tab'
                  tabIndex='-1'>
                  <div className='tp-product-details-additional-info '>
                     <div className='row justify-content-center'>
                        <div className='col-xl-10'>
                           <table>
                              <tbody>
                                 {product?.thong_tin_san_pham?.map((item, i) => (
                                    <tr key={i}>
                                       <td>{item.key_attribute}</td>
                                       <td>{item.value_attribute}</td>
                                    </tr>
                                 ))}
                              </tbody>
                           </table>
                        </div>
                     </div>
                  </div>
               </div>
               {/* review */}
               <div
                  className='tab-pane fade'
                  id='nav-review'
                  role='tabpanel'
                  aria-labelledby='nav-review-tab'
                  tabIndex='-1'>
                  <div className='tp-product-details-review-wrapper pt-60'>
                     <div className='row'>
                        <div className='col-lg-6'>
                           <div className='tp-product-details-review-statics'>
                              <div className='tp-product-details-review-list pr-110'>
                                 <h3 className='tp-product-details-review-title'>Rating & Review</h3>
                                 {product?.danh_gia_san_pham?.length === 0 && (
                                    <h3 className='tp-product-details-review-title'>There are no reviews yet.</h3>
                                 )}
                                 {product?.danh_gia_san_pham?.length > 0 &&
                                    product?.danh_gia_san_pham?.map((item) => (
                                       <ReviewItem key={item.ma_danh_gia} ratings={item} />
                                    ))}
                              </div>
                           </div>
                        </div>
                        <div className='col-lg-6'>
                           {isAuthenticate ? (
                              <div className='tp-product-details-review-form'>
                                 <h3 className='tp-product-details-review-form-title mb-3'>Đánh giá sản phẩm</h3>
                                 <ReviewForm
                                    product_id={product?.ma_san_pham}
                                    handleRenderCompnent={handleRenderCompnent}
                                 />
                              </div>
                           ) : null}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default DetailsTabNav;
