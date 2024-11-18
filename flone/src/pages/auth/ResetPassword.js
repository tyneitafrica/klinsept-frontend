import PropTypes from "prop-types";
import React, {useState } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../components/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useLocation, useParams } from "react-router-dom";
import { Form, Button, Alert, Nav, Tab } from "react-bootstrap";
import { resetPassword } from "../../helpers/backendFectch";

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
  const [message, setMessage] = useState("");

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
  
    // Validate form
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }
  
    // Validate matching passwords
    if (resetData.password !== resetData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    // Prepare the data object for API
    const requestData = {
      otp: resetData.otp, // Ensure this is from the input field
      new_password: resetData.password, // User's new password
      email: 'stevekid705@gmail.com'
    };
  
    try {
      setError(""); // Clear any previous errors
      console.log("Sending data for password reset:", requestData);
  
      const response = await resetPassword(requestData); // API call
      console.log("Password reset successful:", response);
  
      // Optional: Add success handling
      setMessage("Password reset successfully! You can now log in.");
    } catch (error) {
      // Set error message from the API response
      setError(error.message || "Failed to reset password.");
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
    <div className="mt-90">
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
                    {message && <Alert variant="success">{message}</Alert>}

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
