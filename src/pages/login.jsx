import React from 'react';
import SEO from '@/components/seo';
import Header from "@/layout/headers/header";
import Footer from '@/layout/footers/footer';
import Wrapper from '@/layout/wrapper';
import CommonBreadcrumb from '@/components/breadcrumb/common-breadcrumb';
import LoginArea from '@/components/login-register/login-area';

const LoginPage = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Login" />
      <Header />
      <CommonBreadcrumb title="Login" subtitle="Login" center={true} />
      <LoginArea/>
      <Footer />
    </Wrapper>
  );
};

export default LoginPage;