import React from "react";
import "../assets/css/Footer.css"; // Import the CSS file
import {
  FaTiktok,
  FaXTwitter,
  FaInstagram,
  FaGithub,
  FaFacebookF,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import FooterNewsletter from "./footer/FooterNewsletter";

export default function Footer({ darkMode = !true }) {
  return (
    <footer className={darkMode ? "bg-dark" : "bg-light"}>
      <div className="container">
        <div className="footer-grid">
          <div>
            <h2 className={`section-title`}>Company</h2>
            <ul>
              <li>
                <Link className="section-link" to="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="section-link" to="/contact">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link className="section-link" to="#">
                  Brand Center
                </Link>
              </li>
              <li>
                <Link className="section-link" to="/blogs">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="section-title">Help center</h2>
            <ul>
              <li>
                <a className="section-link" href="/">
                  Discord Server
                </a>
              </li>
              <li>
                <a className="section-link" href="/">
                  Twitter
                </a>
              </li>
              <li>
                <a className="section-link" href="/">
                  Facebook
                </a>
              </li>
              <li>
                <a className="section-link" href="/">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="section-title">Categories</h2>
            <ul>
              <li>
                <Link className="section-link" to="/products">
                  Antiseptics
                </Link>
              </li>
              <li>
                <Link className="section-link" to="/products">
                  Detergents
                </Link>
              </li>
              <li>
                <Link className="section-link" to="/products">
                  Handwash
                </Link>
              </li>
              <li>
                <Link className="section-link" to="/products">
                  Disinfectants
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <FooterNewsletter />
          </div>
        </div>
        <div className={`text-center `}>
          <span>
            © 2024{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://klinsept.vercel.app/"
            >
              Klinsept
            </a>
            . All Rights Reserved.
          </span>
          <div className="social-icons">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-link"
            >
              <FaFacebookF />
            </Link>
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-link"
            >
              <FaInstagram />
            </Link>
            <Link
              target="_blank"
              className="social-icon-link"
              rel="noopener noreferrer"
            >
              <FaXTwitter />
            </Link>
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-link"
            >
              <FaGithub />
            </Link>
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-link"
            >
              <FaTiktok />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
