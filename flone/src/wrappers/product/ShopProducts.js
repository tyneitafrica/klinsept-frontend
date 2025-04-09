import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { getProducts } from "../../helpers/product";
import { addToCart } from "../../redux/actions/cartActions";
import { addToWishlist } from "../../redux/actions/wishlistActions";
import { addToCompare } from "../../redux/actions/compareActions";
import { deleteFromWishlist } from "../../redux/actions/wishlistActions";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { Card, Button, Badge, Form } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { FaShoppingCart, FaEye } from "react-icons/fa";
import "../../assets/css/ProductCard.css";

import { Link } from "react-router-dom";

// CSS will be in a separate stylesheet

const ShopProducts = ({
  products,
  currentData,
  currency,
  addToCart,
  wishlistItems,
}) => {
  const finalProducts = currentData || products;
  const dispatch = useDispatch();

  return (
    <Fragment>
      <div className="shop-products-container">
        <div className="products-grid">
          {finalProducts.map((product, index) => (
            <ProductCard 
              key={index} 
              product={product} 
              currency={currency}
              isProductInWishlist={wishlistItems.some(item => item.id === product.id)}
              addToCart={addToCart}
              addToWishlist={() => dispatch(addToWishlist(product, toast))}
              deleteFromWishlist={() => dispatch(deleteFromWishlist(product, toast))}
            />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

const ProductCard = ({ 
  product, 
  currency, 
  isProductInWishlist, 
  addToCart, 
  addToWishlist, 
  deleteFromWishlist 
}) => {
  const [selectedVariation, setSelectedVariation] = useState(
    product.variations.length > 0 ? product.variations[0] : null
  );
  const [purchaseType, setPurchaseType] = useState("Retail");
  const [quantity, setQuantity] = useState(1);

  // Find the corresponding wholesale item for the selected variation
  const getWholesaleItem = () => {
    if (!product.bulk_wholesale || purchaseType !== "Wholesale") return null;
    return product.bulk_wholesale.find(item => item.size === selectedVariation.size);
  };

  const wholesaleItem = getWholesaleItem();

  const priceConverter = (price) => {
    let convertedPrice = price;
    let currencySymbol = "$";

    if (currency?.selectedCurrency) {
      const { rates, symbol } = currency.selectedCurrency;
      convertedPrice = (price * rates).toFixed(2);
      currencySymbol = symbol || "$";
    }

    // Format the price with commas
    convertedPrice = parseFloat(convertedPrice).toLocaleString();

    return { convertedPrice, currencySymbol };
  };

  const { convertedPrice, currencySymbol } = priceConverter(
    purchaseType === "Wholesale" && wholesaleItem 
      ? wholesaleItem.bulk_price 
      : selectedVariation?.price || 0
  );

  const convertedDiscount = priceConverter(
    selectedVariation?.discount || 0
  ).convertedPrice;

  // Minimum quantity check for wholesale
  const minQuantity = wholesaleItem?.min_quantity || 1;
  
  // Update quantity when switching between retail and wholesale
  useEffect(() => {
    if (purchaseType === "Wholesale" && wholesaleItem) {
      setQuantity(Math.max(quantity, minQuantity));
    } else {
      setQuantity(1);
    }
  }, [purchaseType, selectedVariation, minQuantity, quantity, wholesaleItem]);

  // Handle add to cart
  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariation.size, purchaseType);
    toast.success(`Added ${product.name} (${selectedVariation.size}) to cart`);
  };

  return (
    <Card className="product-card">

      <div className="product-badge-container">
        {selectedVariation?.discount > 0 && (
          <Badge bg="danger" className="discount-badge">
            Sale
          </Badge>
        )}
        {selectedVariation?.stock <= 5 && selectedVariation?.stock > 0 && (
          <Badge bg="warning" text="dark" className="stock-badge">
            Low Stock
          </Badge>
        )}
        {selectedVariation?.stock === 0 && (
          <Badge bg="secondary" className="stock-badge">
            Out of Stock
          </Badge>
        )}
      </div>
      
      <div className="product-image-container">
        <img
          src={product.images[0]?.image || "/assets/img/banner/KlinSav.jpg"}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
        <div className="overlay-icons">
          {isProductInWishlist ? (
            <FcLike
              onClick={deleteFromWishlist}
              className="wishlist-icon active"
              title="Remove from Wishlist"
            />
          ) : (
            <FcLikePlaceholder
              onClick={addToWishlist}
              className="wishlist-icon"
              title="Add to Wishlist"
            />
          )}
          <Link to={`/product/${product.id}`} className="quick-view-icon" title="View Details">
            <FaEye />
          </Link>
        </div>
      </div>

      <Card.Body className="product-card-body">
        <Card.Title className="product-name">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </Card.Title>
        
        <div className="product-description">
          {product.description && (
            <p className="description-text">{product.description.substring(0, 60)}...</p>
          )}
        </div>

        <div className="product-variations">
          <Form.Group className="size-selection-group">
            <Form.Label className="variation-label">Size:</Form.Label>
            <div className="size-buttons">
              {product.variations.map((variation, idx) => (
                <Button
                  key={idx}
                  variant={selectedVariation?.size === variation.size ? "primary" : "outline-primary"}
                  size="sm"
                  className="size-button"
                  onClick={() => setSelectedVariation(variation)}
                  disabled={variation.stock <= 0}
                >
                  {variation.size}
                </Button>
              ))}
            </div>
          </Form.Group>
        </div>

        <div className="price-section">
          {selectedVariation?.discount > 0 && (
            <span className="original-price">
              {currencySymbol} {convertedPrice}
            </span>
          )}

          <span className="current-price">
            {currencySymbol}{" "}
            {selectedVariation?.discount > 0 ? convertedDiscount : convertedPrice}
          </span>
        </div>

        <div className="purchase-options">
          <div className="quantity-selector">
            <Form.Label className="variation-label">Quantity:</Form.Label>
            <Form.Control
              type="number"
              min={purchaseType === "Wholesale" && wholesaleItem ? minQuantity : 1}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(parseFloat(e.target.value) || 1, 
                purchaseType === "Wholesale" && wholesaleItem ? minQuantity : 1))}
              className="quantity-input"
            />
          </div>
        </div>

        <Button
          variant="primary"
          className="add-to-cart-btn"
          onClick={handleAddToCart}
          disabled={selectedVariation?.stock <= 0}
        >
          <FaShoppingCart className="cart-icon" />
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

ShopProducts.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItems: PropTypes.array,
  compareItems: PropTypes.array,
  currency: PropTypes.object,
  products: PropTypes.array,
};

const mapStateToProps = (state, ownProps) => {
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
    deleteFromWishlist: (item, addToast) => {
      dispatch(deleteFromWishlist(item, addToast));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ShopProducts);
// const VariationSelector = ({ product, priceConverter, onVariationSelect }) => {
//   const [selectedVariation, setSelectedVariation] = useState(
//     () =>
//       product.variations[Math.floor(Math.random() * product.variations.length)]
//   );
//   useEffect(() => {
//     // Notify parent with the initial selected variation
//     onVariationSelect(selectedVariation);
//   }, [selectedVariation]); // Only run if selectedVariation changes

// // console.log(product.variations[Math.floor(Math.random() * product.variations.length)])
//   const handleVariationClick = (variation) => {
//     console.log("child",variation)
//     setSelectedVariation(variation);
//     // onVariationSelect(selectedVariation);
//   };

//   // Convert price based on the selected variation
//   const { convertedPrice, currencySymbol } = priceConverter(
//     selectedVariation?.price || 0
//   );

//   return (
//     <>
//       <div className="row my-3">
//         {/* {product.variations.map((variation, index) => (
//           <div key={index} className="col-auto">
//             <Card.Text
//               onClick={() => handleVariationClick(variation)}
//               className={`product-description ${
//                 selectedVariation === variation ? "text-primary fw-bold" : ""
//               }`}
//               style={{ cursor: "pointer" }}
//             >
//               {variation.size}
//             </Card.Text>
//           </div>
//         ))} */}
//       </div>
//       <Card.Text className="text-left product-price">
//         {currencySymbol} {convertedPrice}
//       </Card.Text>
//     </>
//   );
// };
