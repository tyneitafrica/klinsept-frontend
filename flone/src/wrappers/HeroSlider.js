import React from "react";
import Swiper from "react-id-swiper";
import sliderData from "../data/hero-sliders/hero-slider-twenty-five.json";
import { Link } from "react-router-dom";
import "../assets/css/HeroSliderTwentyFiveSingle.css";

const HeroSlider = () => {
  const params = {
    effect: "fade",
    loop: true,
    speed: 1000,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    watchSlidesVisibility: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    renderPrevButton: () => (
      <button className="swiper-button-prev ht-swiper-button-nav">
        <i className="pe-7s-angle-left" />
      </button>
    ),
    renderNextButton: () => (
      <button className="swiper-button-next ht-swiper-button-nav">
        <i className="pe-7s-angle-right" />
      </button>
    ),
  };
  return (
    <div className="slider-area">
      <div className="slider-active nav-style-1">
        <Swiper {...params}>
          {sliderData &&
            sliderData.map((data, key) => {
              return (
                <div
                  key={key}
                  className={`single-slider-2 slider-height-2 d-flex align-items-center bg-img swiper-slide`}
                  style={{
                    backgroundImage: `url(${
                      process.env.PUBLIC_URL + data.image
                    })`,
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
            })}
        </Swiper>
      </div>
    </div>
  );
};

export default HeroSlider;
