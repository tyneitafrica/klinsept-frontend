import PropTypes from "prop-types";
import React, { } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../components/LayoutOne";
import Breadcrumb from "../wrappers/breadcrumb/Breadcrumb";
import BlogPostsNoSidebar from "../wrappers/blog/BlogPostsNoSidebar";
import { useLocation } from "react-router-dom";

const BlogNoSidebar = () => {
  const pathname = useLocation();

  return (
    <div className="mt-90">
      <MetaTags>
        <title> | Blog</title>
        <meta
          name="description"
          content="Blog of  react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Blog
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="blog -area pt-5 pb-10 blog-no-si debar">

          {/* blog posts */}
          <BlogPostsNoSidebar />


          {/* blog pagination */}
          {/* <BlogPagination /> */}

        </div>
      </LayoutOne>
    </div>
  );
};

BlogNoSidebar.propTypes = {
  location: PropTypes.object
};

export default BlogNoSidebar;
