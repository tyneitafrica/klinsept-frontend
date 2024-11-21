import PropTypes from "prop-types";
import React, { useState } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../components/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useLocation } from "react-router-dom";
import { Form, Button, Alert, Nav, Tab, Spinner } from "react-bootstrap";
import { forgotPassword } from "../../helpers/backendFectch";
const ForgotPassword = () => {
  const { pathname } = useLocation();
  const [email, setEmail] = useState("");
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      setError("");
      setValidated(true);
      setLoading(true);

      try {
        await forgotPassword(email);
        setLoading(false);
        setMessage(
          "OTP request successful. Check your email for further instructions."
        );
      } catch (error) {
        // Display error message to the user
        setLoading(false);
        const errorMessage =
          error.message || "Failed to request OTP. Please try again.";
        setError(errorMessage);
      }
    }
  };

  return (
    <div className="mt-90">
      <MetaTags>
        <title>Klinsept | Forgot </title>
        <meta
          name="description"
          content="Login page of Klinsept eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Forgot
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        <Breadcrumb />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 col-md-8">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="register">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Forgot</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Tab.Container>
                  <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleForgotPasswordSubmit}
                  >
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}

                    <Form.Group controlId="formEmail">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        required
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid email.
                      </Form.Control.Feedback>
                    </Form.Group>

                    <div className="button-box text-center mt-4">
                      <Button
                        type="submit"
                        variant="primary"
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
                            requesting...
                          </>
                        ) : (
                          "Submit"
                        )}
                      </Button>
                      {!loading&& 
                      <div className="mt-3">
                        <Link
                          to={process.env.PUBLIC_URL + "/login"}
                          className="text-primary"
                          style={{ textDecoration: "underline" }}
                        >
                          Back to Login
                        </Link>
                      </div>
                      }
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </div>
  );
};

ForgotPassword.propTypes = {
  location: PropTypes.object,
};

export default ForgotPassword;
