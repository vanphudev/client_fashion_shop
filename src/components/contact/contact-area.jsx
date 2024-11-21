import React from "react";
import Image from "next/image";
// internal
import ContactForm from "../forms/contact-form";
import contact_icon_1 from "@assets/img/contact/contact-icon-1.png";
import contact_icon_2 from "@assets/img/contact/contact-icon-2.png";
import contact_icon_3 from "@assets/img/contact/contact-icon-3.png";

const ContactArea = () => {
   return (
      <>
         <section className='tp-contact-area pb-100'>
            <div className='container'>
               <div className='tp-contact-inner'>
                  <div className='row'>
                     <div className='col-xl-9 col-lg-8'>
                        <div className='tp-contact-wrapper'>
                           <h3 className='tp-contact-title'>Gửi tin nhắn cho chúng tôi</h3>
                           <div className='tp-contact-form'>
                              {/* form start */}
                              <ContactForm />
                              {/* form end */}
                              <p className='ajax-response'></p>
                           </div>
                        </div>
                     </div>
                     <div className='col-xl-3 col-lg-4'>
                        <div className='tp-contact-info-wrapper'>
                           <div className='tp-contact-info-item'>
                              <div className='tp-contact-info-icon'>
                                 <span>
                                    <Image src={contact_icon_1} alt='contact-icon' />
                                 </span>
                              </div>
                              <div className='tp-contact-info-content'>
                                 <p data-info='mail'>
                                    <a href='mailto:nguyenvanphu.hufi@gmail.com'>nguyenvanphu.hufi@gmail.com</a>
                                 </p>
                                 <p data-info='phone'>
                                    <a href='tel:123 123 123'>(+84) 123 123 123</a>
                                 </p>
                              </div>
                           </div>
                           <div className='tp-contact-info-item'>
                              <div className='tp-contact-info-icon'>
                                 <span>
                                    <Image src={contact_icon_2} alt='contact-icon' />
                                 </span>
                              </div>
                              <div className='tp-contact-info-content'>
                                 <p>
                                    <a href='https://maps.app.goo.gl/eTm3QBn5ecSTjnjV8' target='_blank'>
                                       140 Lê Trọng Tấn <br /> Hồ Chí Minh City
                                    </a>
                                 </p>
                              </div>
                           </div>
                           <div className='tp-contact-info-item'>
                              <div className='tp-contact-info-icon'>
                                 <span>
                                    <Image src={contact_icon_3} alt='contact-icon' />
                                 </span>
                              </div>
                              <div className='tp-contact-info-content'>
                                 <div className='tp-contact-social-wrapper mt-5'>
                                    <h4 className='tp-contact-social-title'>Các kênh mạng xã hội</h4>
                                    <div className='tp-contact-social-icon'>
                                       <a href='#'>
                                          <i className='fa-brands fa-facebook-f'></i>
                                       </a>
                                       <a href='#'>
                                          <i className='fa-brands fa-twitter'></i>
                                       </a>
                                       <a href='#'>
                                          <i className='fa-brands fa-linkedin-in'></i>
                                       </a>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
};

export default ContactArea;
