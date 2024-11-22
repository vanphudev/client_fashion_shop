import React, {useState, useEffect} from "react";
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import Header from "@/layout/headers/header";
import ShopBreadcrumb from "@/components/breadcrumb/shop-breadcrumb";
import ShopArea from "@/components/shop/shop-area";
import {useGetAllProductsQuery} from "@/redux/features/productApi";
import ErrorMsg from "@/components/common/error-msg";
import Footer from "@/layout/footers/footer";
import ShopFilterOffCanvas from "@/components/common/shop-filter-offcanvas";
import ShopLoader from "@/components/loader/shop/shop-loader";

const ShopPage = ({query}) => {
   const {data: products, isError, isLoading} = useGetAllProductsQuery();
   const [priceValue, setPriceValue] = useState([0, 0]);
   const [selectValue, setSelectValue] = useState("");
   const [currPage, setCurrPage] = useState(1);

   useEffect(() => {
      if (!isLoading && !isError && products?.metadata?.san_phams?.length > 0) {
         const maxPrice = products?.metadata?.san_phams?.reduce((max, product) => {
            return product.gia_thap_nhat > max ? product.gia_thap_nhat : max;
         }, 0);

         if (maxPrice > 0) {
            setPriceValue([0, maxPrice]);
         } else {
            setPriceValue([0, 100]);
         }
      }
   }, [isLoading, isError, products]);

   const handleChanges = (val) => {
      setCurrPage(1);
      setPriceValue(val);
   };

   // selectHandleFilter
   const selectHandleFilter = (e) => {
      setSelectValue(e.value);
   };

   // other props
   const otherProps = {
      priceFilterValues: {
         priceValue,
         handleChanges,
      },
      selectHandleFilter,
      currPage,
      setCurrPage,
   };
   // decide what to render
   let content = null;

   if (isLoading) {
      content = <ShopLoader loading={isLoading} />;
   }
   if (!isLoading && isError) {
      content = (
         <div className='pb-80 text-center'>
            <ErrorMsg msg='There was an error' />
         </div>
      );
   }
   if (!isLoading && !isError && products?.metadata?.san_phams?.length === 0) {
      content = <ErrorMsg msg='No Products found!' />;
   }
   if (!isLoading && !isError && products?.metadata?.san_phams?.length > 0) {
      // products
      let product_items = products?.metadata?.san_phams;
      // select short filtering
      if (selectValue) {
         const sanPhams = products?.metadata?.san_phams || products?.data?.products || [];
         if (selectValue === "Default Sorting") {
            product_items = sanPhams;
         } else if (selectValue === "Low to High") {
            product_items = sanPhams.slice().sort((a, b) => Number(a.gia_thap_nhat) - Number(b.gia_thap_nhat));
         } else if (selectValue === "High to Low") {
            product_items = sanPhams.slice().sort((a, b) => Number(b.gia_thap_nhat) - Number(a.gia_thap_nhat));
         } else if (selectValue === "New Added") {
            product_items = sanPhams.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
         } else if (selectValue === "On Sale") {
            product_items = sanPhams.filter((p) => p.giam_gia > 0);
         } else {
            product_items = sanPhams;
         }
      }

      product_items = product_items.filter((p) => p.gia_thap_nhat >= priceValue[0] && p.gia_thap_nhat <= priceValue[1]);

      if (query.status) {
         if (query.status === "on-sale") {
            product_items = product_items.filter((p) => p.giam_gia > 0);
         } else if (query.status === "in-stock") {
            product_items = product_items.filter((p) => p.allOutOfStock == false);
         }
      }

      // category filter
      if (query.category) {
         product_items = product_items.filter(
            (p) => p.loai_san_pham?.slug?.toLowerCase().replace("&", "").split(" ").join("-") == query.category
         );
      }
      if (query.group_category) {
         product_items = product_items.filter(
            (p) => p.nhom_loai?.slug?.toLowerCase().replace("&", "").split(" ").join("-") == query.group_category
         );
      }
      if (query.brand) {
         product_items = product_items.filter((p) => p.thuong_hieu?.ma_thuong_hieu === query.brand);
      }
      content = (
         <>
            <ShopArea all_products={products?.metadata?.san_phams} products={product_items} otherProps={otherProps} />
            <ShopFilterOffCanvas all_products={products?.metadata?.san_phams} otherProps={otherProps} />
         </>
      );
   }
   return (
      <Wrapper>
         <SEO pageTitle='Sản phẩm' />
         <Header />
         <ShopBreadcrumb title='Danh sách sản phẩm' subtitle='Danh sách sản phẩm' />
         {content ? content : ""}
         <Footer primary_style={true} />
      </Wrapper>
   );
};

export default ShopPage;

export const getServerSideProps = async (context) => {
   const {query} = context;
   return {
      props: {
         query,
      },
   };
};
