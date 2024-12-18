import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import { getSortedProducts } from "../helpers/product";
import LayoutOne from "../components/LayoutOne";
import ShopSidebar from "../wrappers/product/ShopSidebar";
import ShopProducts from "../wrappers/product/ShopProducts";

const Products = ({ products }) => {
  const [sortType, setSortType] = useState("");
  const [sortValue, setSortValue] = useState("");
  // const [filterType, setFilterType] = useState("");
  const [currentData, setCurrentData] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);

  const getSortParams = (sortType, sortValue) => {
    setSortType(sortType);
    setSortValue(sortValue);
  };

  useEffect(() => {
    console.log(products);
    let sortedProducts = getSortedProducts(products, sortType, sortValue);
    const filterSortedProducts = getSortedProducts(sortedProducts);
    setSortedProducts(filterSortedProducts);
    setCurrentData(sortedProducts);
  }, [products, sortType, sortValue]);

  return (
    <div className="mt-100">
      <MetaTags>
        <title>Klinsept</title>
        <meta
          name="description"
          content="Shop page of  react minimalist eCommerce template."
        />
      </MetaTags>

      <LayoutOne headerTop="visible">
        <div className="shop-area pt-105 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 order-2 order-lg-1">
                <ShopSidebar
                  products={products}
                  getSortParams={getSortParams}
                />
              </div>
              <div className="col-lg-9 order-1 order-lg-2">
                <div className="shop-top-bar mb-35">
                  <div className="select-shoing-wrap">
                    {/* <div className="shop-select">
                      <select
                        onChange={(e) => {
                          console.log(e.target.value);
                        }}
                      >
                        <option value="default">Default</option>
                        <option value="highToLow">Price - High to Low</option>
                        <option value="lowToHigh">Price - Low to High</option>
                      </select>
                    </div> */}
                  </div>
                </div>

                {/* shop page content default */}
                <ShopProducts
                  products={currentData}
                  currentData={currentData}
                />
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </div>
  );
};

Products.propTypes = {
  products: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    products: state.productData.products,
  };
};

export default connect(mapStateToProps)(Products);
