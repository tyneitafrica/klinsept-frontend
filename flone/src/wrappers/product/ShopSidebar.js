import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { getIndividualCategories } from "../../helpers/product";
import { setActiveSort } from "../../helpers/product";

const ShopSidebar = ({ products, getSortParams }) => {
  const [uniqueVariations, setUniqueVariations] = useState([]);

  // Extract categories (same as before)
  const categories = getIndividualCategories(products);

  useEffect(() => {
    const variations = [];

    products.forEach((product) => {
      product.variations.forEach((variation) => {
        const existingVariation = variations.find(
          (v) => v.size === variation.size
        );
        if (!existingVariation) {
          variations.push(variation);
        }
      });
    });
    setUniqueVariations(variations);
    return variations;
  }, [products]); 

  return (
    <div className={`sidebar-style mr-30`}>
      {/* Filter by categories */}
      <div className="sidebar-widget">
        <h4 className="pro-sidebar-title">Categories </h4>
        <div className="sidebar-widget-list mt-30">
          {categories ? (
            <ul>
              <li>
                <div className="sidebar-widget-list-left">
                  <button
                    onClick={(e) => {
                      getSortParams("category", "");
                      setActiveSort(e);
                    }}
                  >
                    <span className="checkmark" /> All Categories
                  </button>
                </div>
              </li>
              {categories.map((category, key) => (
                <li key={key}>
                  <div className="sidebar-widget-list-left">
                    <button
                      onClick={(e) => {
                        getSortParams("category", category);
                        setActiveSort(e);
                      }}
                    >
                      <span className="checkmark" /> {category}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            "No categories found"
          )}
        </div>
      </div>

      {/* Filter by variations */}
      <div className="sidebar-widget">
        <div className="sidebar-widget-list mt-30">
          {!uniqueVariations.length > 0 ? (
            <>
              <h4 className="my-5 pro-sidebar-title">Product Variations</h4>
              <ul>
                {uniqueVariations.map((variation, index) => (
                  <li key={index}>
                    <div className="sidebar-widget-list-left">
                      <button
                        onClick={(e) => {
                          console.log(uniqueVariations);
                          getSortParams("variation", variation.size);
                          setActiveSort(e);
                        }}
                      >
                        <span className="checkmark" /> {variation.size}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

ShopSidebar.propTypes = {
  getSortParams: PropTypes.func,
  products: PropTypes.array,
};

export default ShopSidebar;
