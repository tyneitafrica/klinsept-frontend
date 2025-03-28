import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { MdDelete, MdShoppingCart } from "react-icons/md";
import { FiShoppingBag } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import LayoutOne from "../../components/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import LoginModal from "../auth/LoginModal";
import { isAuthenticated } from "../../helpers/backendFectch";
import { priceConverter } from "../../redux/actions/currencyActions";
import {
  fetchAndReplaceCart,
  deleteAllFromCart,
  deleteFromCart,
} from "../../redux/actions/cartActions";

const Cart = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  const cartItems = useSelector((state) => state.cartData);
  const currency = useSelector((state) => state.currencyData);

  useEffect(() => {
    dispatch(fetchAndReplaceCart(setLoading));
  }, [dispatch]);

  const handleProceedCheckout = async (e) => {
    e.preventDefault();
    const response = await isAuthenticated(setLoadingCheckout);
    response?.data ? navigate("/checkout") : setShowModal(true);
  };

  if (loading) {
    return (
      <div className="cart-loader">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
  
    <div className="mt-100">
    <LayoutOne >
      <MetaTags>
        <title>Klinsept | Cart</title>
        <meta name="description" content="Your shopping cart" />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Cart
      </BreadcrumbsItem>

      <div className="cart-container">
        <Breadcrumb />

        <div className="cart-content">
          {cartItems?.length >= 1 ? (
            <Fragment>
              <h2 className="cart-title">Your Shopping Cart</h2>

              <div className="cart-table-container">
                <div className="cart-table-responsive">
                  <table className="cart-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((cartItem) => {
                        const {
                          convertedPrice: originalPrice,
                          currencySymbol,
                        } = priceConverter(
                          cartItem.price,
                          currency.selectedCurrency
                        );
                        const { convertedPrice: lineTotal } = priceConverter(
                          cartItem.line_total,
                          currency.selectedCurrency
                        );

                        return (
                          <tr key={cartItem.product_id}>
                            <td className="product-cell">
                              <div className="product-info">
                                <Link
                                  to={`/product/${cartItem.id}`}
                                  className="product-image"
                                >
                                  <img
                                    src={cartItem.image}
                                    alt={cartItem.name}
                                  />
                                </Link>
                                <div className="product-details">
                                  <Link
                                    to={`/product/${cartItem.id}`}
                                    className="product-name"
                                  >
                                    {cartItem.name}
                                  </Link>
                                  {cartItem.size && (
                                    <span className="product-size">
                                      {cartItem.size}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="price-cell">
                              {currencySymbol}
                              {originalPrice}
                            </td>
                            <td className="quantity-cell">
                              <div className="quantity-display">
                                {cartItem.quantity}
                              </div>
                            </td>
                            <td className="total-cell">
                              {currencySymbol}
                              {lineTotal}
                            </td>
                            <td className="action-cell">
                              <button
                                onClick={() =>
                                  dispatch(deleteFromCart(cartItem, dispatch))
                                }
                                className="remove-btn"
                                aria-label="Remove item"
                              >
                                &times;
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="cart-actions">
                  <Button
                    onClick={handleProceedCheckout}
                    className="checkout-btn"
                    disabled={loadingCheckout}
                  >
                    {loadingCheckout ? (
                      <>
                        <Spinner as="span" animation="border" size="sm" />
                        <span className="ms-2">Processing...</span>
                      </>
                    ) : (
                      "Proceed to Checkout"
                    )}
                  </Button>

                  <div className="secondary-actions">
                    <Link to="/products" className="continue-shopping">
                      <FiShoppingBag className="me-2" />
                      Continue Shopping
                    </Link>
                    <Button
                      variant="outline-danger"
                      onClick={() => dispatch(deleteAllFromCart(dispatch))}
                      className="clear-cart"
                    >
                      <MdDelete className="me-2" />
                      Clear Cart
                    </Button>
                  </div>
                </div>
              </div>
            </Fragment>
          ) : (
            <div className="empty-cart">
              <div className="empty-cart-icon">
                <MdShoppingCart />
              </div>
              <h3>Your cart is empty</h3>
              <p>Looks like you haven't added any items yet</p>
              <Link to="/products" className="shop-now-btn">
                Start Shopping
              </Link>
            </div>
          )}
        </div>
      </div>

      <LoginModal show={showModal} setShow={setShowModal} />
    </LayoutOne>
    </div>
  );
};

export default Cart;
