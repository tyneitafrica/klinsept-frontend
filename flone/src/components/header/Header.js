import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IconGroup from "./IconGroup";
import MobileMenu from "./MobileMenu";

const Header = ({ borderStyle, headerPositionClass, headerBgClass }) => {
  const [scroll, setScroll] = useState(0);
  const [headerTop, setHeaderTop] = useState(0);

  useEffect(() => {
    const header = document.querySelector(".sticky-bar");
    setHeaderTop(header.offsetTop);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  return (
    <header
      className={`header-area clearfix ${headerBgClass ? headerBgClass : ""} ${
        headerPositionClass ? headerPositionClass : ""
      }`}
    >
      <div
        className={`header-padding-2 visible header-top-area ${
          borderStyle === "fluid-border" ? "border-none" : ""
        }`}
      ></div>

      <div
        className={` header-padding-2 sticky-bar header-res-padding clearfix ${
          scroll > headerTop ? "stick" : ""
        }`}
      >
        <div className={"container-fluid"}>
          <div className="row">
            <div className="col-xl-2 col-lg-2 col-md-6 col-4">
              {/* header logo */}
              <div className={`logo img-flui w-30 bg-red`}>
                <Link to={process.env.PUBLIC_URL + "/"}>
                  <img
                    alt="Logo"
                    src={process.env.PUBLIC_URL + "/assets/img/logo/logo.png"}
                    className="img-fluid"
                  />
                  {/* Klinsept */}
                </Link>
              </div>
            </div>
            <div className="col-xl-8 col-lg-8 d-none d-lg-block">
              {/* Nav menu */}

              <div className={`main-menu`}>
                <nav>
                  <ul>
                    <li>
                      <Link to={"/"}>Home</Link>
                    </li>
                    <li>
                      <Link to={"/products"}> Products</Link>
                    </li>

                    <li>
                      <Link to={"/blogs"}>Blogs</Link>
                    </li>
                    <li>
                      <Link to={"/contact"}>Contact us</Link>
                    </li>
                    <li>
                      <Link to={"/about"}>About</Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="col-xl-2 col-lg-2 col-md-6 col-8">
              {/* Icon group */}
              <IconGroup />
            </div>
          </div>
        </div>
        {/* mobile menu */}
        <MobileMenu />
      </div>
    </header>
  );
};

Header.propTypes = {
  borderStyle: PropTypes.string,
  headerPositionClass: PropTypes.string,
};

export default Header;
