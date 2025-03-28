import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import DOMPurify from "dompurify";

import { Card } from "./BlogPostsNoSidebar";


const BlogPost = () => {
  const location = useLocation();

  const blogs = useSelector((state) => state.productData.blogs);
  const { post, relatedBlogs } = location.state || {};
  // const post = location.state?.post;

  const formattedDate = new Date(post.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });



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
            <span className="blog-date">{formattedDate}</span>
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

          <div
            className="content-text"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.content),
            }}
          />

          {/* <div
            className="content-text"
            dangerouslySetInnerHTML={{ __html: post.content }}
          /> */}

          {/* <p className="content-text">{post.content}</p> */}
        </div>
      </div>

      <div className="related-blogs">
        <div className="d-flex justify-content-between align-items-center custom-flex">
          <h3>Related Blogs</h3>
          <div className="d-flex align-items-center gap-9">
            <Link to="/blogs" className="text-decoration-none mr-3">
              View All
            </Link>
            <Link to="/blogs" className="fa fa-arrow-right"></Link>
          </div>
        </div>

        <div className="blog-list">
          {relatedBlogs.map((relatedBlog) => (
            // console.log("relatedBlogs", relatedBlog.id)
            <Card post={relatedBlog} blogs={blogs} key={relatedBlog.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
