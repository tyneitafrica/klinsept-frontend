import React from "react";
import { Link } from "react-router-dom";
import SectionTitle from "../../components/section-title/SectionTitle";
import '../../assets/css/gallery.css'


const banners = [
  {
    image: `/assets/img/banner/banner-4.jpg`,
    subtitle: "Blog 1",
    discount: "Up To 40% Off",
    link: "/",
  },
  {
    image: `/assets/img/banner/banner-7.jpg`,
    subtitle: "Blog 2",
    discount: "Up To 30% Off",
    link: "/",
  },
  {
    image: `/assets/img/banner/banner-3.jpg`,
    subtitle: "Blog 3",
    discount: "Up To 40% Off",
    link: "/",
  },
];

const Gallery = () => {
  return (
    <div className="gallery-area">
      <SectionTitle
        titleText="Gallery section"
        subtitleText=""
        subtitleColorClass="text-muted"
        positionClass="text-center"
        spaceClass="mb-30"
      />
      
      <div className="gallery-container">
        <div className="gallery-grid">
          {banners.map((banner, index) => (
            <div className="gallery-item" key={index}>
              <div className="gallery-card">
                <a
                  href="https://www.facebook.com/klinsept"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gallery-link"
                >
                  <div className="gallery-image-wrapper">
                    <img src={banner.image} alt="" className="gallery-image" />
                  </div>
                </a>
                <div className="gallery-overlay">
                  <div className="gallery-content">
                    {banner.subtitle && <h3 className="gallery-subtitle">{banner.subtitle}</h3>}
                    <Link to={process.env.PUBLIC_URL + banner.link} className="gallery-button">
                      Learn more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
