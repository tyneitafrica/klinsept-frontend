import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const Logo = ({ imageUrl, logoClass }) => {
  return (
    <div className={`${logoClass ? logoClass : ""}`}>
      <Link className="text-3xl" to={process.env.PUBLIC_URL + "/"}>
        Klinsept
        {/* <img className="bg-rose-500" alt="" src={process.env.PUBLIC_URL + imageUrl} /> */}
      </Link>
    </div>
  );
};

Logo.propTypes = {
  imageUrl: PropTypes.string,
  logoClass: PropTypes.string,
};

export default Logo;
