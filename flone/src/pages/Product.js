import PropTypes from "prop-types";
import React from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import LayoutOne from "../components/LayoutOne";
import Breadcrumb from "../wrappers/breadcrumb/Breadcrumb";
import ProductImageDescription from "../wrappers/product/ProductImageDescription";
import { useLocation, useParams } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import Fuse from "fuse.js";
import ShopProducts from "../wrappers/product/ShopProducts";
import { useTranslation } from "react-i18next";

const Product = ({ products }) => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const product = products.find((product) => product.id === Number(id));

  const getRelatedProducts = (currentProduct) => {
    if (!currentProduct) return [];

    const fuseOptions = {
      keys: ["category", "name", "description"],
      includeScore: false,
      threshold: 0.6,
    };

    const fuse = new Fuse(products, fuseOptions);

    const results = fuse.search(currentProduct.name);
    const resultsByCategory = fuse.search(currentProduct.category[0]);

    let relatedProducts = [...results, ...resultsByCategory]
      .map((result) => result.item)
      .filter((item) => item.id !== currentProduct.id);

    if (relatedProducts.length < 5) {
      const randomProducts = products
        .filter((item) => item.id !== currentProduct.id)
        .sort(() => Math.random() - 0.5);

      relatedProducts = [
        ...relatedProducts,
        ...randomProducts.slice(0, 5 - relatedProducts.length),
      ];
    }

    return relatedProducts.slice(0, 6);
  };

  const relatedProducts = product ? getRelatedProducts(product) : [];

  return (
    <div className="mt-100">
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
        <Breadcrumb />

        {/* Product description with image */}
        {product ? (
          <>
            <ProductImageDescription t={t} product={product} />

            {/* Related Products Section */}
            <div className="related-product-area pb-95">
              <div className="container">
                <SectionTitle
                  titleText={t("Related Products")}
                  positionClass="text-center"
                  spaceClass="mb-50"
                />
                <div className="row">
                  {relatedProducts.length > 0 ? (
                    <>
                      <ShopProducts currentData={relatedProducts} />
                    </>
                  ) : (
                    <p>{t('No related products found.')}</p>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>{t('Product not found')}</p>
        )}
      </LayoutOne>
    </div>
  );
};

Product.propTypes = {
  products: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.productData.products,
});

export default connect(mapStateToProps)(Product);
