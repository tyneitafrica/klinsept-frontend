import React, { Fragment } from "react";
import { useParams, useLocation } from "react-router-dom";
import LayoutOne from "../layouts/LayoutOne";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Breadcrumb from "../wrappers/breadcrumb/Breadcrumb";

export default function Search() {
  const { searchParams } = useParams();
  const { pathname } = useLocation();
  return (
    <Fragment>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Search results for {searchParams}
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="blog-area pt-100 pb-100 blog-no-sidebar">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="mr-20"></div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
}
