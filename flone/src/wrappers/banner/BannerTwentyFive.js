import React from "react";
import bannerData from "../../data/banner/banner-twenty-five.json";
import BannerTwentyFiveSingle from "../../components/banner/BannerTwentyFiveSingle.js";

const BannerTwentyFive = () => {
  return (
    <div
      className={`banner-area hm9-section-padding pb-60  pb-70`}
    >
      <div className="container-fluid">
        <div className="row">
          {bannerData &&
            bannerData.map((single, key) => {
              return (
                <BannerTwentyFiveSingle
                  data={single}
                  key={key}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default BannerTwentyFive;
