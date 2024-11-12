// BannerTwentyFiveSingle.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../../assets/css/BannerTwentyFiveSingle.css";

const BannerTwentyFiveSingle = () => {
  const bannerData = [
    {
      id: 1,
      image: "/assets/img/banner/KlinSav.jpg",
      title: "Antiseptics",
      subtitle: "Kills Microorganisms on Skin",
      link: "/products",
    },
    {
      id: 2,
      image: "/assets/img/banner/Liquid-detergent.jpg",
      title: "Detergents",
      subtitle: "Efficient Cleaning Power",
      link: "/products",
    },
    {
      id: 3,
      image: "/assets/img/banner/klinwash.jpg",
      title: "Disinfectants",
      subtitle: "Kills Germs on Surfaces",
      link: "/products",
    },
  ];
const BannerTwentyFiveSingle = () => {
  const bannerData = [
    {
      id: 1,
      image: "/assets/img/banner/KlinSav.jpg",
      title: "Antiseptics",
      subtitle: "Kills Microorganisms on Skin",
      link: "/products",
    },
    {
      id: 2,
      image: "/assets/img/banner/Liquid-detergent.jpg",
      title: "Detergents",
      subtitle: "Efficient Cleaning Power",
      link: "/products",
    },
    {
      id: 3,
      image: "/assets/img/banner/klinwash.jpg",
      title: "Disinfectants",
      subtitle: "Kills Germs on Surfaces",
      link: "/products",
    },
  ];

  return (
    <section className="banner-section py-5">
      <Container>
        <Row className="justify-content-center">
          {bannerData.map((banner) => (
            <Col key={banner.id} xs={12} sm={6} lg={4} className="mb-4">
              <Link to={banner.link} className="text-decoration-none">
                <Card className="banner-card">
                  <div className="banner-image-wrapper">
                    <Card.Img
                      // variant="top"
                      src={banner.image}
                      alt={banner.title}
                      className="banner-image"
                    />
                  </div>
                  <div className="banner-content-wrapper">
                    <div className="banner-content">
                      <h3 className="banner-title">{banner.title}</h3>
                      <p className="banner-subtitle">{banner.subtitle}</p>
                      <div className="banner-btn-wrapper">
                        <button to={banner.link} className="banner-btn">
                          Shop Now
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default BannerTwentyFiveSingle;
