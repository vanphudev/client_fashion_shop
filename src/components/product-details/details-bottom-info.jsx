import React from "react";
import Image from "next/image";
import payment_option_img from '@assets/img/product/icons/payment-option.png';

const DetailsBottomInfo = ({category,tag}) => {
  return (
    <>
      <div className="tp-product-details-query">
        <div className="tp-product-details-query-item d-flex align-items-center">
          <span>Category: </span>
          <p>{category}</p>
        </div>
        <div className="tp-product-details-query-item d-flex align-items-center">
          <span>Tag: </span>
          <p>#{tag}</p>
        </div>
      </div>
      <div className="tp-product-details-msg mb-15">
        <ul>
          <li>Đổi trả dễ dàng trong 30 ngày.</li>
          <li>Đặt hàng trước 2:30 chiều để được giao hàng trong ngày</li>
        </ul>
      </div>
      <div className="tp-product-details-payment d-flex align-items-center flex-wrap justify-content-between">
        <p>
          Guaranteed safe <br /> & secure checkout
        </p>
        <Image src={payment_option_img} alt="payment_option_img" />
      </div>
    </>
  );
};

export default DetailsBottomInfo;
