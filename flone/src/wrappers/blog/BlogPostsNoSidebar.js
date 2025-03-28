import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBlogs } from "../../helpers/backendFectch";
import { useTranslation } from "react-i18next";
import { useDispatch,useSelector } from "react-redux";

export default function BlogPostsNoSidebar () {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // New error state
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.productData.blogs);
  // console.log(blogs);
  const [sortCategory, setSortCategory] = useState("All");
  const [activeView, setActiveView] = useState("Grid");

  const categories = ["All", "Technology", "Lifestyle", "Travel", "Business"];
  const viewOptions = ["Grid", "List", "Compact"];

  const handleCategorySort = (e) => {
    setSortCategory(e.target.value);
  };

  const handleViewChange = (view) => {
    setActiveView(view);
  };

  // const filteredBlogs =
  //   sortCategory === "All"
  //     ? blogs
  //     : blogs.filter((blog) => blog.category === sortCategory);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    setError(null); // Reset error state before fetching

    try {
      await dispatch(getBlogs());

    } catch (err) {
      setError(t("Failed to fetch blogs. Please try again."));
    } finally {
      setLoading(false);
    }
  }, [dispatch,t]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // if loading 
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">loading.....</div>
      </div>
    );
  }

  return (
    <>
      {error ? (
        <div className="error-container">
          <img
            src="https://cdn-icons-png.flaticon.com/512/463/463612.png"
            alt="Error"
            className="error-image"
          />
          <h4 className="error-title">{t("Oops!")}</h4>
          <p className="error-text">{error}</p>
          <button className="retry-button" onClick={fetchBlogs}>
            {t("Retry")}
          </button>
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
        <>
          <div className=" container-fluid px-4 py-5">
            <div className=" row mb-4 align-items-center">
              <div className="col-md-6 d-flex align-items-center">
                <select
                  className="form-select me-3"
                  value={sortCategory}
                  onChange={handleCategorySort}
                  style={{ maxWidth: "200px" }}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      Sort by: {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6 text-end">
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Blog view options"
                >
                  {viewOptions.map((view) => (
                    <button
                      key={view}
                      type="button"
                      className={`btn btn-outline-dark ${
                        activeView === view ? "active" : ""
                      }`}
                      onClick={() => handleViewChange(view)}
                    >
                      {view} View
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="blog-list g-4">
              {blogs.map((post) => (
                <Card key={post.id} post={post} blogs={blogs} />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};



export const Card = ({ post, blogs }) => {
  return (
    <div key={post.id} className="blog-card">
      {/* Image Section */}

      <div className="blog-card-image">
        <img
          src={
            post.images?.find((img) => img.section === "BANNER")?.image ||
            post.image ||
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
          {post.heading?.length > 100
            ? `${post.heading?.substring(0, 100)}...`
            : post.heading}
        </p>

        {/* Read More Button */}
        <Link
          to={`/blog/${post.slug}`}
          state={{
            post: post,
            blogs: blogs,
            relatedBlogs: blogs
              .filter((blog) => blog.id !== post.id)
              .slice(0, 3),
          }}
          className="read-more-btn"
        >
          <i className="fa fa-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
};



