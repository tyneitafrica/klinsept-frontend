import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LoginModal from "../auth/LoginModal";
import LayoutOne from "../../components/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useLocation } from "react-router-dom";
// import axios from "axios";
import { getCartItems, isAuthenticated } from "../../helpers/backendFectch";
import { deleteAllFromCart } from "../../redux/actions/cartActions";
import { useDispatch } from "react-redux";

const Cart = ({
  // cartItems,
  deleteFromCart,
}) => {
  const { addToast } = useToasts();
  const { pathname } = useLocation();
  const [showModal, setShowmodal] = useState(false);
  const navigate = useNavigate();
  const [cartItems, setCartData] = useState([]);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    deleteFromCart(id, addToast);
  };

  const handleProceedCheckout = async (e) => {
    e.preventDefault();
    const userData = await isAuthenticated();
    if (userData) {
      navigate("/checkout");
    } else {
      setShowmodal(true);
    }
  };
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const data = await getCartItems(); // Fetch cart items from backend
        setCartData(data); // Store in local state
        console.log(data);
      } catch (error) {
        alert("Failed to fetch cart items", { appearance: "error" });
      }
    };

    fetchCartData();
  }, []);

  const handleClearCart = () => {
    // console.log("clicked")
    dispatch(deleteAllFromCart());
  };

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
                                  </Link>
                                </td>

                                <td className="product-price-cart">
                                  {cartItem.price}
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
                                  {/* to 2 dp */}
                                  {cartItem.line_total.toFixed(2)}
                                </td>

                                <td className="product-remove">
                                  <button
                                    onClick={() => handleDelete(cartItem.id)}
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
                <div className="row">
                  <div className="col-lg-12">
                    <div className="cart-shiping-update-wrapper">
                      <div className="cart-shiping-update">
                        <Link
                          to={process.env.PUBLIC_URL + "/shop-grid-standard"}
                        >
                          Continue Shopping
                        </Link>
                      </div>
                      <div className="cart-clear">
                        <button onClick={handleClearCart}>
                          Clear Shopping Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-4 col-md-12">
                    <div>
                      <button
                        onClick={handleProceedCheckout}
                        className="btn btn-primary"
                      >
                        Proceed to Checkout
                      </button>
                      {/* Show LoginModal */}
                      {showModal && (
                        <LoginModal show={showModal} setShow={setShowmodal} />
                      )}
                    </div>
                  </div>
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
