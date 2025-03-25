import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBlogs } from "../../helpers/backendFectch";
import { useTranslation } from "react-i18next";

const BlogPostsNoSidebar = () => {
  const [blogs, setBlogs] = useState([]);
  const { t } = useTranslation();

const fetchBlogs = useCallback(() => {
  getBlogs(setBlogs);
}, []);

useEffect(() => {
  fetchBlogs();
}, [fetchBlogs]);


  return (
    <>
      {blogs.length === 0 ? (
        <div className="no-blogs-container">
          <img
            src="https://logosear.ch/favicon.svg"
            alt="No Blogs Found"
            className="no-blogs-image"
          />
          <h4 className="no-blogs-title">{t("No Blogs Available")}</h4>
          <p className="no-blogs-text">
            {t("Stay tuned! New blogs will be added soon.")}
          </p>
          <button className="no-blogs-btn">{t("Write a Blog")}</button>
        </div>
      ) : (
        <div className="blog-list">
          {blogs.map((post) => (
            <div key={post.id} className="blog-card">
              {/* Image Section */}
              <div className="blog-card-image">
                <img
                  src={
                    post.images?.find((img) => img.section === "BANNER")
                      ?.image || "/default-image.jpg"
                  }
                  alt={post.title}
                />
                {/* Favorite Icon */}
                <button className="favorite-btn">
                  <i className="fa fa-heart-o"></i>
                </button>
              </div>

              {/* Content Section */}
              <div className="blog-card-content">
                <h4 className="blog-title">{post.title}</h4>
                <p className="blog-description">
                  {post.content.length > 100
                    ? `${post.content.substring(0, 100)}...`
                    : post.content}
                </p>

                {/* Read More Button */}
                <Link to={`/blog/${post.slug}`} className="read-more-btn">
                  <i className="fa fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default BlogPostsNoSidebar;
