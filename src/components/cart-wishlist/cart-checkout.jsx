import React from "react";
import Link from "next/link";
import useCartInfo from "@/hooks/use-cart-info";
import { useState } from "react";
import formatCurrency from "@/lib/funcMoney";
import { useDispatch, useSelector } from "react-redux";
const CartCheckout = () => {
   const { total } = useCartInfo();
   const { cart_products } = useSelector((state) => state.cart);
   return (
      <div className="tp-cart-checkout-wrapper">
         <div className="tp-cart-checkout-top d-flex align-items-center justify-content-between">
            <span className="tp-cart-checkout-top-title">Tổng tiền</span>
            <span className="tp-cart-checkout-top-price">{formatCurrency(total)}</span>
         </div>
         <div className="tp-cart-checkout-shipping">
            <h4 className="tp-cart-checkout-shipping-title">
               Số lượng sản phẩm: Có{" "}
               <span style={{ color: "red", fontWeight: "bold", fontSize: "20px" }}>
                  {cart_products.length}
               </span>{" "}
               sản phẩm
            </h4>
            <span style={{ color: "green", fontWeight: "bold", fontSize: "16px" }}>
               Không có chi phí phát sinh thêm!
            </span>
         </div>
         <div className="tp-cart-checkout-total d-flex align-items-center justify-content-between">
            <span>Tổng hóa đơn</span>
            <span>{formatCurrency(total)}</span>
         </div>
         <div className="tp-cart-checkout-proceed">
            <Link href="/checkout" className="tp-cart-checkout-btn w-100" id="btn-checkout">
               Thanh toán
            </Link>
         </div>
      </div>
   );
};

export default CartCheckout;
