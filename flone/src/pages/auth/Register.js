import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useLocation } from "react-router-dom";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";

const Register = () => {
  const { pathname } = useLocation();
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else if (registerData.password !== registerData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    } else {
      setError("");
      console.log("Register submitted with:", registerData);
      // Add more registration submission logic here
    }

    setValidated(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

  return (
    <Fragment>
      <MetaTags>
        <title> | Register</title>
        <meta
          name="description"
          content="Register page of  eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Register
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        <Breadcrumb />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="register">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Register</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <Form
                              noValidate
                              validated={validated}
                              onSubmit={handleRegisterSubmit}
                            >

                              <Row>
                                <Col md={6}>
                                  <Form.Group controlId="formFirstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                      required
                                      type="text"
                                      placeholder="First name"
                                      name="firstName"
                                      value={registerData.firstName}
                                      onChange={handleInputChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                      Please enter your first name.
                                    </Form.Control.Feedback>
                                  </Form.Group>
                                </Col>
                                <Col md={6}>
                                  <Form.Group controlId="formLastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                      required
                                      type="text"
                                      placeholder="Last name"
                                      name="lastName"
                                      value={registerData.lastName}
                                      onChange={handleInputChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                      Please enter your last name.
                                    </Form.Control.Feedback>
                                  </Form.Group>
                                </Col>
                              </Row>

                              <Form.Group controlId="formEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                  required
                                  type="email"
                                  placeholder="Enter email"
                                  name="email"
                                  value={registerData.email}
                                  onChange={handleInputChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                  Please provide a valid email.
                                </Form.Control.Feedback>
                              </Form.Group>

                              <Form.Group controlId="formPhone">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                  required
                                  type="text"
                                  placeholder="+<country_code> <number>"
                                  name="phone"
                                  pattern="^\+\d{1,3}\d{10}$"
                                  value={registerData.phone}
                                  onChange={handleInputChange}
                                  maxLength={12}
                                />
                                <Form.Control.Feedback type="invalid">
                                  Please provide a valid phone number with
                                  country code, e.g., +254 712345678.
                                </Form.Control.Feedback>
                              </Form.Group>

                              <Form.Group controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                  required
                                  type="password"
                                  placeholder="Password"
                                  name="password"
                                  value={registerData.password}
                                  onChange={handleInputChange}
                                  minLength="6"
                                  maxLength="12"
                                />
                                <Form.Control.Feedback type="invalid">
                                  Please provide a password between 6 and 12
                                  characters.
                                </Form.Control.Feedback>
                              </Form.Group>

                              <Form.Group controlId="formConfirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                  required
                                  type="password"
                                  placeholder="Confirm Password"
                                  name="confirmPassword"
                                  value={registerData.confirmPassword}
                                  onChange={handleInputChange}
                                  minLength="6"
                                  maxLength="12"
                                />
                                <Form.Control.Feedback type="invalid">
                                  Please confirm your password.
                                </Form.Control.Feedback>
                              </Form.Group>
                              {error && <Alert variant="danger">{error}</Alert>}

                              <div className="button-box text-center mt-4">
                                <div className="mb-3">
                                  <p className="mb-0">
                                    Already have an account?{" "}
                                    <Link
                                      to={process.env.PUBLIC_URL + "/login"}
                                      className="text-primary"
                                      style={{ textDecoration: "underline" }}
                                    >
                                      Login here.
                                    </Link>
                                  </p>
                                </div>
                                <Button
                                  type="submit"
                                  variant="primary"
                                  className="w-100"
                                  style={{ fontWeight: "bold" }}
                                >
                                  Register
                                </Button>
                              </div>
                            </Form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

Register.propTypes = {
  location: PropTypes.object,
};

export default Register;
