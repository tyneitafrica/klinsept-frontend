import PropTypes from "prop-types";
import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import ProductGridTwo from "./ProductGridTwo";
import SectionTitle from "../../components/section-title/SectionTitle";

const TabProductSixteen = () => {
  // State to track the currently selected category
  const [selectedCategory, setSelectedCategory] = useState("antiseptics"); 

  return (
    <div className={`product-area pb-70`}>
      <div className="container">
        <SectionTitle
          titleText="Our Products"
          positionClass="text-center"
          spaceClass="mb-30"
          borderClass="no-border"
        />
        <Tab.Container
          activeKey={selectedCategory}
          onSelect={(key) => setSelectedCategory(key)} 
        >
          <Nav
            variant="pills"
            className={`product-tab-list-5 mb-60 justify-content-center `}
          >
            <Nav.Item>
              <Nav.Link eventKey="antiseptics">
                <h4>Antiseptics</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="disinfectants">
                <h4>Disinfectants</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="detergents">
                <h4>Detergents</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="handwash">
                <h4>Handwash</h4>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="antiseptics">
              <div className="row">
                <ProductGridTwo
                  category={selectedCategory} 
                  type="antiseptics"
                  limit={8}
                  spaceBottomClass="mb-25"
                  colorClass="pro-puce-color"
                />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="disinfectants">
              <div className="row">
                <ProductGridTwo
                  category={selectedCategory} 
                  type="disinfectants"
                  limit={8}
                  spaceBottomClass="mb-25"
                  colorClass="pro-puce-color"
                />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="detergents">
              <div className="row">
                <ProductGridTwo
                  category={selectedCategory} 
                  type="detergents"
                  limit={8}
                  spaceBottomClass="mb-25"
                  colorClass="pro-puce-color"
                />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="handwash">
              <div className="row">
                <ProductGridTwo
                  category={selectedCategory} 
                  type="handwash"
                  limit={8}
                  spaceBottomClass="mb-25"
                  colorClass="pro-puce-color"
                />
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </div>
  );
};

TabProductSixteen.propTypes = {
  productTabClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default TabProductSixteen;
