import PropTypes from "prop-types";
import React from "react";
import {
  getIndividualCategories,
  getProductsIndividualSizes
} from "../../helpers/product";
// import ShopSearch from "../../components/product/ShopSearch";
import ShopCategories from "../../components/product/ShopCategories";
import ShopSize from "../../components/product/ShopSize";

const ShopSidebar = ({ products, getSortParams }) => {
  const uniqueCategories = getIndividualCategories(products);
  // const uniqueColors = getIndividualColors(products);
  const uniqueSizes = getProductsIndividualSizes(products);

  return (
    <div className={`sidebar-style mr-30`}>
      {/* shop search */}
      {/* <ShopSearch /> */}

      {/* filter by categories */}
      <ShopCategories
        categories={uniqueCategories}
        getSortParams={getSortParams}
      />


      {/* filter by size */}
      <ShopSize sizes={uniqueSizes} getSortParams={getSortParams} />


    </div>
  );
};

ShopSidebar.propTypes = {
  getSortParams: PropTypes.func,
  products: PropTypes.array
};

export default ShopSidebar;
