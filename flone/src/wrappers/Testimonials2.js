import React from "react";
import icon from "../assets/icon.jpg";
import "../assets/css/Testimonial.css";
import SectionTitleTwo from "../components/section-title/SectionTitle";

// Array of testimonials
const testimonialsData = [
  {
    id: 1,
    name: "John Kamotho",
    position: "Owner, CleanHomes Ltd",
    image: icon,
    content:
      "I've been using this company's detergents for years, and the quality has always been outstanding. Our clients love the fresh scents and powerful cleaning effect. Highly recommend!",
  },
  {
    id: 2,
    name: "Mark Mwangi",
    position: "Manager, Fresh & Clean Services",
    image: icon,
    content:
      "The detergents from this company have been essential to our cleaning business. They are effective and economical, which helps us maintain a great profit margin without compromising on quality.",
  },
  {
    id: 3,
    name: "Simon Konecki",
    position: "CEO, Sparkling Solutions",
    image: icon,
    content:
      "We’ve tried many brands, but this company’s detergents stand out. Our team and clients noticed the difference immediately—cleaning is easier and faster with their products.",
  },
];

function Testimonial() {
  return (
    <div className="testimonial-container">
      <SectionTitleTwo
          titleText="What Our Clients Say"
          subTitleText="Meet the team that makes this company great"
          positionClass="text-center"
          spaceClass="mb-10"
        />
      <div className="testimonial-wrapper">

        <div className="testimonial-grid">
          {testimonialsData.map((testimonial) => (
            <div className="testimonial-card" key={testimonial.id}>
              <div className="testimonial-profile">
                <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
                <div className="testimonial-info">
                  <h4 className="testimonial-name">{testimonial.name}</h4>
                  <p className="testimonial-position">{testimonial.position}</p>
                </div>
              </div>

              <div className="testimonial-content">
                <p>{testimonial.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
