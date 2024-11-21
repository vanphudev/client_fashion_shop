import dayjs from "dayjs";
import Image from "next/image";
import React from "react";
import { Rating } from "react-simple-star-rating";

const ReviewItem = ({ ratings }) => {
   const { userId, rating, review, date } = ratings || {};
   return (
      <div className='tp-product-details-review-avater d-flex align-items-start'>
         <div className='tp-product-details-review-avater-thumb'>
            <a href='#'>{<Image src="https://res.cloudinary.com/dkhkjaual/image/upload/v1728985112/9187604_ntt4zq.webp" alt='user img' width={60} height={60} />}</a>
         </div>
         <div className='tp-product-details-review-avater-content'>
            {!userId?.fullName && <h5 className='review-name'>{userId?.fullName ? userId?.fullName : "Users"}</h5>}
            <div className='tp-product-details-review-avater-rating d-flex align-items-center'>
               <Rating allowFraction size={20} initialValue={rating} readonly={true} />
            </div>
            <span className='tp-product-details-review-avater-meta'>{dayjs(date).format("DD/MM/YYYY")}</span>
            <div className='tp-product-details-review-avater-comment'>
               <p style={{ color: "black" }}>{review}</p>
            </div>
         </div>
      </div>
   );
};

export default ReviewItem;
