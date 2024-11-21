import React from "react";
import Image from "next/image";
import Link from "next/link";
import Wrapper from "@/layout/wrapper";
import error from "@assets/img/error/error.png";
import nosearch from "@assets/img/error/nosearch.jpg";

const NoSearch = () => {
   return (
      <Wrapper>
         <section className='tp-error-area '>
            <div className='container'>
               <div className='row justify-content-center'>
                  <div className='col-xl-6 col-lg-8 col-md-10'>
                     <div className='tp-error-content text-center'>
                        <div className='tp-error-thumb'>
                           <Image src={nosearch} alt='nosearch img' width="200" />
                        </div>
                        <h3 className='tp-error-title'>Ôi không! Không tồn tại sản phẩm bạn cần!</h3>
                        <p>Ồ, thật ngại quá. Có vẻ như sản phẩm bạn đang tìm kiếm không được tìm thấy.</p>
                        <Link href='/shop' className='tp-error-btn'>
                           Quay lại trang chủ bạn nhé !
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </Wrapper>
   );
};

export default NoSearch;
