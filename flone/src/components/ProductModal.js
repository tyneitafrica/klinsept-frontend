import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { addToCart } from "../redux/actions/cartActions";
import {
  addToWishlist,
  deleteFromWishlist,
} from "../redux/actions/wishlistActions";
import {
  addToCompare,
  deleteFromCompare,
} from "../redux/actions/compareActions";
import { useSelector, useDispatch } from "react-redux";
import {
  FaShoppingCart,
  FaAngleRight,
  FaAngleLeft,
  FaExchangeAlt,
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import { FcLike, FcLikePlaceholder, FcCancel } from "react-icons/fc";

export const ProductModal = ({ show, handleClose, productData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // const wishlistItems = useSelector((state) =>state.wishlistData)
  const reduxData = useSelector((state) => state);
  const dispatch = useDispatch();
  // console.log(reduxData.currencyData, .productData , .compareData, .cartData, .wishlistData)

  const nextSlide = () => {
    if (currentIndex < productData.images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(productData.images.length - 1);
    }
  };

  if (!productData) {
    return null;
  }

  const isInWishlist = reduxData.wishlistData.some(
    (item) => item.id === productData.id
  );
  const isInCart = reduxData.cartData.some(
    (item) => item.id === productData.id
  );
  const isInCompare = reduxData.compareData.some(
    (item) => item.id === productData.id
  );
  const { symbol, rates } = reduxData.currencyData.selectedCurrency;
const convertedPrice = (productData.price * rates).toFixed(2); // Format to 2 decimal places


  return (
    <Modal show={show} onHide={handleClose} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>{productData.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column flex-md-row">
        <div className="modal-carousel-container d-flex align-items-center justify-content-center flex-shrink-0">
          <FaAngleLeft className="carousel-control-icon" onClick={prevSlide} />

          <img
            className="modal-carousel-image img-fluid"
            src={productData.images[currentIndex].image}
            alt={`Product ${currentIndex + 1}`}
          />

          <FaAngleRight className="carousel-control-icon" onClick={nextSlide} />
        </div>

        {/* Spacing between the carousel and product details */}
        <div className="product-details-container mt-4 mt-md-0 ml-md-4">
          <p>{productData.description}</p>
          <p>
          <strong>
    {symbol} {convertedPrice}
  </strong>
          </p>
          <div className="modal-btns d-flex gap-2">
            <Button
              variant="light"
              onClick={() => {
                if (isInWishlist) {
                  dispatch(deleteFromWishlist(productData, toast));
                } else {
                  dispatch(addToWishlist(productData, toast));
                }
              }}
            >
              {isInWishlist ? (
                <FcLike size={20} />
              ) : (
                <FcLikePlaceholder size={20} />
              )}
            </Button>

            <Button
              variant="light"
              // disabled={isInCart}
              onClick={() => {
                if (!isInCart) {
                  toast.success("Added to cart!");
                  dispatch(addToCart(productData));
                } else {
                  toast.dismiss();
                  toast.error("Already in cart");
                }
              }}
            >
              <FaShoppingCart size={20} />
            </Button>
            <Button
              variant="light"
              onClick={() => {
                if (!isInCompare) {
                  dispatch(addToCompare(productData));
                } else {
                  dispatch(deleteFromCompare(productData));
                }
              }}
            >
              {!isInCompare ? (
                <FaExchangeAlt size={20} />
              ) : (
                <FcCancel size={20} />
              )}
            </Button>
          </div>
          <p className="mt-3">
            <em>{productData.category.join(", ")}</em>
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex align-items-center justify-content-between w-100">
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => alert("Added to cart!")}>
            Add to Cart
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
