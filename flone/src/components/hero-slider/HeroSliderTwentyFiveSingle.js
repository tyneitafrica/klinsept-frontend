import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const HeroSliderTwentyFiveSingle = ({ data, sliderClass }) => {
  return (
<div
  className={`single-slider-2 slider-height-2 d-flex align-items-center bg-img ${
    sliderClass ? sliderClass : ""
  }`}
  style={{
    backgroundImage: `url(${process.env.PUBLIC_URL + data.image})`,
    backgroundSize: 'cover',        // Ensures the image covers the entire area
    // backgroundPosition: 'center',   // Centers the image within the div
    // backgroundRepeat: 'no-repeat'   // Prevents the image from repeating
  }}
>
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-7 col-md-8 col-12">
            <div className="slider-content-medical slider-content-2 slider-content-2--white slider-animated-1">
              <h1 className="animated no-style text-dark">{data.title}</h1>
              <h1
                className="animated"
                dangerouslySetInnerHTML={{ __html: data.subtitle }}
              />
              {/* <h2 className="animated">{data.subtitle}</h2> */}
              <div className="slider-btn-medical btn-hover border-dark">
                <Link
                  className="animated"
                  to={process.env.PUBLIC_URL + data.url}
                >
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
  data: PropTypes.object,
  sliderClass: PropTypes.string
};

export default HeroSliderTwentyFiveSingle;
