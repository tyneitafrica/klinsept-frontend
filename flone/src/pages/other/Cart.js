import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LoginModal from "../auth/LoginModal";
import LayoutOne from "../../components/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useLocation } from "react-router-dom";
import { isAuthenticated } from "../../helpers/backendFectch";
import {
  fetchAndReplaceCart,
  deleteAllFromCart,
  deleteFromCart,
} from "../../redux/actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { Button, Spinner } from "react-bootstrap";
import { priceConverter } from "../../redux/actions/currencyActions";
const Cart = () => {
  const { pathname } = useLocation();
  const [showModal, setShowmodal] = useState(false);
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cartData);
  const currency = useSelector((state) => state.currencyData);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  const handleProceedCheckout = async (e) => {
    e.preventDefault();
    const response = await isAuthenticated(setLoadingCheckout);

    if (response?.data ) {
      navigate("/checkout");
    } else {
      setShowmodal(true);
    }
  };
  useEffect(() => {
    dispatch(fetchAndReplaceCart(setLoading));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flone-preloader-wrapper">
        <div className="flone-preloader">
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-90">
      <MetaTags>
        <title> Klinsept | Cart</title>
        <meta
          name="description"
          content="Cart page of  react minimalist eCommerce template."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Cart
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <Fragment>
                <h3 className="cart-page-title">Your cart items</h3>
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">
                      <table>
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Unit Price</th>
                            <th>Qty</th>
                            <th>Subtotal</th>
                            <th>action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((cartItem, key) => {
                            const {
                              convertedPrice: originalPrice,
                              currencySymbol,
                            } = priceConverter(
                              cartItem.price,
                              currency.selectedCurrency
                            );
                            const { convertedPrice: lineTotal } =
                              priceConverter(
                                cartItem.line_total,
                                currency.selectedCurrency
                              );

                            return (
                              <tr key={key}>
                                <td className="product-thumbnail">
                                  <Link to={`/product/${cartItem.product_id}`}>
                                    <img
                                      className="img-fluid"
                                      src={cartItem.image}
                                      alt="cartData"
                                    />
                                  </Link>
                                </td>

                                <td className="product-name">
                                  <Link to={`/product/${cartItem.product_id}`}>
                                    {cartItem.name}
                                  </Link>{" "}
                                  {cartItem.size}
                                </td>

                                <td className="product-price-cart">
                                  {currencySymbol} {originalPrice}
                                </td>

                                <td className="product-quantity">
                                  <div className="cart-plus-minus">
                                    <input
                                      className="cart-plus-minus-box"
                                      type="text"
                                      value={cartItem.quantity}
                                      readOnly
                                    />
                                  </div>
                                </td>
                                <td className="product-subtotal">
                                  {currencySymbol} {lineTotal}
                                </td>

                                <td className="product-remove">
                                  <button
                                    onClick={() => {
                                      dispatch(
                                        deleteFromCart(cartItem, dispatch)
                                      );
                                    }}
                                  >
                                    <i className="fa fa-times"></i>
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="d-flex m-3 justify-content-between">
                  <Link className="btn btn-outline-info" to={"/products"}>
                    Shop
                  </Link>
                  <Button
                    variant="outline-danger"
                    onClick={() => dispatch(deleteAllFromCart(dispatch))}
                  >
                    Clear
                  </Button>
                </div>

                <div className="row m-3">
                  <div className="place-order mt-25">
                    <Button
                      onClick={handleProceedCheckout}
                      variant="btn btn-outline-success"
                      style={{ fontWeight: "bold" }}
                      disabled={loadingCheckout}
                    >
                      {loadingCheckout ? (
                        <>
                          <Spinner
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                          {"  "}
                          Checking out...
                        </>
                      ) : (
                        "Checkout"
                      )}
                    </Button>
                  </div>
                  {showModal && (
                    <LoginModal show={showModal} setShow={setShowmodal} />
                  )}
                </div>
              </Fragment>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cart"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/products"}>
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </div>
  );
};

export default Cart;
