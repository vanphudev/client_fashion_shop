import React from "react";
import Image from "next/image";
import Link from "next/link";
// internal
import logo from "@assets/img/logo/logo.svg";
import pay from "@assets/img/footer/footer-pay.png";
import social_data from "@/data/social-data";
import {Email, Location} from "@/svg";

const Footer = ({style_2 = false, style_3 = false, primary_style = false}) => {
   return (
      <footer>
         <div
            className={`tp-footer-area ${
               primary_style ? "tp-footer-style-2 tp-footer-style-primary tp-footer-style-6" : ""
            } ${style_2 ? "tp-footer-style-2" : style_3 ? "tp-footer-style-2 tp-footer-style-3" : ""}`}
            data-bg-color={`${style_2 ? "footer-bg-white" : "footer-bg-grey"}`}>
            <div className='tp-footer-top pt-95 pb-40'>
               <div className='container'>
                  <div className='row'>
                     <div className='col-xl-4 col-lg-3 col-md-4 col-sm-6'>
                        <div className='tp-footer-widget footer-col-1 mb-50'>
                           <div className='tp-footer-widget-content'>
                              <div className='tp-footer-logo'>
                                 <Link href='/'>
                                    <Image src={logo} alt='logo' />
                                 </Link>
                              </div>
                              <p className='tp-footer-desc'>Chúng tôi cam kết sản phẩm chất lượng và chính hãng</p>
                              <div className='tp-footer-social'>
                                 {social_data.map((s) => (
                                    <a href={s.link} key={s.id} target='_blank'>
                                       <i className={s.icon}></i>
                                    </a>
                                 ))}
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6'>
                        <div className='tp-footer-widget footer-col-2 mb-50'>
                           <h4 className='tp-footer-widget-title'>Tài khoản của tôi</h4>
                           <div className='tp-footer-widget-content'>
                              <ul>
                                 <li>
                                    <a href='#'>Lịch sử Order</a>
                                 </li>
                                 <li>
                                    <a href='#'>Mua sắm</a>
                                 </li>
                                 <li>
                                    <a href='#'>Yêu thích</a>
                                 </li>
                                 <li>
                                    <a href='#'>Chính sách mua sắm</a>
                                 </li>
                                 <li>
                                    <a href='#'>Giỏ hàng</a>
                                 </li>
                                 <li>
                                    <a href='#'>Chính sách khuyến mãi</a>
                                 </li>
                              </ul>
                           </div>
                        </div>
                     </div>
                     <div className='col-xl-3 col-lg-3 col-md-4 col-sm-6'>
                        <div className='tp-footer-widget footer-col-3 mb-50'>
                           <h4 className='tp-footer-widget-title'>Thông tin chúng tôi</h4>
                           <div className='tp-footer-widget-content'>
                              <ul>
                                 <li>
                                    <a href='#'>Việc làm</a>
                                 </li>
                                 <li>
                                    <a href='#'>Chính sách bảo mật</a>
                                 </li>
                                 <li>
                                    <a href='#'>Điều khoản</a>
                                 </li>
                                 <li>
                                    <a href='#'>Tin tức mới</a>
                                 </li>
                                 <li>
                                    <a href='#'>Liên hệ với chúng tôi</a>
                                 </li>
                              </ul>
                           </div>
                        </div>
                     </div>
                     <div className='col-xl-3 col-lg-3 col-md-4 col-sm-6'>
                        <div className='tp-footer-widget footer-col-4 mb-50'>
                           <h4 className='tp-footer-widget-title'>Hãy nói với chúng tôi</h4>
                           <div className='tp-footer-widget-content'>
                              <div className='tp-footer-talk mb-20'>
                                 <span>Nếu bạn có câu hỏi cho chúng tôi</span>
                                 <h4>
                                    <a href='tel:0123456789'>+84 123 123 123</a>
                                 </h4>
                              </div>
                              <div className='tp-footer-contact'>
                                 <div className='tp-footer-contact-item d-flex align-items-start'>
                                    <div className='tp-footer-contact-icon'>
                                       <span>
                                          <Email />
                                       </span>
                                    </div>
                                    <div className='tp-footer-contact-content'>
                                       <p>
                                          <a href='mailto:nguyenvanphu.hufi@gmail.com'>nguyenvanphu.hufi@gmail.com</a>
                                       </p>
                                    </div>
                                 </div>
                                 <div className='tp-footer-contact-item d-flex align-items-start'>
                                    <div className='tp-footer-contact-icon'>
                                       <span>
                                          <Location />
                                       </span>
                                    </div>
                                    <div className='tp-footer-contact-content'>
                                       <p>
                                          <a
                                             href='https://maps.app.goo.gl/eTm3QBn5ecSTjnjV8'
                                             target='_blank'>
                                             140 Lê Trọng Tấn, HUIT, HCMC
                                          </a>
                                       </p>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className='tp-footer-bottom'>
               <div className='container'>
                  <div className='tp-footer-bottom-wrapper'>
                     <div className='row align-items-center'>
                        <div className='col-md-6'>
                           <div className='tp-footer-copyright'>
                              <p>
                                 © {new Date().getFullYear()} Sản phẩm tạo bởi Team 05 - Đồ án CNPMNC
                              </p>
                           </div>
                        </div>
                        <div className='col-md-6'>
                           <div className='tp-footer-payment text-md-end'>
                              <p>
                                 <Image src={pay} alt='pay' />
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </footer>
   );
};

export default Footer;
