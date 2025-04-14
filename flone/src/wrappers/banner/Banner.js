import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "../../assets/css/BannerTwentyFiveSingle.css";

const Banner = () => {
  const { t } = useTranslation();
  const bannerData = [
    {
      id: 1,
      image: "/assets/img/banner/KlinSav.jpg",
      title: t("Antiseptics"),
      subtitle: t("Kills Microorganisms on Skin"),
      link: "/products",
    },
    {
      id: 2,
      image: "/assets/img/banner/Liquid-detergent.jpg",
      title: t("Detergents"),
      subtitle: t("Efficient Cleaning Power"),
      link: "/products",
    },
    {
      id: 3,
      image: "/assets/img/banner/klinwash.jpg",
      title: t("Disinfectants"),
      subtitle: t("Kills Germs on Surfaces"),
      link: "/products",
    },
  ];

  return (
    <section className="banner-section py-5">
      <Container>
        <Row className="d-flex flex-wrap justify-content-center">
          {bannerData.map((banner) => (
            <Col key={banner.id} xs={12} sm={6} lg={4} className="mb-4 d-flex">
              <Link to={banner.link} className="text-decoration-none w-100">
                <Card className="banner-card w-100 h-100 d-flex flex-column">
                  <div className="banner-image-wrapper flex-shrink-0">
                    <Card.Img
                      variant="top"
                      src={banner.image}
                      alt={banner.title}
                      className="banner-image w-100 h-100 object-fit-cover"
                    />
                  </div>
                  <Card.Body className="banner-content-wrapper d-flex flex-column justify-content-between">
                    <div className="banner-content">
                      <Card.Title className="banner-title">
                        {banner.title}
                      </Card.Title>
                      <Card.Text className="banner-subtitle">
                        {banner.subtitle}
                      </Card.Text>
                    </div>
                    <div className="banner-btn-wrapper mt-3">
                      <button className="banner-btn btn btn-primary w-100">
                        {t("Shop Now")}
                      </button>
                    </div>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Banner;
