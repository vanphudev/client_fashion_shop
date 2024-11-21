import React from "react";
import Image from "next/image";
import {useRouter} from "next/router";
// internal
import ErrorMsg from "../common/error-msg";
import {useGetProductTypeCategoryQuery} from "@/redux/features/categoryApi";
import HomeCateLoader from "../loader/home/home-cate-loader";

const ElectronicCategory = () => {
   const {data: categories, isLoading, isError} = useGetProductTypeCategoryQuery();
   const router = useRouter();

   // handle category route
   const handleCategoryRoute = (title) => {
      router.push(`/shop?group_category=${title.toLowerCase().replace("&", "").split(" ").join("-")}`);
   };
   // decide what to render
   let content = null;

   if (isLoading) {
      content = <HomeCateLoader loading={isLoading} />;
   }
   if (!isLoading && isError) {
      content = <ErrorMsg msg='There was an error' />;
   }
   if (!isLoading && !isError && categories?.metadata?.nhom_loais?.length === 0) {
      content = <ErrorMsg msg='No Group Category found!' />;
   }
   if (!isLoading && !isError && categories?.metadata?.nhom_loais?.length > 0) {
      const category_items = categories?.metadata?.nhom_loais;
      content = category_items.map((item) => (
         <div className='col' key={item.ma_nhom_loai}>
            <div className='tp-product-category-item text-center mb-40'>
               <div className='tp-product-category-thumb fix'>
                  <a className='cursor-pointer' onClick={() => handleCategoryRoute(item.slug)}>
                     <Image src={item.thumbnail_image} alt='product-category' width={85} height={85} />
                  </a>
               </div>
               <div className='tp-product-category-content'>
                  <h3 className='tp-product-category-title'>
                     <a className='cursor-pointer' onClick={() => handleCategoryRoute(item.url)}>
                        {item.ten_nhom_loai}
                     </a>
                  </h3>
               </div>
            </div>
         </div>
      ));
   }
   return (
      <section className='tp-product-category pt-15 pb-15'>
         <div className='container'>
            <div className='row row-cols-xl-5 row-cols-lg-5 row-cols-md-4'>{content}</div>
         </div>
      </section>
   );
};

export default ElectronicCategory;
