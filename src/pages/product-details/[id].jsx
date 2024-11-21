import React from "react";
// internal
import SEO from "@/components/seo";
import Header from "@/layout/headers/header";
import Footer from "@/layout/footers/footer";
import Wrapper from "@/layout/wrapper";
import ErrorItem from "../404_items";
import {useGetProductQuery} from "@/redux/features/productApi";
import ProductDetailsBreadcrumb from "@/components/breadcrumb/product-details-breadcrumb";
import ProductDetailsArea from "@/components/product-details/product-details-area";
import PrdDetailsLoader from "@/components/loader/prd-details-loader";

const ProductDetailsPage = ({query}) => {
   const {data: product, isLoading, isError} = useGetProductQuery(query.id);
   let content = null;
   if (isLoading) {
      content = <PrdDetailsLoader loading={isLoading} />;
   }
   if (!isLoading && isError) {
      content = <ErrorItem />;
   }
   if (!isLoading && !isError && product) {
      content = (
         <>
            <ProductDetailsBreadcrumb
            url={product?.metadata?.san_pham[0]?.loai_san_pham?.slug }
               category={product?.metadata?.san_pham[0]?.loai_san_pham?.ten_loai}
               title={product?.metadata?.san_pham[0]?.ten_san_pham}
            />
            <ProductDetailsArea productItem={product?.metadata?.san_pham[0]} />
         </>
      );
   }
   return (
      <Wrapper>
         <SEO pageTitle={product?.metadata?.san_pham[0]?.ten_san_pham} />
         <Header />
         {content}
         <Footer />
      </Wrapper>
   );
};

export default ProductDetailsPage;

export const getServerSideProps = async (context) => {
   const {query} = context;

   return {
      props: {
         query,
      },
   };
};
