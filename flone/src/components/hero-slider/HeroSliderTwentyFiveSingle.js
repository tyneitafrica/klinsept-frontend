import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/HeroSliderTwentyFiveSingle.css" 
// './HeroSliderTwentyFiveSingle.css'; // Ensure this CSS file is created

const HeroSliderTwentyFiveSingle = ({ data, sliderClass }) => {
  return (
    <div
      className={`single-slider-2 slider-height-2 d-flex align-items-center bg-img ${sliderClass || ""}`}
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + data.image})`,
      }}
    >
      {/* Dark overlay for image */}
      <div className="image-overlay"></div>

      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-7 col-md-8 col-12">
            <div className="slider-content-medical">
              <h1 className="slider-title">{data.title}</h1>
              <h2 className="slider-subtitle">{data.subtitle}</h2>
              <div className="slider-btn-medical btn-hover border-dark">
                <Link className="animated" to={process.env.PUBLIC_URL + data.url}>
                  SHOP NOW
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

HeroSliderTwentyFiveSingle.propTypes = {
  data: PropTypes.object.isRequired,
  sliderClass: PropTypes.string,
};

export default HeroSliderTwentyFiveSingle;
