import React, { useState, useEffect } from "react";
import { addToCart } from "../redux/actions/cartActions";
import {
  addToWishlist,
  deleteFromWishlist,
} from "../redux/actions/wishlistActions";
import * as compareActions from "../redux/actions/compareActions";
import { useSelector, useDispatch } from "react-redux";
import {
  FaShoppingCart,
  FaAngleRight,
  FaAngleLeft,
  FaExchangeAlt,
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import { FcLike, FcLikePlaceholder, FcCancel } from "react-icons/fc";
import { Card, Nav, ButtonGroup, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const ProductModal = ({ show, handleClose, productData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // const wishlistItems = useSelector((state) =>state.wishlistData)
  const [selectedVariation, setSelectedVariation] = useState(
    productData?.variations[0]
  );

  const [isChecked, setIsChecked] = useState(false);
  const reduxData = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    if (productData?.variations) {
      setSelectedVariation(productData.variations[0]);
    }
  }, [productData]);

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
  const handleVariationClick = (variation) => {
    setSelectedVariation(variation);
  };

  const isIn = (data, id) => data.some((item) => item.id === id);

  const isInWishlist = isIn(reduxData.wishlistData, productData.id);
  const isInCart = isIn(reduxData.cartData, productData.id);
  const isInCompare = isIn(reduxData.compareData, productData.id);

  const currency = reduxData.currencyData

  const getFormattedPrice = (price) => {
    const { symbol, rates } = currency.selectedCurrency || {};
    const convertedPrice = symbol && rates ? (price * rates).toFixed(2) : price;
    return `${symbol || ''} ${convertedPrice}`;
  };
  return (
    <Modal show={show} onHide={handleClose} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>{productData.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column flex-md-column">
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
        <div className="product-details-container mb-5 mt-4 md-0 ml-md-4">
          <p>{productData.description}</p>
          <div className="product-details-price d-flex align-items-center">
            {!isChecked ? (
            <span className="me-2 fw-bold text-primary">
            {selectedVariation?.discount ? (
              <>
                <span
                  style={{ textDecoration: "line-through" }}
                  className="fw-bold text-primary mr-4"
                >
                  {getFormattedPrice(selectedVariation?.price)}
                </span>
                <span className="text-success ms-2">
                  {getFormattedPrice(selectedVariation?.discount)}
                </span>
              </>
            ) : (
              <span className="fw-bold text-primary">
                {getFormattedPrice(selectedVariation?.price)}
              </span>
            )}
          </span>
            ) : (
              <>
                <Link
                  to={`/product/${productData.id}`}
                  onClick={() =>
                    setTimeout(() => {
                      handleClose();
                    }, 700)
                  }
                >
                  Buy in bulk
                </Link>
              </>
            )}
          </div>

          <Card className="mb-3">
            <Card.Header>
              <Nav variant="tabs" defaultActiveKey="variations">
                <Nav.Item>
                  <Nav.Link
                    eventKey="variations"
                    active={!isChecked}
                    onClick={() => setIsChecked(false)}
                  >
                    Retail
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="Wholesale"
                    active={isChecked}
                    onClick={() => setIsChecked(true)}
                  >
                    Wholesale
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body>
              {!isChecked ? (
                <ButtonGroup aria-label="Variations">
                  {productData?.variations.map((single, key) => (
                    <Button
                      key={key}
                      variant={
                        selectedVariation?.size === single.size
                          ? "primary"
                          : "outline-primary"
                      }
                      onClick={() => handleVariationClick(single)}
                    >
                      {/* {console.log(single)} */}
                      {single.size}
                    </Button>
                  ))}
                </ButtonGroup>
              ) : (
                <>
                  <Link
                    to={`/product/${productData.id}`}
                    onClick={() =>
                      setTimeout(() => {
                        handleClose();
                      }, 700)
                    }
                  >
                    Buy in bulk
                  </Link>
                </>
              )}
            </Card.Body>
          </Card>

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
                  toast.dismiss();
                  toast.success("Added to cart!");
                  dispatch(
                    addToCart(productData, 1, selectedVariation.size, "Retail")
                  );
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
                  dispatch(compareActions.addToCompare(productData));
                } else {
                  dispatch(compareActions.deleteFromCompare(productData));
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
