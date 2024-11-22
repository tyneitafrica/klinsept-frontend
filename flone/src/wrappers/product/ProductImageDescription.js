import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ProductImageGallery from "../../components/product/ProductImageGallery";
// import ProductDescriptionInfo from "../../components/product/ProductDescriptionInfo";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FcLike, FcLikePlaceholder, FcCancel } from "react-icons/fc";
import { IoGitCompareOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import {
  deleteFromWishlist,
  addToWishlist,
} from "../../redux/actions/wishlistActions";
import {
  addToCompare,
  deleteFromCompare,
} from "../../redux/actions/compareActions";
import { addToCart } from "../../redux/actions/cartActions";

const ProductImageDescription = ({
  product,
  currency,
  cartItems,
  wishlistItems,
  compareItems,
}) => {
  const [quantityCount, setQuantityCount] = useState(1);
  const isProductInList = (productId, list) =>
    list.some((item) => item.id === productId);

  // Check if the product is in the cart, wishlist, or compare
  // const isProductInCart = isProductInList(product.id, cartItems);
  const isProductInWishlist = isProductInList(product.id, wishlistItems);
  const isProductInCompare = isProductInList(product.id, compareItems);
  // useEffect(() => {
  //   const existingCartItem = cartItems.find((item) => item.id === product.id);
  //   if (existingCartItem) {
  //     setQuantityCount(existingCartItem.quantity);
  //   }
  // }, [cartItems, product.id]);
  const dispatch = useDispatch();

  const convertedPrice = currency.selectedCurrency
    ? (product.price * currency.selectedCurrency.rates).toFixed(2)
    : product.price;
  return (
    <div className={`shop-area pt-100 pb-100`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            {/* product image gallery */}

            <ProductImageGallery product={product} />
          </div>
          <div className="col-lg-6 col-md-6">
            {/* product description info */}
            <div className="product-details-content ml-70">
              <h2>{product.name}</h2>
              <div className="product-details-price">
                <span>
                  {(currency.selectedCurrency.symbol || "") +
                    " " +
                    convertedPrice}{" "}
                </span>
              </div>

              <div className="pro-details-list">
                <p>{product.description}</p>
              </div>

              {
                <div className="pro-details-quality">
                  <div className="cart-plus-minus">
                    <button
                      onClick={() =>
                        setQuantityCount(
                          quantityCount > 1 ? quantityCount - 1 : 1
                        )
                      }
                      className="dec qtybutton"
                    >
                      -
                    </button>
                    <input
                      className="cart-plus-minus-box"
                      type="text"
                      value={quantityCount}
                      readOnly
                    />
                    <button
                      onClick={() =>
                        setQuantityCount((prevCount) => prevCount + 1)
                      }
                      className="inc qtybutton"
                    >
                      +
                    </button>
                  </div>
                  <div className="pro-details-cart btn-hover">
                    <button
                      onClick={() => {
                        dispatch(addToCart(product, quantityCount));
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>

                  <div className="pro-details-wishlist">
                    {isProductInWishlist ? (
                      <FcLike
                        onClick={() =>
                          dispatch(deleteFromWishlist(product, toast))
                        }
                        className="heart-icon"
                        title="Add to Wishlist"
                      />
                    ) : (
                      <FcLikePlaceholder
                        onClick={() => {
                          dispatch(addToWishlist(product, toast)); // Dispatch to Redux
                        }}
                        className="heart-icon"
                        title="Already in Wishlist"
                      />
                    )}
                  </div>
                  <div className="pro-details-compare ml-3 ">
                    {!isProductInCompare ? (
                      <IoGitCompareOutline
                        size={25}
                        onClick={() => {
                          dispatch(addToCompare(product)); // No need to pass toast
                        }}
                        title="Add to Compare"
                      />
                    ) : (
                      <FcCancel
                        size={25}
                        title="Remove from Compare"
                        onClick={
                          () => dispatch(deleteFromCompare(product)) // No need to pass toast
                        }
                      />
                    )}
                  </div>
                </div>
              }
              {product.category ? (
                <div className="pro-details-meta">
                  <span>Categories :</span>
                  <ul>
                    {product.category.map((single, key) => {
                      return (
                        <li key={key}>
                          <Link to={process.env.PUBLIC_URL + "/products"}>
                            {single}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductImageDescription.propTypes = {
  cartItems: PropTypes.array,
  compareItems: PropTypes.array,
  currency: PropTypes.object,
  galleryType: PropTypes.string,
  product: PropTypes.object,
  wishlistItems: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    currency: state.currencyData,
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
    compareItems: state.compareData,
  };
};

export default connect(mapStateToProps)(ProductImageDescription);
