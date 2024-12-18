import React from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../components/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import TextGridOne from "../../wrappers/text-grid/TextGridOne";
import FunFactOne from "../../wrappers/FunFactOne";
// import TeamMember from "../../wrappers/TeamMember";
import BrandLogoSliderOne from "../../wrappers/brand-logo/BrandLogoSliderOne";
import { useLocation } from "react-router-dom";
// import { Nav, Tab } from "react-bootstrap";
import SectionTitle from "../../components/SectionTitle";
import { useTranslation } from "react-i18next";
const About = () => {
  const { t } = useTranslation();
  const pathname = useLocation();
  // const [activeKey, setActiveKey] = useState("antiseptics");



  return (
    <div className="mt-90">
      <MetaTags>
        <title>{t("Klinsept | About us")}</title>
        <meta
          name="description"
          content={t("About page of react minimalist eCommerce template.")}
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
        {t("Home")}
      </BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        {t("About us")}
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        {/* section title with text */}
        <div className="welcome-area pt-100 pb-95">
          <div className="container">
            <div className="text-left">
              <h1>{t("Who We Are")}</h1>
              <div className="welcome-content">
                <span>
                  {t(
                    "KLINSEPT is a janitorial and disinfectant products manufacturing company located in Bujumbura-Burundi. KLINSEPT began operation in May 2022 having fulfilled the entire registration requirements. We got a clean bill of health from BBN."
                  )}
                  {t(
                    "We officially introduced our products into the market in August 2022 and within four months; we were able to achieve the minimum sales that enabled us to be enlisted among organizations that have to submit TVA to OBR meaning our products were appreciated in the local market."
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* text grid */}
        <TextGridOne t={t} />

        {/* fun fact */}
        <FunFactOne />

        <div className="welcome-area">
          <div className="container">
            <div className="welcome-content text-center mb-50">
              <SectionTitle
                titleText={t("Our Products")}
                subTitleText={t("We manufacture a wide range of products:")}
                positionClass="text-center"
                spaceClass="mb-40 mt-40"
              />
              <div className="text-left">
                <span>
                  {t(
                    "We can deliver a wide range of fragrances, and packaging volumes as per the client’s requirement."
                  )}
                  {t(
                    "We have a well-equipped laboratory ensuring the quality of our products meets the required standards."
                  )}
                  {t(
                    "It is our endeavor to get associated with organizations that have the urge to improve not only in their price of procuring but also to develop new and genuinely good products. We believe in a long-term relationship, which is more like a partnership; we manufacture & you cater the products."
                  )}
                </span>
              </div>
            </div>

           
          </div>
        </div>

        {/* team member */}
        {/* <TeamMember t={t} /> */}

        {/* brand logo slider */}
        <BrandLogoSliderOne t={t} />
      </LayoutOne>
    </div>
  );
};

export default About;
