import React,{useEffect} from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
// internal
import SEO from '@/components/seo';
import Wrapper from '@/layout/wrapper';
import Header from "@/layout/headers/header";
import Footer from '@/layout/footers/footer';
import CommonBreadcrumb from '@/components/breadcrumb/common-breadcrumb';
import CheckoutArea from '@/components/checkout/checkout-area';


const CheckoutPage = () => {
  const router = useRouter();
  useEffect(() => {
    const isAuthenticate = Cookies.get("userInfo");
    if(!isAuthenticate){
      router.push("/login")
    }
  },[router])
  return (
    <Wrapper>
      <SEO pageTitle="Checkout" />
      <Header/>
      <CommonBreadcrumb title="Thanh toán" subtitle="Thanh toán" bg_clr={true} />
      <CheckoutArea/>
      <Footer  />
    </Wrapper>
  );
};

export default CheckoutPage;