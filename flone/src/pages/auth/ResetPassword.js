import PropTypes from "prop-types";
import React, {useState } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useLocation, useParams } from "react-router-dom";
import { Form, Button, Alert, Nav, Tab } from "react-bootstrap";

const ResetPassword = () => {
  const { otp } = useParams();
  const { pathname } = useLocation();
  const [resetData, setResetData] = useState({
    otp: otp,
    password: "",
    confirmPassword: "",
  });
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");

  const handleResetPasswordSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else if (resetData.password !== resetData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    } else {
      setError("");
      console.log("Password reset with:", resetData);
      // Implement reset password logic here
    }
    setValidated(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResetData({
      ...resetData,
      [name]: value,
    });
  };

  return (
    <div className="mt-100">
      <MetaTags>
        <title> | Reset Password</title>
        <meta
          name="description"
          content="Reset password page of  eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={"/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={pathname}>
        Reset Password
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        <Breadcrumb />
        <div className="reset-password-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="register">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Reset Password</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Tab.Container>
                  <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleResetPasswordSubmit}
                  >
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form.Group controlId="formPassword">
                      <Form.Label>New Password</Form.Label>
                      <Form.Control
                        required
                        type="password"
                        placeholder="New password"
                        name="password"
                        value={resetData.password}
                        onChange={handleInputChange}
                        minLength="6"
                        maxLength="12"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a password between 6 and 12 characters.
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formConfirmPassword">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        required
                        type="password"
                        placeholder="Confirm new password"
                        name="confirmPassword"
                        value={resetData.confirmPassword}
                        onChange={handleInputChange}
                        minLength="6"
                        maxLength="12"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please confirm your password.
                      </Form.Control.Feedback>
                    </Form.Group>

                    <div className="button-box mt-4 text-center">
                      <Button
                        type="submit"
                        variant="primary"
                        className="w-100"
                        style={{ fontWeight: "bold" }}
                      >
                        Reset Password
                      </Button>
                      <div className="mt-3">
                        <Link
                          to={"/login"}
                          className="text-primary"
                          style={{ textDecoration: "underline" }}
                        >
                          Back to Login
                        </Link>
                      </div>
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

ResetPassword.propTypes = {
  location: PropTypes.object,
};

export default ResetPassword;
