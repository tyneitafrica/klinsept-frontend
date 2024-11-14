import React, { useState, useEffect } from "react";
import "../assets/css/HeroSlider.css";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const HeroSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const sliderData = [
    {
      id: 1,
      title: "Delivery Across East Africa",
      subtitle:
        "Fast and reliable delivery in Burundi, Tanzania, Uganda, and Rwanda.",
      image: "/assets/img/download.jpeg",
      url: "/about",
    },
    {
      id: 2,
      title: "Trusted by East Africa",
      subtitle:
        "Supplying quality cleaning and hygiene products across East Africa.",
      image: "/assets/img/download.jpeg",
      url: "/about",
    },
    {
      id: 3,
      title: "Your Hygiene Partner",
      subtitle:
        "Supporting safe and clean environments in homes and businesses.",
      image: "/assets/img/download.jpeg",
      url: "/about",
    },
    {
      id: 4,
      title: "Quality Assurance",
      subtitle: "Premium products that meet East African quality standards.",
      image: "/assets/img/download.jpeg",
      url: "/about-us",
    },
    {
      id: 5,
      title: "Regional Reach",
      subtitle:
        "Our business spans Burundi, Tanzania, Uganda, Rwanda, and more!",
      image: "/assets/img/download.jpeg",
      url: "/contact",
    },
    {
      id: 2,
      title: "Trusted Quality",
      subtitle: "Premium products trusted across East Africa.",
      image: "/assets/img/download.jpeg",
      url: "/products",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === sliderData.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  });

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === sliderData.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? sliderData.length - 1 : prev - 1));
  };

  return (
    <div className="slider-container">
      {sliderData.map((slide, index) => (
        <div
          key={slide.id}
          className={`slide ${index === activeSlide ? "active" : ""}`}
        >
          <div className="slide-inner">
            <img src={slide.image} alt={slide.title} className="slide-image" />
            <div className="slide-overlay" />

            <div className="slide-content">
              <h2 className="slide-title text-white">{slide.title}</h2>
              <p className="slide-subtitle text-light">{slide.subtitle}</p>
              <Link to={slide.url}>
                <button className="slide-button">Shop now</button>
              </Link>
            </div>
          </div>
        </div>
      ))}

      <button onClick={prevSlide} className="nav-button prev">
        <FaChevronLeft />
      </button>

      <button onClick={nextSlide} className="nav-button next">
        <FaChevronRight />
      </button>

      <div className="indicators">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`indicator ${index === activeSlide ? "active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;