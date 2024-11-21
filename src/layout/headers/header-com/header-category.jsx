import React from "react";
import Image from "next/image";
import {useRouter} from "next/router";
// internal
import {useGetProductTypeCategoryQuery} from "@/redux/features/categoryApi";
import ErrorMsg from "@/components/common/error-msg";
import Loader from "@/components/loader/loader";

const HeaderCategory = ({isCategoryActive, categoryType = true}) => {
   const {data: categories, isError, isLoading} = useGetProductTypeCategoryQuery();
   const router = useRouter();

   // handle category route
   const handleCategoryRoute = (title, route) => {
      router.push(`/shop?category=${title.toLowerCase().replace("&", "").split(" ").join("-")}`);
   };
   // decide what to render
   let content = null;

   if (isLoading) {
      content = (
         <div className='py-5'>
            <Loader loading={isLoading} />
         </div>
      );
   }
   if (!isLoading && isError) {
      content = <ErrorMsg msg='There was an error' />;
   }
   if (!isLoading && !isError && categories?.metadata?.nhom_loais?.length === 0) {
      content = <ErrorMsg msg='No Category found!' />;
   }

   if (!isLoading && !isError && categories?.metadata?.nhom_loais?.length > 0) {
      const category_items = categories?.metadata?.nhom_loais;
      content = category_items.map((item) => (
         <li className='has-dropdown' key={item.ma_nhom_loai}>
            <a className='cursor-pointer' >
               {item.thumbnail_image && (
                  <span>
                     <Image src={item.thumbnail_image} alt='cate img' width={50} height={50} />
                  </span>
               )}
               {item.ten_nhom_loai}
            </a>
            {item?.nhom_loai_to_loai_san_pham && (
               <ul className='tp-submenu'>
                  {item.nhom_loai_to_loai_san_pham.map((child, i) => (
                     <li key={i} onClick={() => handleCategoryRoute(child?.slug, "children")}>
                        <a className='cursor-pointer'>{child?.ten_loai}</a>
                     </li>
                  ))}
               </ul>
            )}
         </li>
      ));
   }
   return <ul className={isCategoryActive ? "active" : ""}>{content}</ul>;
};

export default HeaderCategory;
