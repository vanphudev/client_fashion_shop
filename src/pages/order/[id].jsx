import React, {useEffect, useState, useRef} from "react";
import Image from "next/image";
import dayjs from "dayjs";
import ReactToPrint from "react-to-print";
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import Header from "@/layout/headers/header";
import Footer from "@/layout/footers/footer";
import logo from "@assets/img/logo/logo.svg";
import ErrorMsg from "@/components/common/error-msg";
import {useGetUserOrderByIdQuery} from "@/redux/features/order/orderApi";
import PrdDetailsLoader from "@/components/loader/prd-details-loader";
import formatCurrency from "@/lib/funcMoney";

const SingleOrder = ({params}) => {
   const printRef = useRef();
   const {data: order, isError, isLoading} = useGetUserOrderByIdQuery(params.id);

   let content = null;

   if (isLoading) {
      content = <PrdDetailsLoader loading={isLoading} />;
   }
   if (isError) {
      content = <ErrorMsg msg='There was an error' />;
   }

   if (!isLoading && !isError) {
      const order_new = order?.metadata?.hoa_don[0];
      console.log("order_new", order_new);
      content = (
         <>
            <section className='invoice__area pt-120 pb-120'>
               <div className='container'>
                  <div className='invoice__msg-wrapper'>
                     <div className='row'>
                        <div className='col-xl-12'>
                           <div className='invoice_msg mb-40'>
                              <p className='text-black alert alert-success'>
                                 Cảm ơn bạn{" "}
                                 <strong>{order_new?.ma_khach_hang_belongto_khach_hang?.ten_khach_hang}</strong> Đơn
                                 hàng của bạn đã được chúng tôi ghi nhận !
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div
                     ref={printRef} 
                     className='invoice__wrapper grey-bg-2 pt-40 pb-40 pl-40 pr-40 tp-invoice-print-wrapper'>
                     <div className='invoice__header-wrapper border-2 border-bottom border-white mb-40'>
                        <div className='row'>
                           <div className='col-xl-12'>
                              <div className='invoice__header pb-20'>
                                 <div className='row align-items-end'>
                                    <div className='col-md-4 col-sm-6'>
                                       <div className='invoice__left'>
                                          <Image src={logo} alt='logo' />
                                          <p>
                                             Địa chỉ: 140 Lê Trọng Tấn, Tây Thạnh, Tân Phú <br /> Thành Phố Hồ Chí Minh
                                          </p>
                                       </div>
                                    </div>
                                    <div className='col-md-8 col-sm-6'>
                                       <div className='invoice__right mt-15 mt-sm-0 text-sm-end'>
                                          <h3 className='text-uppercase font-70 mb-20'>HÓA ĐƠN ĐIỆN TỬ</h3>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className='invoice__customer mb-30'>
                        <div className='row'>
                           <div className='col-md-6 col-sm-8'>
                              <div className='invoice__customer-details'>
                                 <h4 className='mb-10 text-uppercase'>
                                    Khách hàng: {order_new?.ma_khach_hang_belongto_khach_hang?.ten_khach_hang}
                                 </h4>
                                 <p className='mb-1 '>Địa chỉ nhận hàng: {order_new?.dia_chi_giao_hang}</p>
                                 <p className='mb-1'>Số điện thoại: {order_new?.phone_giao_hang}</p>
                              </div>
                           </div>
                           <div className='col-md-6 col-sm-4'>
                              <div className='invoice__details mt-md-0 mt-20 text-md-end'>
                                 <p className='mb-0'>
                                    <strong>ID - HÓA ĐƠN: </strong> {order_new?.ma_hoa_don}
                                 </p>
                                 <p className='mb-0'>
                                    <strong>NGÀY ĐẶT HÀNG:</strong> {dayjs(order_new?.ngay_lap).format("DD/MM/YYYY")}
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className='invoice__order-table pt-30 pb-30 pl-40 pr-40 bg-white mb-30'>
                        <table className='table'>
                           <thead className='table-light'>
                              <tr>
                                 <th scope='col'>STT</th>
                                 <th scope='col'>Tên sản phẩm</th>
                                 <th scope='col'>Số lượng</th>
                                 <th scope='col'>Giá bán</th>
                                 <th scope='col'>Size & Màu sắc</th>
                                 <th scope='col'>Thành tiền</th>
                              </tr>
                           </thead>
                           <tbody className='table-group-divider'>
                              {order_new?.hoa_don_hasMany_chi_tiet?.map((item, i) => (
                                 <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>
                                       {
                                          item.ma_thuoc_tinh_belongto_thuoc_tinh?.thuoc_tinh_san_pham_belongsto_san_pham
                                             ?.ten_san_pham
                                       }
                                    </td>
                                    <td>{item?.so_luong}</td>
                                    <td>{formatCurrency(item?.gia)}</td>
                                    <td>
                                       {
                                          item.ma_thuoc_tinh_belongto_thuoc_tinh
                                             ?.thuoc_tinh_san_pham_belongsto_kich_thuoc?.ten_kich_thuoc
                                       }{" "}
                                       và{" "}
                                       {
                                          item.ma_thuoc_tinh_belongto_thuoc_tinh?.thuoc_tinh_san_pham_belongsto_mau_sac
                                             ?.ten_mau_sac
                                       }
                                    </td>
                                    <td>{formatCurrency(item?.thanh_tien)}</td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                     <div className='invoice__total pt-40 pb-10 alert-success pl-40 pr-40 mb-30'>
                        <div className='row'>
                           <div className='col-lg-3 col-md-4'>
                              <div className='invoice__payment-method mb-30'>
                                 <h5 className='mb-0'>Phương thức thanh toán:</h5>
                                 <p className='tp-font-medium text-uppercase'>
                                    {order_new?.ma_phuong_thuc_belongto_phuong_thuc?.ten_phuong_thuc}
                                 </p>
                              </div>
                           </div>
                           <div className='col-lg-3 col-md-4'>
                              <div className='invoice__shippint-cost mb-30'>
                                 <h5 className='mb-0'>Phí giao hàng (Nếu có):</h5>
                                 <p className='tp-font-medium'>0</p>
                              </div>
                           </div>
                           <div className='col-lg-3 col-md-4'>
                              <div className='invoice__discount-cost mb-30'>
                                 <h5 className='mb-0'>Thành tiền giảm giá:</h5>
                                 <p className='tp-font-medium'>{formatCurrency(order_new?.tien_giam)}</p>
                              </div>
                           </div>
                           <div className='col-lg-3 col-md-4'>
                              <div className='invoice__total-ammount mb-30'>
                                 <h5 className='mb-0'>Tổng tiền:</h5>
                                 <p className='tp-font-medium text-danger'>
                                    <strong>{formatCurrency(order_new?.tong_gia_tri)}</strong>
                                 </p>
                              </div>
                           </div>
                        </div>
                        <div className='invoice__total-ammount mb-30'>
                           <h5 className='mb-2'>Tổng tiền thành tiền thanh toán:</h5>
                           <h4 className='tp-font-medium text-danger'>
                              <strong>{formatCurrency(order_new?.tong_gia_tri)}</strong>
                           </h4>
                        </div>
<div className='invoice__total-ammount' style={{ marginBottom: '30px' }}>
  <h5 style={{ marginBottom: 0 }}>Chi chú cho đơn hàng:</h5>
  <p style={{ fontWeight: 500 }}>
    <strong>{order_new?.dia_chi_giao_hang}</strong>
  </p>
</div>
                     </div>
                  </div>
                  <div className='invoice__print text-end mt-3'>
                     <div className='row'>
                        <div className='col-xl-12'>
                           <ReactToPrint
                              trigger={() => (
                                 <button type='button' className='tp-invoice-print tp-btn tp-btn-black'>
                                    <span className='mr-5'>
                                       <i className='fa-regular fa-print'></i>
                                    </span>{" "}
                                    In hóa đơn
                                 </button>
                              )}
                              content={() => printRef.current}
                              documentTitle='Invoice'
                           />
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         </>
      );
   }
   return (
      <>
         <Wrapper>
            <SEO pageTitle={"Order Details"} />
            <Header />
            {content}
            <Footer />
         </Wrapper>
      </>
   );
};

export const getServerSideProps = async ({params}) => {
   return {
      props: {params},
   };
};

export default SingleOrder;
