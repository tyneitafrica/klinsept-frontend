import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import HeroSliderTwentyFive from "../../wrappers/hero-slider/HeroSliderTwentyFive";
import BannerTwentyFive from "../../wrappers/banner/BannerTwentyFive";
import FeatureIconFive from "../../wrappers/feature-icon/FeatureIconFive";
import TabProductSixteen from "../../wrappers/product/TabProductSixteen";
import BlogFeaturedFour from "../../wrappers/blog-featured/BlogFeaturedFour";
import TestimonialThree from "../../wrappers/testimonial/TestimonialThree";
import MedicalContact from "../../components/contact/MedicalContact";
import BannerTwentySix from "../../wrappers/banner/BannerTwentySix";
import ProductSlider from "../../wrappers/product/ProductSlider";

const HomeMedicalEquipment = () => {
  return (
    <Fragment>
      <MetaTags>
        <title>Klinsept | Home</title>
        <meta
          name="description"
          content="Medical Equipment home of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-2"
        headerTop="visible"
      >
        {/* hero slider */}
        <HeroSliderTwentyFive />
        {/* banner */}
        <BannerTwentyFive  />
        {/* Good Services */}
        <FeatureIconFive spaceBottomClass="pb-100" />
        {/* Our product */}
        <TabProductSixteen spaceBottomClass="pb-70" category="detergents" />
        {/* gallery */}
        <BannerTwentySix  />
        {/* product slider */}
        <ProductSlider category="handwash" />
        {/* blog */}
        <BlogFeaturedFour />
        {/* testimonials */}

        <TestimonialThree />  
        {/* contact */}
        <MedicalContact />
      </LayoutOne>
    </Fragment>
  );
};

export default HomeMedicalEquipment;
