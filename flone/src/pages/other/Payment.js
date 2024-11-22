import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../components/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Payment = ({ cartItems, currency }) => {
  const { orderId } = useParams(); // Access the dynamic orderId

  const [orderItems, setOrderItems] = useState(null); // State for order items

  useEffect(() => {
    const confirmOrder = async () => {
      try {
        const response = await axios.get("https://klinsept-backend.onrender.com/api/v1.0/user/order/", {
          params: { order_id: orderId },
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "f6c52669-b6a9-4901-8558-5bc72b7e983a",
          },
        });
  
        if (response.status === 200) {
          // console.log("Order details:", response.data);
          setOrderItems(response.data); // Store order items in state
          // console.log(orderItems)
        } else {
          console.error("Failed to fetch order details:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };
  
    confirmOrder(); // Call the function
  }, [orderId]); // Ensure it runs only when orderId changes
  

  const [paymentMethod, setPaymentMethod] = useState("")


  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
  
    try {
      const response = await axios.post(
        "https://klinsept-backend.onrender.com/api/v1.0/send/email/",
        { order_id: orderId }, // Pass the order ID in the request body
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "f6c52669-b6a9-4901-8558-5bc72b7e983a",
          },
        }
      );
  
      if (response.status === 200) {
        console.log("Email sent successfully:", response.data);
        toast.success("Email sent successfully!,Please check your Email for confirmation"); // Optional user feedback
      } else {
        console.error("Failed to send email:", response.data.message);
        toast.error(`Failed to send email: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("An error occurred while sending the email. Please try again.");
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
                  <div className="col-lg-5">
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
                                const finalPrice = parseFloat(item.product.price); // Ensure price is a number
                                const lineTotal = finalPrice * item.quantity; // Calculate line total
                                return (
                                  <li key={key}>
                                    <span className="order-middle-left">
                                      {item.product.name} X {item.quantity}
                                    </span>
                                    <span className="order-price">
                                      {lineTotal.toFixed(2)}
                                    </span>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                          <div className="your-order-bottom total">
                            <ul>
                              <li className="order-total">Total</li>
                              <li>
                                {parseFloat(orderItems.total_price).toFixed(2)}
                              </li>
                            </ul>
                          </div>
{/* Shipping Details */}
                          <div className="your-order-bottom total">
                            <ul className="your-order-middle">
                              <li>
                                <strong>Country</strong> {orderItems.shipping_address.country}
                              </li>
                              <li>
                                <strong>City</strong> {orderItems.shipping_address.city}
                              </li>
                              <li>
                                <strong>Zip Code</strong> {orderItems.shipping_address.zip_code}
                              </li>
                              <li>
                                <strong>State</strong> {orderItems.shipping_address.state}
                              </li>
                              <li>
                                <strong>Street Address</strong> {orderItems.shipping_address.street_address}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p>Loading order details...</p>
              )}


                 <div className="col-lg-7">
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
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </Form>
                  </div>
                </div>
              </div>
              <Toaster reverseOrder="false"
                position="top-right"/>
              </div>

      </LayoutOne>
      </div>
  );
 };

export default Payment;
