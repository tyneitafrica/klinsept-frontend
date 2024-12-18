import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../components/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { Form, Spinner, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Payment = ({ currency }) => {
  const { orderId } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [orderItems, setOrderItems] = useState(null);

  useEffect(() => {
    const confirmOrder = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}user/order/`,
          {
            params: { order_id: orderId },
            headers: {
              "Content-Type": "application/json",
              "x-api-key": process.env.REACT_APP_API_KEY,
            },
          }
        );

        if (response.status === 200) {
          setOrderItems(response.data);
        } else {
          console.error(
            "Failed to fetch order details:",
            response.data.message
          );
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    confirmOrder();
  }, [orderId]);

  const [paymentMethod, setPaymentMethod] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}send/email/`,
        { order_id: orderId },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.REACT_APP_API_KEY,
          },
        }
      );

      if (response.status === 200) {
        toast.success(
          response?.data.message ||
            "Email sent successfully!,Please check your Email for confirmation"
        );
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        // console.error("Failed to send email:", response.data.message);
        toast.error(`Failed to send email: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error(
        "An error occurred while sending the email. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="mt-90">
      <MetaTags>
        <title>Klinsept | Payment</title>
        <meta
          name="description"
          content="Checkout page of react minimalist eCommerce template."
        />
      </MetaTags>

      <BreadcrumbsItem to="/">Home</BreadcrumbsItem>
      <BreadcrumbsItem to="/checkout">Checkout</BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        <Breadcrumb />
        <div className="checkout-area pt-50 p mb-50">
          <div className="container">
            {orderItems && orderItems.items.length > 0 ? (
              <div className="row">
                {/* Order Details */}
                <div className="col-12 col-lg-7">
                  <div className="your-order-area">
                    <h3>Your Order</h3>
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
                            {orderItems.items.map((item, key) => {
                              const lineTotal = (
                                currency.rates *
                                (item.line_total * item.quantity)
                              ).toFixed(2);
                              return (
                                <li key={key}>
                                  <span className="order-middle-left">
                                    {item.product_name} X {item.quantity}
                                  </span>
                                  <span className="order-price">
                                    {currency.symbol} {lineTotal}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <div className="your-order-bottom total">
                          <ul>
                            <li>
                              <strong>Total</strong>
                            </li>
                            <li>
                              {currency.symbol}{" "}
                              {(
                                currency.rates * orderItems.total_price
                              ).toFixed(2)}
                            </li>
                          </ul>
                        </div>
                        <div className=" just your-order-bottom total">
                          <ul className=" your-order-middle">
                            <li className="mb-3 list-unstyled">
                              <strong>Country</strong>
                              <div className="ms-2">
                                {orderItems.shipping_address.country}
                              </div>
                            </li>
                            <li className="mb-3">
                              <strong>City</strong>
                              <div className="ms-2">
                                {orderItems.shipping_address.city}
                              </div>
                            </li>
                            <li className="mb-3">
                              <strong>Zip Code</strong>
                              <div className="ms-2">
                                {orderItems.shipping_address.zip_code}
                              </div>
                            </li>
                            <li className="mb-3">
                              <strong>State</strong>
                              <div className="ms-2">
                                {orderItems.shipping_address.state}
                              </div>
                            </li>
                            <li className="mb-3">
                              <strong>Street Address</strong>
                              <div className="ms-2">
                                {orderItems.shipping_address.street_address}
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Details */}
                <div className="col-12 col-lg-5">
                  <div className="billing-info-wrap">
                    <h3>Payment Details</h3>
                    <Form onSubmit={handleSubmit}>
                      <Form.Group controlId="paymentMethod">
                        <Form.Label>Payment Method</Form.Label>
                        <Form.Control
                          as="select"
                          required
                          value={paymentMethod}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                          <option value="">Select a Payment method</option>
                          <option className="text-grey-900" value="PoD">
                            Pay on Delivery
                          </option>
                          <option disabled value="MobileMoney">
                            Mobile Money
                          </option>
                          <option disabled value="Card">
                            Card
                          </option>
                        </Form.Control>
                      </Form.Group>
                      <div className="place-order mt-25">
                        <Button
                          type="submit"
                          variant="btn btn-outline-primary"
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
                                aria-hidden="true"
                              />
                              {"  "}
                              submitting order...
                            </>
                          ) : (
                            "Submit Order"
                          )}
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            ) : (
              <p>Loading order details...</p>
            )}
          </div>
        </div>
      </LayoutOne>
    </div>
  );
};

export default Payment;
