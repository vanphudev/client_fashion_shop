import React from 'react';
import SEO from '@/components/seo';
import Wrapper from '@/layout/wrapper';
import Header from "@/layout/headers/header";
import ElectronicCategory from "@/components/categories/electronic-category";
import HomeHeroSlider from "@/components/hero-banner/home-hero-slider";
import FeatureArea from "@/components/features/feature-area";
import ProductArea from "@/components/products/electronics/product-area";
import CtaArea from "@/components/cta/cta-area";
import Footer from "@/layout/footers/footer";

const HomeThree = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Home" />
      <Header/>
      <HomeHeroSlider/>
      <ElectronicCategory/>
      <FeatureArea/>
      <ProductArea/>
      <CtaArea/>
      <Footer/>
    </Wrapper>
  );
};

export default HomeThree;