import PropTypes from "prop-types";
import React from "react";
import SubscribeEmail from "./sub-components/SubscribeEmail";

const FooterNewsletter = ({ sideMenu }) => {
  return (
    <div className={`footer-widget mb-30 ${sideMenu ? "ml-ntv5" : "ml-70"} `}>
      <div className="footer-title">
        <h3>SUBSCRIBE</h3>
      </div>
      <div className={`subscribe-style `}>
        <p>Get E-mail updates about our latest shop and special offers.</p>
        {/* subscribe email */}
        <SubscribeEmail mailchimpUrl="//devitems.us11.list-manage.com/subscribe/post?u=6bbb9b6f5827bd842d9640c82&amp;id=05d85f18ef" />
      </div>
    </div>
  );
};

FooterNewsletter.propTypes = {
  colorClass: PropTypes.string,
  widgetColorClass: PropTypes.string,
};

export default FooterNewsletter;
