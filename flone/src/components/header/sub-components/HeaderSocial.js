import React from "react";
import { FaFacebookF, FaDribbble, FaPinterestP, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const HeaderSocial = () => {
  return (
    <div className="side-social">
      <ul>
        <li>
          <a
            className="facebook"
            href="//www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF />
          </a>
        </li>
        <li>
          <a
            className="dribbble"
            href="//www.dribbble.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaDribbble />
          </a>
        </li>
        <li>
          <a
            className="pinterest"
            href="//www.pinterest.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaPinterestP />
          </a>
        </li>
        <li>
          <a
            className="twitter"
            href="//www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
        </li>
        <li>
          <a
            className="linkedin"
            href="//www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default HeaderSocial;
