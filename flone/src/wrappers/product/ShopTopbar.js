import PropTypes from "prop-types";
import React, { Fragment } from "react";

const ShopTopbar = ({
  getFilterSortParams,
  productCount,
  sortedProductCount
}) => {
  return (
    <Fragment>
      {/* shop top action */}
      <div className="shop-top-bar mb-35">
      <div className="select-shoing-wrap">
        <div className="shop-select">
          <select
            onChange={e => getFilterSortParams("filterSort", e.target.value)}
          >
            <option value="default">Default</option>
            <option value="priceHighToLow">Price - High to Low</option>
            <option value="priceLowToHigh">Price - Low to High</option>
          </select>
        </div>
        <p>
          Showing {sortedProductCount} of {productCount} result
        </p>
      </div>

    </div>
    </Fragment>
  );
};

ShopTopbar.propTypes = {
  getFilterSortParams: PropTypes.func,
  getLayout: PropTypes.func,
  productCount: PropTypes.number,
  sortedProductCount: PropTypes.number
};

export default ShopTopbar;
