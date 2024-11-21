import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { getDiscountPrice } from "../../helpers/product";
import ProductModal from "./ProductModal";

const ProductGridSingleTwo = ({
  product,
  currency,
  addToCart,
  addToWishlist,
  addToCompare,
  cartItem,
  wishlistItem,
  compareItem,
  sliderClassName,
  spaceBottomClass,
  colorClass,
  titlePriceClass,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "" });
  const { addToast } = useToasts();

  const discountedPrice = getDiscountPrice(product.price, product.discount);
  const finalProductPrice = +(product.price * currency.currencyRate).toFixed(2);
  const finalDiscountedPrice = +(
    discountedPrice * currency.currencyRate
  ).toFixed(2);

  const showAlert = (message) => {
    setAlert({ show: true, message });
    setTimeout(() => {
      setAlert({ show: false, message: "" });
    }, 3000);
  };

  return (
    <Fragment>
      {/* Alert section */}
      {alert.show && (
        <div
          style={{
            position: "fixed",
            top: 0,
            width: "100%",
            backgroundColor: "#ff9800",
            color: "#fff",
            textAlign: "center",
            padding: "10px",
            zIndex: 1000,
          }}
        >
          {alert.message}
        </div>
      )}

      <div
        className={`col-xl-3 col-md-6 col-lg-4 col-sm-6 ${
          sliderClassName ? sliderClassName : ""
        }`}
      >
        <div
          className={`product-wrap-2 ${
            spaceBottomClass ? spaceBottomClass : ""
          } ${colorClass ? colorClass : ""} `}
        >
          <div className="product-img">
            <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
              <img
                className="default-img"
                src={product.image[0]}
                alt=""
              />
              {product.image.length > 1 ? (
                <img
                  className="hover-img"
                  src={process.env.PUBLIC_URL + product.image[1]}
                  alt=""
                />
              ) : (
                ""
              )}
            </Link>
            {product.discount || product.new ? (
              <div className="product-img-badges">
                {product.discount ? (
                  <span className="pink">-{product.discount}%</span>
                ) : (
                  ""
                )}
                {product.new ? <span className="purple">New</span> : ""}
              </div>
            ) : (
              ""
            )}

            <div className="product-action-2">
              {cartItem && cartItem.quantity > 0 ? (
                <button
                  disabled
                  className="active"
                  onClick={() => showAlert("Product already in cart")}
                >
                  <i className="fa fa-ban"></i>
                </button>
              ) : (
                <button
                  onClick={() => {
                    addToCart(product, addToast);
                    showAlert("Added to cart");
                  }}
                  className={cartItem && cartItem.quantity > 0 ? "active" : ""}
                  disabled={cartItem && cartItem.quantity > 0}
                >
                  <i className="fa fa-shopping-cart"></i>
                </button>
              )}

              <button
                onClick={() => {
                  setModalShow(true);
                  showAlert("Quick view opened");
                }}
              >
                <i className="fa fa-eye"></i>
              </button>

              <button
                // className={compareItem ? "active" : ""}
                disabled={compareItem}
                onClick={() => {
                  addToCompare(product, addToast);
                  showAlert(
                    compareItem ? "Already in compare" : "Added to compare"
                  );
                }}
              >
                <i className="fa fa-retweet"></i>
              </button>
            </div>
          </div>
          <div className="product-content-2">
            <div
              className={`title-price-wrap-2 ${
                titlePriceClass ? titlePriceClass : ""
              }`}
            >
              <h3>
                <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
                  {product.name}
                </Link>
              </h3>

            </div>
            <div className="pro-wishlist-2">
              <button
                className={wishlistItem ? "active" : ""}
                disabled={wishlistItem}
                onClick={() => {
                  addToWishlist(product, addToast);
                  showAlert(
                    wishlistItem ? "Already in wishlist" : "Added to wishlist"
                  );
                }}
              >
                <i className="fa fa-heart-o" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product modal */}
      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        currency={currency}
        discountedprice={discountedPrice}
        finalproductprice={finalProductPrice}
        finaldiscountedprice={finalDiscountedPrice}
        cartitem={cartItem}
        wishlistitem={wishlistItem}
        compareitem={compareItem}
        addtocart={addToCart}
        addtowishlist={addToWishlist}
        addtocompare={addToCompare}
        addtoast={addToast}
      />
    </Fragment>
  );
};

ProductGridSingleTwo.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItem: PropTypes.object,
  compareItem: PropTypes.object,
  currency: PropTypes.object,
  product: PropTypes.object,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string,
  titlePriceClass: PropTypes.string,
  wishlistItem: PropTypes.object,
};

export default ProductGridSingleTwo;
