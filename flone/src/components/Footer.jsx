import React from "react";
import {
  FaTiktok,
  FaXTwitter,
  FaInstagram,
  FaGithub,
  FaFacebookF,
} from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import FooterNewsletter from "./footer/FooterNewsletter";
import "../assets/css/Footer.css"; // Import the CSS file

export default function Footer({ darkMode = !true }) {
  return (
    <footer className={darkMode ? "bg-dark" : "bg-light"}>
      <div className="container">
        <div className="footer-grid">
          <div className="section-links">
            <h2 className={`section-title`}>Company</h2>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact Us</NavLink>
            <NavLink to="/products">products</NavLink>
            <NavLink to="/blogs">Blog</NavLink>
            <Link href="/">FAQs</Link>
          </div>
          <div className="work-hours">
            <h2 className="section-title">Working Hours</h2>
            <div>
              <p>Monday to Friday:</p>
              <span className="text-success">9:00 AM - 5:00 PM</span>
            </div>
            <div>
              <p>Saturday:</p>
              <span className="text-warning">10:00 AM - 4:00 PM</span>
            </div>
            <div>
              <p>Sunday:</p>
              <span className="text-danger">Closed</span>
            </div>
          </div>

          <div className="section-links">
            <h2 className="section-title">Categories</h2>
            <Link to="/products">Antiseptics</Link>
            <Link to="/products">Detergents</Link>
            <Link to="/products">Handwash</Link>
            <Link to="/products">Disinfectants</Link>{" "}
          </div>
          <div>
            <h3 className="section-title">SUBSCRIBE</h3>
            <FooterNewsletter />
          </div>
        </div>
        <div className="footer">
          <div className="text-center flex justify-between items-center">
            <span className="copyright">
              © 2024 <Link to="/">Klinsept sprl</Link>. All Rights Reserved.
            </span>
            <div className="social-icons">
              <Link to="/" target="_blank">
                <FaFacebookF />
              </Link>
              <Link to="/" target="_blank">
                <FaInstagram />
              </Link>
              <Link target="_blank">
                <FaXTwitter />
              </Link>
              <Link to="/" target="_blank">
                <FaGithub />
              </Link>
              <Link to="/" target="_blank">
                <FaTiktok />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
