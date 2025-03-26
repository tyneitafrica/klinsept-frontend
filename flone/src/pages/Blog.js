import PropTypes from "prop-types";
import React, {  } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../components/LayoutOne";
import Breadcrumb from "../wrappers/breadcrumb/Breadcrumb";
// import BlogPostsNoSidebar from "../wrappers/blog/BlogPostsNoSidebar";
import { useLocation } from "react-router-dom";
import BlogPost from "../wrappers/blog/BlogPost";
import { useTranslation } from "react-i18next";
const Blog = () => {
  const pathname = useLocation();
  const { t } = useTranslation();

  return (
    <div className="mt-90">
      <MetaTags>
        <title> | Blog</title>
        <meta
          name="description"
          content="Blog of  react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>{t("Home")}</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Blog
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="blog-area pt-100 pb-100 blog-no-sidebar">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="row mr-20">
                    {/* blog posts */}
                    <BlogPost />
                 

                  {/* blog pagination */}
                  {/* <BlogPagination /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </div>
  );
};

Blog.propTypes = {
  location: PropTypes.object,
};

export default Blog;
