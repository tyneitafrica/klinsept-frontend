import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
// import "./BlogPost.css"; // We'll create this CSS file

const BlogPost = () => {
  const location = useLocation();
  const [post, setPost] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    const postData = location.state?.post;
    const allBlogs = location.state?.relatedBlogs || [];

    if (postData) {
      setPost(postData);
      // Randomly select up to 3 related blogs
      const shuffled = allBlogs.sort(() => 0.5 - Math.random());
      setRelatedBlogs(shuffled.slice(0, 3));
    }
  }, [location.state]);

  if (!post) {
    return (
      <div className="blog-post-not-found">
        <h2>Post Not Found</h2>
        <Link to="/blog" className="back-to-blog">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="blog-inner-page">
      {/* Hero Section */}
      <div className="blog-hero">
        <div className="blog-header">
          <h1>{post.title}</h1>
          <div className="blog-meta">
            <span className="blog-date">
              {new Date(post.created_at).toLocaleString()}
            </span>
          </div>
        </div>
        <img
          src={
            post.images?.find((img) => img.section === "BANNER")?.image ||
            "/assets/img/blog/blog-details.jpg"
          }
          alt={post.title}
          className="blog-hero-image"
        />
      </div>

      {/* Main Content */}
      <div className="blog-content-wrapper">
        <div className="blog-main-content">
          <div className="blog-text-section">
            <h2>{post.heading}</h2>
            <p>{post.content}</p>
          </div>

          {/* Content Image */}
          <div className="blog-content-image">
            <img
              src={
                post.images?.find((img) => img.section === "CONTENT")?.image ||
                "/assets/img/blog/blog-details.jpg"
              }
              alt={`${post.title} - Content Image`}
            />
          </div>
        </div>

        {/* Related Blogs Section */}
        <div className="related-blogs-section">
          <h3>Other Related Blogs</h3>
          <div className="related-blogs-grid">
            {relatedBlogs.map((relatedPost) => (
              <div key={relatedPost.id} className="related-blog-card">
                <img
                  src={
                    relatedPost.images?.find((img) => img.section === "BANNER")
                      ?.image || "/assets/img/blog/default-blog.jpg"
                  }
                  alt={relatedPost.title}
                />
                <div className="related-blog-content">
                  <h4>{relatedPost.title}</h4>
                  <Link
                    to={`/blog/${relatedPost.slug}`}
                    state={{
                      post: relatedPost,
                      relatedBlogs: relatedBlogs.filter(
                        (b) => b.id !== relatedPost.id
                      ),
                    }}
                    className="read-more-btn"
                  >
                    <i className="fa fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
