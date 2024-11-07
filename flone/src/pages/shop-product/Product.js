import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
// imphort ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import { useLocation, useParams } from "react-router-dom";

const Product = ({ products }) => {
  const { id } = useParams(); // Get the product id from the route
  const { pathname } = useLocation();

  // Find the product based on the id
  const product = products.find(single => single.id === id);

  return (
    <Fragment>
      <MetaTags>
        <title> | Product Page</title>
        <meta
          name="description"
          content="Product page of react minimalist eCommerce template."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Shop Product
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        {/* product description with image */}
        {product ? (
          <>
            <ProductImageDescription
              product={product}
            />

            {/* product description tab */}
            {/* <ProductDescriptionTab
              spaceBottomClass="pb-90"
              productFullDesc={product.fullDescription}
            /> */}

            {/* related product slider */}
            <RelatedProductSlider
              spaceBottomClass="pb-95"
              category={product.category[0]}
            />
          </>
        ) : (
          <p>Product not found</p>
        )}
      </LayoutOne>
    </Fragment>
  );
};

Product.propTypes = {
  products: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.productData.products,
});

export default connect(mapStateToProps)(Product);
