import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";

const MobileNavMenu = ({ strings }) => {
  return (
    <nav className="offcanvas-navigation" id="offcanvas-navigation">
      <ul>
        <li className="menu-item-has-children">
          <Link to={"/"}>{strings["home"]}</Link>

        </li>

        <li className="menu-item-has-children">
          <Link to={"/Products"}>
            {strings["Products"]}
          </Link>
        </li>
        <li className="menu-item-has-children">
          <Link to={"/"}>{strings["pages"]}</Link>
          <ul className="sub-menu">
            <li>
              <Link to={"/cart"}>
                {strings["cart"]}
              </Link>
            </li>
            <li>
              <Link to={"/checkout"}>
                {strings["checkout"]}
              </Link>
            </li>
            <li>
              <Link to={"/wishlist"}>
                {strings["wishlist"]}
              </Link>
            </li>
            <li>
              <Link to={"/compare"}>
                {strings["compare"]}
              </Link>
            </li>
            <li>
              <Link to={"/my-account"}>
                {strings["my_account"]}
              </Link>
            </li>
            <li>
                <Link to={"/login"}>
                  {strings["login"]}
                </Link>
              </li>
              <li>
                <Link to={"/register"}>
                  {strings["register"]}
                </Link>
              </li>
            <li>
              <Link to={"/about"}>
                {strings["about_us"]}
              </Link>
            </li>
            <li>
              <Link to={"/contact"}>
                {strings["contact_us"]}
              </Link>
            </li>
          </ul>
        </li>
        <li className="menu-item-has-children">
          <Link to={"/blogs"}>
            {strings["blog"]}s
          </Link>
        </li>
        <li>
          <Link to={"/contact"}>
            {strings["contact_us"]}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

MobileNavMenu.propTypes = {
  strings: PropTypes.object
};

export default multilanguage(MobileNavMenu);
