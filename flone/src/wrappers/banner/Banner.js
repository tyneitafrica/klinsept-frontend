import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../../assets/css/BannerTwentyFiveSingle.css";

const bannerData = [
  {
    id: 1,
    image: "/assets/img/banner/KlinSav.jpg",
    title: "Antiseptics",
    subtitle: "Kills Microorganisms on Skin",
    text: "20% OFF",
    link: "/products",
  },
  {
    id: 2,
    image: "/assets/img/banner/Liquid-detergent.jpg",
    title: "Detergents",
    subtitle: "Efficient Cleaning Power",
    text: "30% OFF",
    link: "/products",
  },
  {
    id: 3,
    image: "/assets/img/banner/klinwash.jpg",
    title: "Disinfectants",
    subtitle: "Kills Germs on Surfaces",
    text: "40% OFF",
    link: "/products",
  },
];

const Banner = () => {
  return (
    <Container fluid className="text-center p-5 py-9">
      <Row>
        {bannerData.map((single, key) => (
          <Col key={key} lg={4} md={6} sm={10} className="custom-holder mb-4">
            <Link to={single.link}>
              <Card className="custom-single-banner h-100">
                <div className="custom-banner-container">
                  <Card.Img
                    src={single.image}
                    alt=""
                    className="custom-banner-img"
                  />
                  <div className="custom-overlay"></div>
                </div>
                <Card.Body className="custom-text-center">
                  <Card.Title as="h5" className="custom-banner-title">
                    {single.title}
                  </Card.Title>
                  <Card.Subtitle
                    as="h6"
                    className="text-muted custom-banner-subtitle"
                  >
                    {single.subtitle}
                  </Card.Subtitle>
                  <Card.Text className="font-weight-bold mt-2 custom-offer-text">
                    {single.text}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Banner;
