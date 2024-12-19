import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import ProductImageGallery from "../../components/product/ProductImageGallery";
// import ProductDescriptionInfo from "../../components/product/ProductDescriptionInfo";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FcLike, FcLikePlaceholder, FcCancel } from "react-icons/fc";
import { SlRefresh } from "react-icons/sl";
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
import { Card, Nav, ButtonGroup, Button, Badge } from "react-bootstrap";
// import SectionTitle from "../../components/SectionTitle";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeadphones } from "react-icons/fa6";
import { FaTruck } from "react-icons/fa";
import { CiCreditCard1 } from "react-icons/ci";





const ProductImageDescription = ({
  product,
  currency,
  cartItems,
  wishlistItems,
  compareItems,
  t
}) => {
  const [selectedVariation, setSelectedVariation] = useState(
    product.variations[0]
  );
  const [selectedBulk, setSelectedBulk] = useState(product.bulk_wholesale[0]);
  const [isChecked, setIsChecked] = useState(false);
  const [quantityCount, setQuantityCount] = useState(1);
  const [show, setShow] = useState(true);
  const isProductInList = (productId, list) =>
    list.some((item) => item.id === productId);

  // const isProductInCart = isProductInList(product.id, cartItems);
  const isProductInWishlist = isProductInList(product.id, wishlistItems);
  const isProductInCompare = isProductInList(product.id, compareItems);

  const dispatch = useDispatch();

  const handleVariationClick = (variation) => {
    setSelectedVariation(variation);
  };

  // handle description and additional information
  const handleDescriptionClick = () => {
    setShow(prevState => !prevState);
  };


  // console.log(product);
  const handleBulkClick = (item) => {
    setSelectedBulk(item);
  };
  const convertedPrice = (price) => {
    return currency.selectedCurrency
      ? (price * currency.selectedCurrency.rates).toFixed(2)
      : price;
  };
  return (
    <div className={`shop-area pt-100 pb-100`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            {/* product image gallery */}

            <ProductImageGallery product={product} />
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="product-details-content ml-70">
              {/* Star Rating */}
              <div className="product-rating">
                {[...Array(5)].map((_, index) => (
                  <span key={index} className="star-icon">
                    {index < product.rating ? "★" : "★"} {/* Solid or hollow star */}
                  </span>
                ))}
                <span className="rating-number">{product.rating} 4.7 Star Rating</span>
              </div>
              <h2>{product.name}</h2>
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
              <div className="product-details-price d-flex align-items-center">
                {!isChecked ? (
                  <span className="me-2">
                    {/* Show original price with strike-through if discount exists */}
                    {selectedVariation?.discount ? (
                      <>
                        <span
                          style={{ textDecoration: "line-through" }}
                          className="fw-bold text-primary mr-4"
                        >
                          {`${
                            currency.selectedCurrency.symbol || ""
                          } ${convertedPrice(selectedVariation?.price)}`}
                        </span>
                        <span className="text-success ms-2">
                          {`${
                            currency.selectedCurrency.symbol || ""
                          } ${convertedPrice(selectedVariation?.discount)}`}
                        </span>
                      </>
                    ) : (
                      <span className="fw-bold text-primary">
                        {`${
                          currency.selectedCurrency.symbol || ""
                        } ${convertedPrice(selectedVariation?.price)}`}
                      </span>
                    )}
                  </span>
                ) : (
                  <span className="fw-bold text-success">
                    {`${
                      currency.selectedCurrency.symbol || ""
                    } ${convertedPrice(selectedBulk?.bulk_price)}`}
                  </span>
                )}
              </div>
              <div>
                {product.variations.map((single, key) => (
                  <p key={key} style={{
                    color: single.stock > 0 ? 'green' : 'red',
                    fontWeight: 'bold',
                    marginBottom:"10px",
                    // backgroundColor: single.stock > 0 ? '#e6f7e6' : '#fdd',
                    // padding: '5px 10px',
                    // borderRadius: '5px'
                  }}>
                    Availability: {single.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </p>
                ))}
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
                        Wholesale{" "}
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Card.Header>
                <Card.Body>
                  {!isChecked ? (
                    <ButtonGroup aria-label="Variations">
                      {product.variations.map((single, key) => (
                        <Button
                          key={key}
                          variant={
                            selectedVariation.size === single.size
                              ? "primary"
                              : "outline-primary"
                          }
                          onClick={() => handleVariationClick(single)}
                        >
                          {single.size}
                        </Button>
                      ))}
                    </ButtonGroup>
                  ) : (
                    <>
                      {product.bulk_wholesale.length > 0 && (
                        <Badge variant="info" className="ms-2">
                          Min: {selectedBulk.min_quantity}
                        </Badge>
                      )}
                      <ButtonGroup aria-label="bulk-options">
                        {product.bulk_wholesale.map((single, key) => (
                          <Button
                            key={key}
                            variant={
                              selectedBulk.size === single.size
                                ? "info"
                                : "outline-info"
                            }
                            onClick={() => handleBulkClick(single)}
                          >
                            {single.size}
                          </Button>
                        ))}
                      </ButtonGroup>
                    </>
                  )}
                </Card.Body>
              </Card>

              
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
                  <div className="pro-details-cart ">
                    <button
                      onClick={() => {
                        const selectedItem = isChecked
                          ? selectedBulk
                          : selectedVariation;
                        const order_type = isChecked ? "Wholesale" : "Retail";

                        dispatch(
                          addToCart(
                            product,
                            quantityCount,
                            selectedItem.size,
                            order_type
                          )
                        );
                      }}
                      >
                      Add To Cart  <FaShoppingCart size={19} />
                    </button>
                  </div>
                </div>

                <div className="wishlist-compare-container">
                  <div className="wishlist-item">
                    {isProductInWishlist ? (
                      <FcLike
                        onClick={() => dispatch(deleteFromWishlist(product, toast))}
                        className="heart-icon"
                        title="Remove from Wishlist"
                      />
                    ) : (
                      <FcLikePlaceholder
                        onClick={() => {
                          dispatch(addToWishlist(product, toast)); // Dispatch to Redux
                        }}
                        className="heart-icon"
                      />
                    )}
                    <span>Add to Wishlist</span>
                  </div>

                  <div className="compare-item">
                    {!isProductInCompare ? (
                      <SlRefresh
                        size={22}
                        onClick={() => {
                          dispatch(addToCompare(product)); // No need to pass toast
                        }}
                      />
                    ) : (
                      <FcCancel
                        size={25}
                        title="Remove from Compare"
                        onClick={() => dispatch(deleteFromCompare(product))} // No need to pass toast
                      />
                    )}
                    <span>Add to Compare</span>
                  </div>
                </div>

            </div>
          </div>

          {/* insert table */}
          
          <Card className="mt-20 mb-5">
          <Card.Header>
                  <Nav variant="tabs" defaultActiveKey="description">
                    <Nav.Item>
                      <Nav.Link
                        eventKey="description"
                        active={show}
                        onClick={() => handleDescriptionClick()}
                      >
                        Description
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="additionalinformation"
                        active={!show}
                        onClick={() => handleDescriptionClick()}
                      >
                        Additional Information
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Card.Header>
                <Card.Body>
                  {show ? (
                    <ButtonGroup
                    aria-label="description"
                    style={{
                      display: "flex",
                      gap: "20px",
                      flexWrap: "wrap", // Allows wrapping on smaller screens
                    }}
                  >
                    {/* Product Description */}
                    <div
                      style={{
                        flex: 1,
                        paddingRight: "10px",
                        borderRight: "1px solid #ddd",
                        marginBottom: "20px", // Adds space when stacked
                        minWidth: "300px", // Ensures consistent size
                      }}
                    >
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#555",
                          display: "block",
                          lineHeight: "2.8",
                        }}
                      >
                        {product.description}
                      </span>
                    </div>
                  
                    {/* Additional Static Data */}
                    <div
                      style={{
                        flex: 1,
                        paddingLeft: "10px",
                        minWidth: "300px", // Ensures consistent size
                      }}
                    >
                      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                        <h3>Features</h3>
                        <li
                          style={{
                            marginBottom: "10px",
                            marginLeft:"20px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                        <FaTruck size={20}
                          style={{ marginRight: "10px" }} // Adds space between the icon and text
                        /> Fast Delivery
                        </li>
                        <li
                          style={{
                            marginBottom: "10px",
                            marginLeft:"20px",
                            display: "flex",
                            alignItems: "center",
                          }}
                          >
                            <CiCreditCard1 size={20}
                            style={{ marginRight: "10px" }} // Adds space between the icon and text

                            /> Secure Payment
                        </li>
                        <li
                          style={{
                            marginBottom: "10px",
                            marginLeft:"20px",
                            display: "flex",
                            alignItems: "center",
                          }}
                          >
                            <FaHeadphones size={20} 
                             style={{ marginRight: "10px" }} // Adds space between the icon and text
                            /> 24/7 Customer Support

                        </li>
                      </ul>
                    </div>
                  </ButtonGroup>                  

                  ) : (
                  <>

                  <ButtonGroup aria-label="additionalinformation">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        marginTop: "15px",
                      }}
                      className="product-details-updated"
                    >
                      {[
                        { label: "Storage Instructions", data: product.storage_instructions },
                        { label: "Mechanism Of Action", data: product.mechanism_of_action },
                        { label: "Product Usage", data: product.usage },
                        { label: "Dilution Instructions", data: product.dilution_instructions },
                        { label: "Indication", data: product.indications },
                        { label: "Presentation", data: product.presentation },
                        { label: "Warning", data: product.warnings },
                        { label: "Storage", data: product.storage },
                        { label: "Active Ingredients", data: product.active_ingredients },
                      ].map((item, index) => (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            flexDirection: window.innerWidth <= 768 ? "column" : "row", // Adjust layout based on screen size
                            justifyContent: window.innerWidth <= 768 ? "flex-start" : "space-between",
                            alignItems: "flex-start",
                            padding: "10px",
                            borderBottom: "1px solid #ddd",
                          }}
                          className="product-detail-row-updated"
                        >
                          <div
                            style={{
                              fontWeight: "bold",
                              fontSize: "16px",
                              color: "#333",
                              flex: "1",
                              marginBottom: window.innerWidth <= 768 ? "5px" : "0",
                            }}
                            className="product-detail-label"
                          >
                            {item.label}
                          </div>
                          <div
                            style={{
                              fontSize: "14px",
                              color: "#555",
                              flex: "2",
                              textAlign: "left",
                            }}
                            className="product-detail-data"
                          >
                            {item.data || "N/A"}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ButtonGroup>


                    </>
                  )}
                </Card.Body>
              </Card>

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
