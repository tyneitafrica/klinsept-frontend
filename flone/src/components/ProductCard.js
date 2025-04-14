import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Button, Alert } from "react-bootstrap";
import { FaShoppingCart, FaHeart, FaExchangeAlt } from "react-icons/fa";

const ProductCard = ({
  product,
  cartItems,
  wishlistItems,
  compareItems,
  addToCart,
  addToWishlist,
  addToCompare,
}) => {
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });
  let timer; 

  const showAlert = (message, variant) => {
    setAlert({ show: true, message, variant });
    timer = setTimeout(() => {
      setAlert({ show: false, message: "", variant: "" });
    }, 3000);
  };

  useEffect(() => {
    return () => clearTimeout(timer); 
  }, [timer]);


  const handleAddToCart = () => {
    if (cartItems.find((item) => item.id === product.id)) {
      // my back dev
      showAlert(`${product.name} is already in your cart!`, "warning");
    } else {
      addToCart(product);
      showAlert(`${product.name} added to your cart!`, "success");
    }
  };

  const handleAddToWishlist = () => {
    if (wishlistItems.find((item) => item.id === product.id)) {
      showAlert(`${product.name} is already in your wishlist!`, "warning");
    } else {
      addToWishlist(product);
      showAlert(`${product.name} added to your wishlist!`, "success");
    }
  };

  const handleAddToCompare = () => {
    if (compareItems.find((item) => item.id === product.id)) {
      showAlert(
        `${product.name} is already in your comparison list!`,
        "warning"
      );
    } else {
      addToCompare(product);
      showAlert(`${product.name} added to your comparison list!`, "success");
    }
  };

  return (
    <>
      <Card className="product-card shadow-sm position-relative">
        {alert.show && (
          <Alert
            variant={alert.variant}
            className="position-absolute w-100 text-center"
            style={{ top: 0, zIndex: 1000 }}
          >
            {alert.message}
          </Alert>
        )}
        <Card.Img
          variant="top"
          src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=987&auto=format&fit=crop"
        />
        <Card.Body>
          <Card.Title className="product-title">{product.name}</Card.Title>
          <span className="price">${product.variations[1].price}</span>
          <div className="buttons d-flex justify-content-between align-items-center">
            <Button
              variant="outline-primary"
              className="icon-btn"
              onClick={handleAddToCart}
            >
              <FaShoppingCart />
            </Button>
            <Button
              variant="outline-danger"
              className="icon-btn"
              onClick={handleAddToWishlist}
            >
              <FaHeart />
            </Button>
            <Button
              variant="outline-warning"
              className="icon-btn"
              onClick={handleAddToCompare}
            >
              <FaExchangeAlt />
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object,
  cartItems: PropTypes.array,
  wishlistItems: PropTypes.array,
  compareItems: PropTypes.array,
  addToCart: PropTypes.func,
  addToWishlist: PropTypes.func,
  addToCompare: PropTypes.func,
};

export default ProductCard;
