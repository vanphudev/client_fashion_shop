import { useState } from "react";
import { useSelector } from "react-redux";
import useCartInfo from "@/hooks/use-cart-info";
import ErrorMsg02 from "../common/error-msg02";
import formatCurrency from "@/lib/funcMoney";

import { usePaymentmethodGetactiveQuery } from "@/redux/features/paymentMethodApi";

const CheckoutOrderArea = ({ checkoutData }) => {
   const {
      cartTotal = 0,
      isCheckoutSubmit,
      register,
      errors,
      discountAmount,
   } = checkoutData;

   const { cart_products } = useSelector((state) => state.cart);
   const { data: payments, isLoading: paymentLoading, isError: paymentError } = usePaymentmethodGetactiveQuery();
   const { total } = useCartInfo();
   return (
      <div className='tp-checkout-place white-bg'>
         <h3 className='tp-checkout-place-title'>Thông tin thanh toán</h3>
         <div className='tp-order-info-list' style={{ marginBottom: '10px' }}>
            <ul>
               {/*  header */}
               <li className='tp-order-info-list-header'>
                  <h4>Sản phẩm</h4>
                  <h4>Thành tiền</h4>
               </li>
               {cart_products.map((item) => (
                  <li key={item._id} className='tp-order-info-list-desc'>
                     <p>
                        {item.productId.name} <span> x {item.quantity}</span>
                     </p>
                     <span>{formatCurrency(Number(item.productId.price))}</span>
                  </li>
               ))}
               <li className='tp-order-info-list-subtotal'>
                  <span style={{ color: "#0989FF", fontWeight: "bold", fontSize: "15px" }}>Tổng số lượng sản phẩm</span>
                  <span>{cart_products.length} sản phẩm</span>
               </li>
               {/*  subtotal */}
               <li className='tp-order-info-list-subtotal'>
                  <span style={{ color: "#0989FF", fontWeight: "bold", fontSize: "15px" }}>Tổng tiền</span>
                  <span>{formatCurrency(Number(total))}</span>
               </li>

               {/* discount */}
               <li className='tp-order-info-list-subtotal'>
                  <span style={{ color: "#0989FF", fontWeight: "bold", fontSize: "15px" }}>Tổng tiền giảm giá</span>
                  <span>{formatCurrency(Number(discountAmount))}</span>
               </li>

               {/* total */}
               <li className='tp-order-info-list-total'>
                  <span style={{ color: "#0989FF", fontWeight: "bold", fontSize: "18px" }}>Tổng thanh toán</span>
                  <span style={{ color: "red", fontWeight: "bold", fontSize: "18px" }}>
                     {formatCurrency(Number(cartTotal))}
                  </span>
               </li>
            </ul>
         </div>
         <h3 className='tp-checkout-place-title'>Phương thức thanh toán</h3>
         <div style={{ margin: '20px 0', padding: '15px', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
            {paymentLoading && <p>Đang tải phương thức thanh toán...</p>}
            {paymentError && <p>Lỗi khi tải phương thức thanh toán.</p>}
            {payments?.data?.paymentMethods?.map((payment) => (
               <div key={payment._id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  backgroundColor: 'white',
                  transition: 'background-color 0.3s ease',
               }}>
                  <input
                     {...register('payment', {
                        required: 'Payment Option is required!',
                     })}
                     type='radio'
                     id="COD"
                     name='payment'
                     value={payment.code}
                     style={{ marginRight: '10px', transform: 'scale(1.3)' }}
                  />
                  <label htmlFor={payment._id} style={{ fontSize: '16px', color: '#333', fontWeight: 'bold' }}>
                     {payment.name}
                  </label>
               </div>
            ))}
            <ErrorMsg02 msg={errors?.payment?.message} />
         </div>
         <div className='tp-checkout-btn-wrapper'>
            <button type='submit' disabled={isCheckoutSubmit} id="btn-submit-order" className='tp-checkout-btn w-100'>
               Thanh toán đơn hàng
            </button>
         </div>
      </div>
   );
};

export default CheckoutOrderArea;
