import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";
import Swiper from "react-id-swiper";
// import "react-lightgallery/styles/css/lightgallery.css"; // Include Lightgallery styles

const ProductImageGallery = ({ product }) => {
  const [gallerySwiper, getGallerySwiper] = useState(null);
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null);

  useEffect(() => {
    if (
      gallerySwiper !== null &&
      gallerySwiper.controller &&
      thumbnailSwiper !== null &&
      thumbnailSwiper.controller
    ) {
      gallerySwiper.controller.control = thumbnailSwiper;
      thumbnailSwiper.controller.control = gallerySwiper;
    }
  }, [gallerySwiper, thumbnailSwiper]);

  const gallerySwiperParams = {
    getSwiper: getGallerySwiper,
    spaceBetween: 10,
    loopedSlides: 4,
    loop: true,
    effect: "slide",
  };

  const thumbnailSwiperParams = {
    getSwiper: getThumbnailSwiper,
    spaceBetween: 10,
    slidesPerView: 4,
    loopedSlides: 4,
    touchRatio: 0.2,
    freeMode: true,
    loop: true,
    slideToClickedSlide: true,
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
    <Fragment>
      <div className="product-large-image-wrapper">
        <LightgalleryProvider>
          <Swiper {...gallerySwiperParams}>
            {product.images &&
              product.images.map((single, key) => {
                return (
                  <div key={key}>
                    <LightgalleryItem group="any" src={single.image}>
                      <button className="expand-icon">
                        <i className="pe-7s-expand1"></i>
                      </button>
                    </LightgalleryItem>
                    <div className="single-image">
                      <img
                        src={single.image}
                        className="img-fluid"
                        alt={product.name}
                      />
                    </div>
                  </div>
                );
              })}
          </Swiper>
        </LightgalleryProvider>
      </div>
      <div className="product-small-image-wrapper mt-15">
        <Swiper {...thumbnailSwiperParams}>
          {product.images &&
            product.images.map((single, key) => {
              return (
                <div key={key}>
                  <div className="single-image">
                    <img
                      src={single.image}
                      className="img-fluid"
                      alt={product.name}
                    />
                  </div>
                </div>
              );
            })}
        </Swiper>
      </div>
    </Fragment>
  );
};
ProductImageGallery.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.string,
      })
    ),
  }),
};

export default ProductImageGallery;
