import PropTypes from "prop-types";
import React, { Fragment, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";

const Authorized = ({ isAuthenticated }) => {
  const location = useLocation(); // Get the location object for the current route
  const { pathname } = location;
  const history = useHistory(); // History hook for redirecting users

  useEffect(() => {
    // Redirect to login page if user is not authenticated
    if (!isAuthenticated) {
      history.push("/login"); // Redirect to the login page
    }
  }, [isAuthenticated, history]);

  if (!isAuthenticated) {
    // You can return a loading spinner or placeholder if you want
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-90">
      <MetaTags>
        <title> Klinsept | Authorized</title>
        <meta
          name="description"
          content="Authorized page of react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>Authorized page</BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="authorized-area pt-40 pb-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-7 col-lg-8 text-center">
                <div className="authorized">
                  <h1>Welcome!</h1>
                  <h2>You are authorized to view this page.</h2>
                  <p>
                    You have successfully logged in and are authorized to access this content.
                  </p>
                  <Link to={process.env.PUBLIC_URL + "/"} className="authorized-btn">
                    Back to home page
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </div>
  );
};

Authorized.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.object
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated, // Assuming you're using Redux to manage authentication state
});

export default connect(mapStateToProps)(Authorized);
