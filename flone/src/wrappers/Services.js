import PropTypes from "prop-types";
import React from "react";
import featureIconData from "../data/feature-icons/feature-icon-five.json";

const FeatureIconFive = () => {
  return (
    <div className={`support-area pb-100`}>
      <div className="container">
        <div className="support-wrap-4-border">
          <div className="row">
            {featureIconData &&
              featureIconData.map((data, key) => {
                return (
                  <div key={key} className="col-lg-4 col-md-4 col-sm-6">
                    <div className={`support-wrap-4 mb-30`}>
                      <div className="support-icon-4">
                        <img
                          className="animated"
                          src={process.env.PUBLIC_URL + data.image}
                          alt={data.title}
                        />
                      </div>
                      <div className="support-content-4">
                        <h5>{data.title}</h5>
                        <p>{data.subtitle}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

FeatureIconFive.propTypes = {
  spaceBottomClass: PropTypes.string,
};

export default FeatureIconFive;
