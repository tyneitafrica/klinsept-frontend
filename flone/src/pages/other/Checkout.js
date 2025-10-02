import PropTypes from "prop-types";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../components/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useLocation } from "react-router-dom";
import { Form, Button, Spinner } from "react-bootstrap";
import toast from "react-hot-toast";

const API_KEY = "f6c52669-b6a9-4901-8558-5bc72b7e983a";
const API_URL = "https://klinsept-backend-new.onrender.com/api/v1.0/";

const Checkout = ({ cartItems, currency }) => {
  const { pathname } = useLocation();
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Form fields
  const [formData, setFormData] = useState({
    country: "",
    state: "",
    city: "",
    address: "",
    zip_code: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      // Prepare data for API call

      try {
        setLoading(true);
        const response = await fetch(`${API_URL}order/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
          },
          credentials: "include",
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          // setLoading(false);          
          const data = await response.json();
          toast.success("Order created Successfully");
          setTimeout(() => {
            navigate(`/payment/${data.order_id}`);
          }, 500);
        } else {
          // setLoading(false)
          const error = await response.json();
          console.error("Error:", error);
          alert(error.error || "Failed to create order");
        }
      } catch (error) {
        // setLoading(false)
        console.error("Error creating order:", error);
        alert("Something went wrong! Please try again.");
      }finally{
        setLoading(false)
      }
    }
    setValidated(true);
  };

  
  return (
    <div className="mt-90">
      <MetaTags>
        <title> Klinsept | Checkout</title>
        <meta
          name="description"
          content="Checkout page of react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Checkout
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        <Breadcrumb />
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <div className="row">
                <div className="col-lg-7">
                  <div className="billing-info-wrap">
                    <h3>Delivery Details</h3>
                    <Form
                      noValidate
                      validated={validated}
                      onSubmit={handleSubmit}
                    >
                      <div className="row">
                        <div className="col-lg-12">
                          <Form.Group controlId="country">
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                              as="select"
                              value={formData.country}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  country: e.target.value,
                                })
                              }
                            >
                              <option className="text-muted">
                                ------ Select a country ------
                              </option>
                              <option value="Kenya">Kenya</option>
                              <option value="Burundi">Burundi</option>
                              <option value="Congo">Congo</option>
                              <option value="DRC">DRC</option>
                              <option value="Rwanda">Rwanda</option>
                              <option value="Tanzania">Tanzania</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                              Please select a country.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <Form.Group controlId="state">
                            <Form.Label>State</Form.Label>
                            <Form.Control
                              type="text"
                              required
                              value={formData.state}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  state: e.target.value,
                                })
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              State cannot be empty.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <Form.Group controlId="city">
                            <Form.Label>Town / City</Form.Label>
                            <Form.Control
                              type="text"
                              required
                              value={formData.city}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  city: e.target.value,
                                })
                              }
                            />
                          </Form.Group>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <Form.Group controlId="address">
                            <Form.Label>Street Address</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="House number and street name"
                              required
                              value={formData.address}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  address: e.target.value,
                                })
                              }
                            />
                          </Form.Group>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <Form.Group controlId="zip_code">
                            <Form.Label>Postcode / ZIP</Form.Label>
                            <Form.Control
                              type="text"
                              required
                              value={formData.zip_code}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  zip_code: e.target.value,
                                })
                              }
                            />
                          </Form.Group>
                        </div>
                      </div>

                      {/* <div className="additional-info-wrap">
                        <h4>Additional information</h4>
                        <div className="additional-info">
                          <Form.Group controlId="orderNotes">
                            <Form.Label>Order notes</Form.Label>
                            <Form.Control
                              as="textarea"
                              placeholder="Notes about your order, e.g. special notes for delivery."
                              value={formData.orderNotes}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  orderNotes: e.target.value,
                                })
                              }
                            />
                          </Form.Group>
                        </div>
                      </div> */}

                      <div className="place-order mt-25">
                        <Button
                          type="submit"
                          variant="outline-primary"
                          className="w-100"
                          style={{ fontWeight: "bold" }}
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                arai-hidden="true"
                              />
                              {"  "}
                              Processing...
                            </>
                          ) : (
                            "Proceed to payment"
                          )}
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="your-order-area">
                    <h3>Your order</h3>
                    <div className="your-order-wrap gray-bg-4">
                      <div className="your-order-product-info">
                        <div className="your-order-top">
                          <ul>
                            <li>Product</li>
                            <li>Total</li>
                          </ul>
                        </div>
                        <div className="your-order-middle">
                          <ul>
                            {cartItems.map((cartItem, key) => {
                              return (
                                <li key={key}>
                                  <span className="order-middle-left">
                                    {cartItem.name} X {cartItem.quantity}
                                  </span>{" "}
                                  <span className="order-price">
                                    {cartItem.line_total}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart to checkout <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
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

Checkout.propTypes = {
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData,
  };
};

export default connect(mapStateToProps)(Checkout);
