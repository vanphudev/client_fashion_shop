import React from 'react';
import SEO from '@/components/seo';
import Wrapper from '@/layout/wrapper';
import Header from "@/layout/headers/header";
import CommonBreadcrumb from '@/components/breadcrumb/common-breadcrumb';
import ForgotArea from '@/components/login-register/forgot-area';
import Footer from '@/layout/footers/footer';

const ForgotPage = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Login" />
      <Header/>
      <CommonBreadcrumb title="Forgot Password" subtitle="Reset Password" center={true} />
      <ForgotArea />
      <Footer />
    </Wrapper>
  );
};

export default ForgotPage;