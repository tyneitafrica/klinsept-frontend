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
import { Form, Button, Alert } from "react-bootstrap";

const Login = () => {
  const { pathname } = useLocation();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      setError("");
      console.log("Login submitted with:", loginData);
      // Add more login submission logic here
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
    <Fragment>
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
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>Login</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <Form
                              noValidate
                              validated={validated}
                              onSubmit={handleLoginSubmit}
                            >
                              {error && <Alert variant="danger">{error}</Alert>}

                              <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                  required
                                  type="email"
                                  placeholder="Enter email"
                                  name="email"
                                  value={loginData.email}
                                  onChange={handleInputChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                  Please provide a valid email.
                                </Form.Control.Feedback>
                              </Form.Group>

                              <Form.Group controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                  required
                                  type="password"
                                  placeholder="Password"
                                  name="password"
                                  value={loginData.password}
                                  onChange={handleInputChange}
                                  minLength="6"
                                />
                                <Form.Control.Feedback type="invalid">
                                  Please provide a password with at least 6
                                  characters.
                                </Form.Control.Feedback>
                              </Form.Group>

                              <div className="button-box mt-4">
                                <div className="login-toggle-btn d-flex align-items-center justify-content-between mb-3">
                                  <Form.Check
                                    type="checkbox"
                                    label="Remember me"
                                    className="mb-0"
                                  />
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/forgot"
                                    }
                                    className="text-primary"
                                    style={{ textDecoration: "underline" }}
                                  >
                                    Forgot Password?
                                  </Link>
                                </div>

                                <div className="text-center mb-3">
                                  <Link
                                    to={process.env.PUBLIC_URL + "/register"}
                                    className="text-muted"
                                    style={{ fontSize: "0.9rem" }}
                                  >
                                    Not registered?{" "}
                                    <span className="text-primary">
                                      Sign up here.
                                    </span>
                                  </Link>
                                </div>

                                <Button
                                  type="submit"
                                  variant="primary"
                                  className="w-100"
                                  style={{ fontWeight: "bold" }}
                                >
                                  Login
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

Login.propTypes = {
  location: PropTypes.object,
};

export default Login;
