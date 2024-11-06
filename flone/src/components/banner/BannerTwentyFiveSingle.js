import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/BannerTwentyFiveSingle.css";  // Make sure the correct path

const BannerTwentyFiveSingle = ({ data }) => {
  return (
    <div className="whole col-lg-4 col-md-6 col-sm-12 mb-4">
      <div className="single-banner mb-30 mt-30 p-30">
        <Link to={process.env.PUBLIC_URL + data.link}>
          <div className="banner-image-container">
            <img 
              src={process.env.PUBLIC_URL + data.image} 
              alt="" 
              className="img-fluid rounded banner-image" 
            />
            <div className="overlay"></div> {/* Dark overlay on hover */}
          </div>
        </Link>
        
        <div className="mt-3">
          <div className="banner-content-33 text-center">
            <h1 className="">{data.title}</h1>
            <h2 className="">{data.subtitle}</h2>
          </div>
          <div className="banner-33-offer text-center">
            <h2 className="h6 font-weight-bold">{data.text}</h2>
          </div>
        </div>
        
      </div>
    </div>
  );
};

BannerTwentyFiveSingle.propTypes = {
  data: PropTypes.object,
};

export default BannerTwentyFiveSingle;
