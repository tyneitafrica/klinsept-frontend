import PropTypes from "prop-types";
import React, { Fragment } from "react";
import Header from "../components/header/Header";
import FooterOne from "../wrappers/FooterOne";
import Navbar from "../components/header/Navbar";

const LayoutOne = ({ children, headerTop, headerPositionClass }) => {
  return (
    <Fragment>
      <Navbar/>
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
