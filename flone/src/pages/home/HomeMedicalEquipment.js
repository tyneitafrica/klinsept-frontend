import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import HeroSlider from "../../wrappers/hero-slider/HeroSlider";
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
          content="Medical Equipment home of  react minimalist eCommerce template."
        />
      </MetaTags>

      <LayoutOne>
        {/* hero slider */}
        <HeroSlider />
        {/* banner */}
        <BannerTwentyFive />
        {/* Good Services */}
        <FeatureIconFive />
        {/* Our product */}
        <TabProductSixteen category="detergents" />
        {/* gallery */}
        <BannerTwentySix />
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
