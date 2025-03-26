import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBlogs } from "../../helpers/backendFectch";
import { useTranslation } from "react-i18next";

const BlogPostsNoSidebar = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state
  const { t } = useTranslation();

  const fetchBlogs = useCallback(() => {
    setLoading(true); // Set loading to true before fetching
    getBlogs((data) => {
      setBlogs(data);
      setLoading(false); // Set loading to false after fetching
    });
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return (
    <>
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>{t("Loading blogs...")}</p>
        </div>
      ) : blogs.length === 0 ? (
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
        </div>
      ) : (
        <div className="blog-list">
          {blogs.map((post) => (
            <Card post={post} blogs={blogs} />
          ))}
        </div>
      )}
    </>
  );
};

export default BlogPostsNoSidebar;

export const Card = ({ post,blogs }) => {
  return (
    <div key={post.id} className="blog-card">
      {/* Image Section */}
      <div className="blog-card-image">
        <img
          src={
            post.images?.find((img) => img.section === "BANNER")?.image ||
            "/default-image.jpg"
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
        <Link
          to={`/blog/${post.slug}`}
          state={{
            post: post,
            blogs: blogs,
            relatedBlogs: blogs.filter((blog) => blog.id !== post.id),
          }}
          className="read-more-btn"
        >
          <i className="fa fa-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
};