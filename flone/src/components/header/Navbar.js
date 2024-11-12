import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import {
  FaBarsStaggered,
  FaMoon,
  FaRegSun,
  FaSoap,
  FaCartShopping,
  FaRegHeart,
  FaCodeCompare,
  FaRegUser,
} from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import "../../assets/css/Navbar.css";

import { setDarkMode } from "../../redux/actions/appAction.js";

function Navbar({ loggedin = !true }) {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigationRef = useRef();

  const darkMode = useSelector((state) => state.app.darkMode);

  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navigationRef.current &&
        !navigationRef.current.contains(event.target)
      ) {
        setToggleMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`fixed-top ${isScrolled && "scrolled"} ${
        toggleMenu && "toggled"
      }`}
    >
      <nav>
        <div className="nav-container">
          <div className="nav-inner-container">
            {/* Primary menu and logo */}
            <div className="logo-container">
              <div>
                <Link to="/" className="logo-link text-center">
                  <FaSoap size={38} className="logo-icon" />
                  {/* <span>Klinsept</span> */}
                </Link>
              </div>
              <div className="primary-nav">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/products">products</NavLink>
                <NavLink to="/blogs">Blogs</NavLink>
                <NavLink to="/contact">Contact Us</NavLink>
                <NavLink to="/about">About Us</NavLink>
                <button className="btn btn-info rounded p-1">
                  {!loggedin ? (
                    <Link to="#">Profile</Link>
                  ) : (
                    <Link to="#">Login</Link>
                  )}
                </button>
              </div>
            </div>

            {/* Secondary navigation */}
            <div className="secondary-nav">
              {/* <div
                className="dark-mode-icon"
                onClick={() => dispatch(setDarkMode(!darkMode))}
              >
                {!darkMode ? <FaMoon size={25} /> : <FaRegSun size={25} />}
              </div> */}

              <NavLink to={loggedin?'/my-account':'/login'}>
                <FaRegUser size={25} />
                {/* <i className="text-2xl pe-7s-user-female" /> */}
              </NavLink>

              <NavLink className="icon-with-badge" to="/cart">
                <FaCartShopping size={25} />
                <span class="badge badge-light">4</span>
              </NavLink>
              <NavLink to="/wishlist">
                <FaRegHeart size={25} />
                <span class="badge badge-info">4</span>
              </NavLink>
              <NavLink to="/compare">
                <FaCodeCompare size={25} />
                <span class="badge badge-danger">4</span>
              </NavLink>
              <div
                className="menu-toggle"
                onClick={() => setToggleMenu(!toggleMenu)}
              >
                {!toggleMenu ? (
                  <FaBarsStaggered size={25} />
                ) : (
                  <IoClose size={30} />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile navigation */}
        <div className={`mobile-nav ${toggleMenu ? "expanded" : "collapsed"}`}>
          <div className="mobile-menu-links">
            <Link to="#">Home</Link>
            <Link to="#">Shop</Link>
            <Link to="#">Contact Us</Link>
            <Link to="#">Profile</Link>
            <button>
              {loggedin ? (
                <Link to="#">Dashboard</Link>
              ) : (
                <Link to="#">Get-Started</Link>
              )}
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
