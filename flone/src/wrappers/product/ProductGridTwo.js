import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { getProducts } from "../../helpers/product";
// import ProductGridSingleTwo from "../../components/product/ProductGridSingleTwo";
import { addToCart } from "../../redux/actions/cartActions";
import { addToWishlist } from "../../redux/actions/wishlistActions";
import { addToCompare } from "../../redux/actions/compareActions";
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineEye,
  AiOutlineSwap,
} from "react-icons/ai";
import "../../assets/css/ProductCard.css";
import { Card } from "react-bootstrap";
import { ProductModal } from "../../components/ProductModal";
const ProductGridTwo = ({
  products,
  currency,
  addToCart,
  addToWishlist,
  addToCompare,
  cartItems,
  wishlistItems,
  compareItems,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // Track selected product

  return (
    <Fragment>
      <div className="products-container justify-content-center flex-wrap">
        {products.map((product, index) => {
          // Calculate converted price
          const convertedPrice = currency.currencyRate
            ? (product.price * currency.currencyRate).toFixed(2)
            : product.price; // Use default price if no rate

          return (
            <Card key={index} className="product-card mb-3">
              <div className="image-container">
                <img
                  src={product.image[0]}
                  alt={product.name}
                  className="product-image"
                />
                <div className="overlay-icons">
                  <AiOutlineShoppingCart className="icon" title="Add to Cart" />
                  <AiOutlineEye
                    onClick={() => {
                      setSelectedProduct(product);
                      setModalShow(true);
                    }}
                    className="icon"
                    title="View Details"
                  />
                  <AiOutlineSwap className="icon" title="Compare" />
                </div>
              </div>
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between">
                  <Card.Title className="product-name">
                    {product.name}
                  </Card.Title>
                  <AiOutlineHeart
                    className="heart-icon"
                    title="Add to Wishlist"
                  />
                </div>

                <Card.Text className="product-price">
                  {currency.currencySymbol || "$"}
                  {" "}
                  {convertedPrice}
                </Card.Text>
              </Card.Body>
            </Card>
          );
        })}
      </div>
      <ProductModal
        show={modalShow}
        handleClose={() => setModalShow(false)}
        productData={selectedProduct}
      />
    </Fragment>
  );
};

ProductGridTwo.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItems: PropTypes.array,
  compareItems: PropTypes.array,
  currency: PropTypes.object,
  products: PropTypes.array,
};

const mapStateToProps = (state, ownProps) => {
  // console.log("Currencies:", ownProps);

  return {
    products: getProducts(
      state.productData.products,
      ownProps.category,
      ownProps.type,
      ownProps.limit
    ),
    currency: state.currencyData,
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
    compareItems: state.compareData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, addToast, quantityCount) => {
      dispatch(addToCart(item, addToast, quantityCount));
    },
    addToWishlist: (item, addToast) => {
      dispatch(addToWishlist(item, addToast));
    },
    addToCompare: (item, addToast) => {
      dispatch(addToCompare(item, addToast));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductGridTwo);
// <ProductGridSingleTwo
//   sliderClassName={sliderClassName}
//   spaceBottomClass={spaceBottomClass}
//   colorClass={colorClass}
//   product={product}
//   currency={currency}
//   addToCart={addToCart}
//   addToWishlist={addToWishlist}
//   addToCompare={addToCompare}
//   cartItem={
//     cartItems.filter((cartItem) => cartItem.id === product.id)[0]
//   }
//   wishlistItem={
//     wishlistItems.filter(
//       (wishlistItem) => wishlistItem.id === product.id
//     )[0]
//   }
//   compareItem={
//     compareItems.filter(
//       (compareItem) => compareItem.id === product.id
//     )[0]
//   }
//   key={product.id}
//   titlePriceClass={titlePriceClass}
// />
