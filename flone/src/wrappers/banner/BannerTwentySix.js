import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import SectionTitle from "../../components/section-title/SectionTitle";

const BannerTwentySix = ({ spaceBottomClass }) => {
  // Define banner data as an array of objects
  const banners = [
    {
      image: `${process.env.PUBLIC_URL}/assets/img/banner/banner-4.jpg`,
      title: "Covid - 19",
      subtitle: "Medix Mask",
      discount: "Up To 40% Off",
      link: "/shop-grid-standard",
    },
    {
      image: `${process.env.PUBLIC_URL}/assets/img/banner/banner-7.jpg`,
      title: "",
      subtitle: "Hand Gloves",
      discount: "Up To 30% Off",
      link: "/shop-grid-standard",
    },
    {
      image: `${process.env.PUBLIC_URL}/assets/img/banner/banner-3.jpg`,
      title: "Covid - 19",
      subtitle: "Hand Sanitizer",
      discount: "Up To 40% Off",
      link: "/shop-grid-standard",
    },
  ];

  return (
    <div className={`banner-area ${spaceBottomClass ? spaceBottomClass : ""}`}>
      {/* Section Title */}
      <SectionTitle
        titleText="Gallery section"
        subtitleText=""
        subtitleColorClass="text-muted" // Optional custom class for subtitle
        positionClass="text-center"
        spaceClass="mb-5"
      />
      <div className="container-fluid p-0">
        <div className="row no-gutters">
          {banners.map((banner, index) => (
            <div
              className={`col-width-banner33-${index % 2 === 0 ? "1" : "2"}`}
              key={index}
            >
              <div className="single-banner mb-30">
                <a href="product-details.html">
                  <img src={banner.image} alt="" />
                </a>
                <div
                  className={`banner-content-33-2 banner-content-33-2-position${
                    index + 1
                  }`}
                >
                  {banner.title && <h4>{banner.title}</h4>}
                  <h2>
                    {banner.subtitle} <br />
                    {banner.discount}
                  </h2>
                  <Link to={process.env.PUBLIC_URL + banner.link}>
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

BannerTwentySix.propTypes = {
  spaceBottomClass: PropTypes.string,
};

export default BannerTwentySix;
