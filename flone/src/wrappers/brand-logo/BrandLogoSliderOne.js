import React from "react";
import Swiper from "react-id-swiper";
import BrandLogoOneSingle from "../../components/brand-logo/BrandLogoOneSingle";
import brandLogoData from "../../data/brand-logos/brand-logo-one.json";
import SectionTitle from "../../components/SectionTitle";

const BrandLogoSliderOne = () => {
  const settings = {
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    grabCursor: true,
    breakpoints: {
      1024: {
        slidesPerView: 4
      },
      768: {
        slidesPerView: 4
      },
      640: {
        slidesPerView: 3
      },
      320: {
        slidesPerView: 2
      }
    }
  };

  return (
    <div className="brand-logo-area">
      {/* Section Title */}
      <SectionTitle
        titleText="Clients we work with"
        positionClass="text-center"
        spaceClass="mb-60"
      />
      <div className="container">
        <div>
          <Swiper {...settings}>
            {brandLogoData &&
              brandLogoData.map((single, key) => {
                return (
                  <BrandLogoOneSingle
                    data={single}
                    key={key}
                    sliderClassName="swiper-slide"
                    spaceBottomClass="mb-30"
                  />
                );
              })}
          </Swiper>
        </div>
      </div>
      
      {/* Embedded CSS */}
      <style jsx>{`
        .brand-logo-area {
          padding: 50px 0;
          background-color: #f9f9f9;
        }

        .brand-logo-area .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .brand-logo-area .swiper-slide img {
          max-width: 100%;
          max-height: 80px; /* Adjust for uniform height */
          object-fit: contain; /* Prevent distortion */
          margin: auto;
        }

        .brand-logo-area .swiper-slide {
          padding: 10px; /* Space between logos */
        }
      `}</style>
    </div>
  );
};

export default BrandLogoSliderOne;
