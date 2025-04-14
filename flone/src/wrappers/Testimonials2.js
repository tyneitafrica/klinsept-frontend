import React from "react";
import icon from "../assets/icon.jpg";
import "../assets/css/Testimonial.css";
import SectionTitle from "../components/SectionTitle";
import { useTranslation } from "react-i18next";

const testimonialsData = [
  {
    id: 1,
    name: "Amie Santiana",
    position: "Owner, CleanHomes Ltd",
    image: icon,
    content: "testimonial1", 
  },
  {
    id: 2,
    name: "Ninziza Bernice",
    position: "Manager, Fresh & Clean Services",
    image: icon,
    content: "testimonial2", 
  },
  {
    id: 3,
    name: "Jean Chrisostome",
    position: "CEO, Sparkling Solutions",
    image: icon,
    content: "testimonial3",
  },
];


function Testimonial() {
  const { t } = useTranslation(); // For translation

  return (
    <div className="testimonial-container">
      <SectionTitle
        titleText={t("What Our Clients Say")}
        subTitleText={t("We are committed to delivering tailored cleaning and disinfectant solutions that meet the unique needs of your business.")}
        positionClass="text-center"
        spaceClass="mb-0"
      />
      <div className="testimonial-wrapper">
        <div className="testimonial-grid">
          {testimonialsData.map((testimonial) => (
            <div className="testimonial-card" key={testimonial.id}>
              <div className="testimonial-profile">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="testimonial-image"
                />
                <div className="testimonial-info">
                  <h4 className="testimonial-name">{testimonial.name}</h4>
                  <p className="testimonial-position">{testimonial.position}</p>
                </div>
              </div>

              <div className="testimonial-content">
                <p>{t(testimonial.content)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
