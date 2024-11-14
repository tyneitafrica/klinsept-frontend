import PropTypes from "prop-types";
import React, { Fragment } from "react";
// import Header from "../components/header/Header";
import FooterOne from "../wrappers/FooterOne";
import Navbar from "./Navbar";
import LanguageCurrencyChanger from "./LanguageCurrencyChanger.j";
const LayoutOne = ({ children, headerTop, headerPositionClass }) => {
  return (
    <Fragment>
      <div className="language-currency-container">
        <LanguageCurrencyChanger />
      </div>
      <Navbar />
      {/* <Header top={headerTop} headerPositionClass={headerPositionClass} /> */}
      {children}
      <FooterOne />
    </Fragment>
  );
};

LayoutOne.propTypes = {
  children: PropTypes.any,
  headerContainerClass: PropTypes.string,
  headerPositionClass: PropTypes.string,
  headerTop: PropTypes.string,
};

export default LayoutOne;
