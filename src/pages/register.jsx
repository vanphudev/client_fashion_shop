import React from "react";
import SEO from "@/components/seo";
import Header from "@/layout/headers/header";
import Footer from "@/layout/footers/footer";
import Wrapper from "@/layout/wrapper";
import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";
import RegisterArea from "@/components/login-register/register-area";

const RegisterPage = () => {
   return (
      <Wrapper>
         <SEO pageTitle='Register' />
         <Header />
         <CommonBreadcrumb title='Register' subtitle='Register' center={true} />
         <RegisterArea />
         <Footer />
      </Wrapper>
   );
};

export default RegisterPage;
