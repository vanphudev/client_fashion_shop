import React from "react";
import menu_data from "@/data/menu-data";
import Link from "next/link";
import Image from "next/image";
import {useGetProductTypeQuery} from "@/redux/features/productApi";
import {HomeNewArrivalPrdLoader} from "@/components/loader";
import ErrorMsg from "@/components/common/error-msg";
import ProductItem from "@/components/products/electronics/product-item";

const Menus = () => {
   const {
      data: products,
      isError,
      isLoading,
   } = useGetProductTypeQuery({
      type: "electronics",
      query: "new=true",
   });

   // decide what to render
   let content = null;

   if (isLoading) {
      content = <HomeNewArrivalPrdLoader loading={isLoading} />;
   }

   if (!isLoading && isError) {
      content = <ErrorMsg msg='There was an error' />;
   }

   if (!isLoading && !isError && products?.data?.length === 0) {
      content = <ErrorMsg msg='No Products found!' />;
   }

   if (!isLoading && !isError && products?.data?.length > 0) {
      const product_items = products.data;
      content = (
         <div className='row'>
            {product_items.slice(0, 4).map((item) => (
               <div key={item._id} className='col-md-3'>
                  <ProductItem product={item} />
               </div>
            ))}
         </div>
      );
   } else {
      // If there are no products or an error occurs, set content to an empty array
      content = [];
   }
   return (
      <ul>
         {menu_data.map((menu) =>
            menu.homes ? (
               <li key={menu.id} className='has-mega-menu'>
                  <Link href={menu.link}>{menu.title}</Link>
               </li>
            ) : (
               <li key={menu.id}>
                  <Link href={menu.link}>{menu.title}</Link>
               </li>
            )
         )}
      </ul>
   );
};

export default Menus;
