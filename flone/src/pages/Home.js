import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../layouts/LayoutOne";
import HeroSlider from "../wrappers/HeroSlider";
import Banner from "../wrappers/banner/Banner";
import Services from "../wrappers/Services";
import TabProductSixteen from "../wrappers/product/TabProductSixteen";
import BlogFeaturedFour from "../wrappers/blog-featured/BlogFeaturedFour";
import Testimonials from "../wrappers/Testimonials";
import MedicalContact from "../components/contact/MedicalContact";
import Gallery from "../wrappers/banner/Gallery";
import ProductSlider from "../wrappers/product/ProductSlider";

const Home = () => {
  return (
    <Fragment>
      <MetaTags>
        <title>Klinsept | Home</title>
        <meta
          name="description"
          content="Home page of Klinsept eCommerce website."
        />
      </MetaTags>

      <LayoutOne>
        {/* hero slider */}
        <HeroSlider />
        {/* banner */}
        <Banner />
        {/* Good Services */}
        <Services />
        {/* Our product */}
        <TabProductSixteen category="detergents" />
        {/* gallery */}
        <Gallery />
        {/* product slider */}
        <ProductSlider category="handwash" />
        {/* blog */}
        <BlogFeaturedFour />

        {/* testimonials */}
        <Testimonials />
        
        {/* contact */}
        <MedicalContact />
      </LayoutOne>
    </Fragment>
  );
};

export default Home;
