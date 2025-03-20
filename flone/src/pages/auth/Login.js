import PropTypes from "prop-types";
import React, { useState } from "react";
import MetaTags from "react-meta-tags";
import { Link, useNavigate } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../components/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useLocation } from "react-router-dom";
import {
  Spinner,
  Nav,
  Form,
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { LoginFetch } from "../../helpers/backendFectch";
import { useDispatch } from "react-redux";

import klinseptLogo from "../../assets/images/klinsept-logo.png";
import shoppingCartImage from "../../assets/images/shopping-cart.png";

const Login = ({ authData }) => {
  const { pathname } = useLocation();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      setLoading(true);
      try {
        await LoginFetch(loginData, setLoading, navigate);
      } finally {
        setLoading(false);
      }
    }

    setValidated(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  return (
    <div className="mt-90 ">
      <MetaTags>
        <title>Klinsept | Login</title>
        <meta
          name="description"
          content="Login page of Klinsept eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Login
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        <Breadcrumb />
        <div
          className="login-register-area pt-100 pb-100"
          style={{ backgroundColor: "#f8f9fa" }}
        >
          <Container>
            <Row
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }}
              className="">
              {/* Login Form Column */}
              <Col
                lg={6}
                md={12}
                className="mx-auto login-register-wrapper"
              >
                <div className="">
                  <div className="text-center mb-4">
                    <img
                      src={klinseptLogo}
                      alt="Klinsept Logo"
                      style={{ maxHeight: "60px", marginBottom: "15px" }}
                    />
                    <h3
                      className="login-register-tab-list"
                      style={{ fontWeight: "600" }}
                    >
                      Welcome Back
                      <span role="img" aria-label="waving hand">
                        👋
                      </span>
                    </h3>
                  </div>

                  <div className="login-form-container">
                    <div className="login-register-form">
                      <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleLoginSubmit}
                      >
                        <Form.Group controlId="formEmail" className="mb-3">
                          <Form.Label>Email Address</Form.Label>
                          <Form.Control
                            required
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            value={loginData.email}
                            onChange={handleInputChange}
                            style={{ padding: "10px", borderColor: "#dee2e6" }}
                          />
                          <Form.Control.Feedback type="invalid">
                            Please provide a valid email.
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formPassword" className="mb-4">
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            required
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={loginData.password}
                            onChange={handleInputChange}
                            minLength="6"
                            style={{ padding: "10px", borderColor: "#dee2e6" }}
                          />
                          <Form.Control.Feedback type="invalid">
                            Please provide a password with at least 6
                            characters.
                          </Form.Control.Feedback>
                        </Form.Group>

                        <div className="button-box">
                          <div className="login-toggle-btn d-flex align-items-center justify-content-between mb-3">
                            <Form.Check
                              type="checkbox"
                              label="Remember me"
                              className="mb-0"
                            />
                            <Link
                              to={process.env.PUBLIC_URL + "/forgot"}
                              className="text-primary"
                              style={{
                                textDecoration: "underline",
                                fontSize: "0.9rem",
                              }}
                            >
                              Forgot Password?
                            </Link>
                          </div>

                          <Button
                            type="submit"
                            variant="primary"
                            className="w-100 py-2"
                            style={{
                              fontWeight: "600",
                              backgroundColor: "#0047AB",
                              borderColor: "#0047AB",
                            }}
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
                                Logging in...
                              </>
                            ) : (
                              "Login"
                            )}
                          </Button>

                          <div className="text-center mt-3">
                            <p className="mb-0" style={{ fontSize: "0.9rem" }}>
                              Don't have an account?{" "}
                              <Link
                                to={process.env.PUBLIC_URL + "/register"}
                                className="text-primary"
                                style={{ fontWeight: "600" }}
                              >
                                Sign up
                              </Link>
                            </p>
                          </div>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </Col>

              {/* Cart Image Column - Hidden on small screens */}
              <Col lg={6} className="d-none d-lg-block text-center">
                <div className="login-image-container">
                  <img
                    src={shoppingCartImage}
                    alt="Shopping Cart"
                    className="img-fluid"
                    style={{ maxHeight: "700px" }}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </LayoutOne>
    </div>
  );
};

Login.propTypes = {
  location: PropTypes.object,
};

export default Login;
