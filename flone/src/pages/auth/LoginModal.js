// import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
// import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import { LoginFetch } from "../../helpers/backendFectch";
import React, { useState } from "react";



function LoginModal({ show, setShow }) {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleClose = () => setShow(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    setLoading(true);

    // Call LoginFetch, which handles the toast notifications internally
    LoginFetch(loginData)
      .then(() => {
        setShow(false); // Close the modal on successful login
      })
      .catch((error) => {
        // Optionally, you can log the error if you want to perform any additional actions
        console.error(error);
      })
      .finally(() => {
        setLoading(false); // Ensure loading state is cleared
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>You must be logged in to place an order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleLoginSubmit}>
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

          <Form.Group controlId="formPassword" className="mt-3">
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
              Please provide a password with at least 6 characters.
            </Form.Control.Feedback>
          </Form.Group>

          <div className="text-center mb-3">
            <Link
              to={process.env.PUBLIC_URL + "/register"}
              className="text-muted"
              style={{ fontSize: "0.9rem" }}
            >
              Not registered?{" "}
              <span className="text-primary">Sign up here.</span>
            </Link>
          </div>

          <div className="mt-4 d-flex justify-content-center">
            {!loading && (
              <Button variant="danger" onClick={handleClose} className="mr-2">
                Close
              </Button>
            )}
            <Button
              type="submit"
              variant="primary"
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
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;
