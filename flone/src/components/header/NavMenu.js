import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";

const NavMenu = ({ strings,  sidebarMenu }) => {
  return (
    <div
      className={ `main-menu`}
    >
      <nav>
        <ul>
          <li>
            <Link to={"/"}>
              {strings["home"]}
            </Link>

          </li>
          <li>
            <Link to={"/products"}>
              {" "}
              {strings["Products"]}
             
            </Link>

          </li>
          <li>
            <Link to={"/"}>
              {strings["pages"]}
              {sidebarMenu ? (
                <span>
                  <i className="fa fa-angle-right"></i>
                </span>
              ) : (
                <i className="fa fa-angle-down" />
              )}
            </Link>
            <ul className="submenu">
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
         <li>
            <Link to={"/blogs"}>
              {strings["blog"]}

            </Link>

          </li>
          <li>
            <Link to={"/contact"}>
              {strings["contact_us"]}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

NavMenu.propTypes = {
  sidebarMenu: PropTypes.bool,
  strings: PropTypes.object
};

export default multilanguage(NavMenu);
