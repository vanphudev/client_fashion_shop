import React from "react";

const ContactMap = () => {
   return (
      <>
         <section className='tp-map-area pb-120'>
            <div className='container'>
               <div className='row'>
                  <div className='col-xl-12'>
                     <div className='tp-map-wrapper'>
                        <div className='tp-map-hotspot'>
                           <span className='tp-hotspot tp-pulse-border'>
                              <svg
                                 width='12'
                                 height='12'
                                 viewBox='0 0 12 12'
                                 fill='none'
                                 xmlns='http://www.w3.org/2000/svg'>
                                 <circle cx='6' cy='6' r='6' fill='#821F40' />
                              </svg>
                           </span>
                        </div>
                        <div className='tp-map-iframe'>
                           <iframe
                              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4648.783723936845!2d106.62637497570347!3d10.806528358636392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752be2853ce7cd%3A0x4111b3b3c2aca14a!2zMTQwIMSQLiBMw6ogVHLhu41uZyBU4bqlbiwgVMOieSBUaOG6oW5oLCBUw6JuIFBow7osIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e1!3m2!1svi!2s!4v1729099395852!5m2!1svi!2s'
                              width='600'
                              height='450'
                              style={{border: "0"}}
                              allowFullScreen
                              loading='lazy'
                              referrerpolicy='no-referrer-when-downgrade'
                           />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
};

export default ContactMap;
