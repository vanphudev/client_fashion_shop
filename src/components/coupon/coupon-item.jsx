import React from "react";
import dayjs from "dayjs";
import CopyToClipboard from "react-copy-to-clipboard";
import Image from "next/image";
// internal
import OfferTimer from "./offer-timer";
import {InfoDetails} from "@/svg";
import formatCurrency from "@/lib/funcMoney";
const CouponItem = ({coupon, handleCopied, copiedCode, copied}) => {
   return (
      <div className='tp-coupon-item mb-30 p-relative d-md-flex justify-content-between align-items-center'>
         <span className='tp-coupon-border'></span>
         <div className='tp-coupon-item-left d-sm-flex align-items-center'>
            <div className='tp-coupon-thumb'>
               <a href='#'>
                  <Image
                     src='https://res.cloudinary.com/dkhkjaual/image/upload/v1729257893/7403281_ut37dh.jpg'
                     alt='logo'
                     width={120}
                     height={120}
                  />
               </a>
            </div>
            <div className='tp-coupon-content'>
               <h3 className='tp-coupon-title'>{coupon.code}</h3>
               <p className='tp-coupon-offer mb-15'>
                  <span>{coupon.discountValue}%</span>Off
               </p>
               <div className='tp-coupon-countdown'>
                  {dayjs().isAfter(dayjs(coupon.endDate)) ? (
                     <div className='tp-coupon-countdown-inner'>
                        <ul>
                           <li>
                              <span>{0}</span> Day
                           </li>
                           <li>
                              <span>{0}</span> Hrs
                           </li>
                           <li>
                              <span>{0}</span> Min
                           </li>
                           <li>
                              <span>{0}</span> Sec
                           </li>
                        </ul>
                     </div>
                  ) : (
                     <OfferTimer expiryTimestamp={new Date(coupon.endDate)} />
                  )}
               </div>
            </div>
         </div>
         <div className='tp-coupon-item-right pl-20'>
            <div className='tp-coupon-status mb-10 d-flex align-items-center'>
               <h4>
                  Coupon{" "}
                  <span className={dayjs().isAfter(dayjs(coupon.endDate)) ? "in-active" : "active"}>
                     {dayjs().isAfter(dayjs(coupon.endDate)) ? "Inactive" : "Active"}
                  </span>
               </h4>
               <div className='tp-coupon-info-details'>
                  <span>
                     <InfoDetails />
                  </span>
                  <div className='tp-coupon-info-tooltip transition-3'>
                     <p>
                        *This coupon code will apply on <span>Grocery type products</span> and when you shopping more
                        than <span>{formatCurrency(coupon.minOrderValue)}</span>
                     </p>
                  </div>
               </div>
            </div>
            <div className='tp-coupon-date'>
               <CopyToClipboard text={coupon.code} onCopy={() => handleCopied(coupon.code)}>
                  <button>
                     {copied && coupon.code === copiedCode ? <span>Copied!</span> : <span>{coupon.code}</span>}
                  </button>
               </CopyToClipboard>
            </div>
         </div>
      </div>
   );
};

export default CouponItem;
