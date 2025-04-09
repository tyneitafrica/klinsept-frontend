import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../components/LayoutOne";
import HeroSlider from "../wrappers/HeroSlider";
import Banner from "../wrappers/banner/Banner";
import WhyUs from "../wrappers/WhyUs";
import TabProductSixteen from "../wrappers/product/TabProductSixteen";
import BlogFeaturedFour from "../wrappers/blog-featured/BlogFeaturedFour";
import Testimonial from "../wrappers/Testimonials2";
import Gallery from "../wrappers/banner/Gallery";
import ProductSlider from "../wrappers/product/ProductSlider";

const Home = () => {
  return (
    
    <div className="mt-90 overflow-hidden">

    <Fragment>
      <MetaTags>
        <title>Klinsept | Home</title>
        <meta
          name="description"
          content="Home page of Klinsept eCommerce website."
        />
      </MetaTags>

      <LayoutOne  >
        {/* hero slider */}
        <HeroSlider />
        {/* banner */}
        <Banner />
        {/* Good Services */}
        <WhyUs />
        {/* Our product */}
        <div
      style={{
        marginTop: '20px', // Space above the element
        marginBottom: '20px', // Space below the element
        marginLeft: '40px', // Space to the left of the element
        marginRight: '40px' // Space to the right of the element
      }}
    >

        <TabProductSixteen  />
    </div>
        {/* gallery */}
        <Gallery />
        <div
      style={{
        marginTop: '20px', // Space above the element
        marginBottom: '20px', // Space below the element
        marginLeft: '40px', // Space to the left of the element
        marginRight: '40px' // Space to the right of the element
      }}
    >
      <ProductSlider category="Antiseptics" />
    </div>
        {/* product slider */}
        {/* blog */}
        <BlogFeaturedFour />

        {/* testimonials */}
        <Testimonial/>
        
        {/* contact */}
      </LayoutOne>
    </Fragment>
    </div>
  );
};

export default Home;
