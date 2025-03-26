import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
// import "./BlogPost.css"; // We'll create this CSS file

const BlogPost = () => {
  const location = useLocation();
  const [post, setPost] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const blogs = location.state?.blogs
  console.log(location.state?.relatedBlogs);
  
  useEffect(() => {
    const locationPost = location.state?.post;
    const locationBlogs = location.state?.relatedBlogs || [];

    if (locationPost) {
      setPost(locationPost);

      // If no related blogs were passed, you could fetch them here
      // For now, we'll use a random selection or a default logic
      if (locationBlogs.length < 3) { 

        const randomBlogs = locationBlogs
          .sort(() => 0.5 - Math.random()) // Randomly shuffle
          .slice(0, 3); // Take first 3
  
        setRelatedBlogs(randomBlogs);
      } else {
        setRelatedBlogs(locationBlogs);
      }
    }
  }, [location.state]);

  if (!post) {
    return (
      <div className="blog-post-error">
        <h2>Post Not Found</h2>
        <Link to="/blog" className="back-to-blog">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="blog-post-container">
      <div className="blog-post-header">
        <div className="blog-header-content">
          <h1>{post.title}</h1>
          <div className="blog-meta">
            <span className="blog-date">{post.created_at}</span>
          </div>
        </div>
      </div>

      <div className="blog-post-banner">
        <img
          src={
            post.images?.find((img) => img.section === "BANNER")?.image ||
            "/assets/img/blog/blog-details.jpg"
          }
          alt={post.title}
        />
      </div>

      <div className="blog-post-content">
        <div className="content-wrapper">
          <h2 className="content-title">{post.heading}</h2>
          <p className="content-text">{post.content}</p>

          {post.images?.find((img) => img.section === "CONTENT") && (
            <div className="content-image">
              <img
                src={
                  post.images.find((img) => img.section === "CONTENT")?.image
                }
                alt={`${post.title} - Content `}
              />
            </div>
          )}
        </div>
      </div>

      <div className="related-blogs">
        <h3>Other Related Blogs</h3>
        <div className="related-blogs-grid">
          {relatedBlogs.map((relatedBlog) => (
            <div key={relatedBlog.id} className="related-blog-item">
              <img
                src={
                  relatedBlog.images?.find((img) => img.section === "BANNER")
                    ?.image || "/assets/img/blog/default-blog.jpg"
                }
                alt={relatedBlog.title}
              />
              <div className="related-blog-content">
                <h4>{relatedBlog.title}</h4>
                <Link
                  to={`/blog/${relatedBlog.slug}`}
                  state={{
                    post: relatedBlog,
                    blogs: blogs,
                    relatedBlogs: blogs?.filter(
                      (b) => b.id !== relatedBlog.id
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
  );
};

export default BlogPost;
