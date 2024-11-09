import React from "react";
import bannerData from "../../data/banner/banner-twenty-five.json";
import { Link } from "react-router-dom";
import "../../assets/css/BannerTwentyFiveSingle.css";  // Make sure the correct path

const BannerTwentyFive = () => {
  return (
    <div
      className={`banner-area hm9-section-padding pb-60  pb-70`}
    >
      <div className="container-fluid">
        <div className="row">
          {bannerData &&
            bannerData.map((single, key) => {
              return (
                <div key={key} className="whole col-lg-4 col-md-6 col-sm-12 mb-4">
                <div className="single-banner mb-30 mt-30 p-30">
                  <Link to={process.env.PUBLIC_URL + single.link}>
                    <div className="banner-image-container">
                      <img 
                        src={process.env.PUBLIC_URL + single.image} 
                        alt="" 
                        className="img-fluid rounded banner-image" 
                      />
                      <div className="overlay"></div> {/* Dark overlay on hover */}
                    </div>
                  </Link>
                  
                  <div className="mt-3">
                    <div className="banner-content-33 text-center">
                      <h1 className="">{single.title}</h1>
                      <h2 className="">{single.subtitle}</h2>
                    </div>
                    <div className="banner-33-offer text-center">
                      <h2 className="h6 font-weight-bold">{single.text}</h2>
                    </div>
                  </div>
                  
                </div>
              </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default BannerTwentyFive;
