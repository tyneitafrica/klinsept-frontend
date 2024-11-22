import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { addToCart } from "../redux/actions/cartActions";
import { addToWishlist } from "../redux/actions/wishlistActions";
import { addToCompare } from "../redux/actions/compareActions";
import { useSelector } from "react-redux";
import {
  FaHeart,
  FaShoppingCart,
  FaAngleRight,
  FaAngleLeft,
  FaExchangeAlt,
} from "react-icons/fa";
import { toast } from "react-hot-toast";


export const ProductModal = ({ show, handleClose, productData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const wishlistItems = useSelector((state) =>state.wishlistData)
  console.log(wishlistItems, productData)
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
    return null; // or render a loading indicator
  }

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
      <p><strong>${productData.price}</strong></p>
      <div className="modal-btns d-flex gap-2">
        <Button variant="light" onClick={() => {
          addToWishlist(productData);
          toast.success("Added to wishlist!");
        }}>
          <FaHeart size={20} />
        </Button>
        <Button variant="light" onClick={() => alert("Added to cart!")}>
          <FaShoppingCart size={20} />
        </Button>
        <Button variant="light" onClick={() => alert("Compared!")}>
          <FaExchangeAlt size={20} />
        </Button>
      </div>
      <p className="mt-3"><em>{productData.category.join(", ")}</em></p>
    </div>
  </Modal.Body>
  <Modal.Footer>
    <div className="d-flex align-items-center justify-content-between w-100">
      <Button variant="secondary" onClick={handleClose}>
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
