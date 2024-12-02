import PropTypes from "prop-types";
import React from "react";
import blogFeaturedData from "../../data/blog-featured/blog-featured-two.json";
import SectionTitle from "../../components/SectionTitle";
import { Link } from "react-router-dom";

const BlogFeaturedFour = () => {
  return (
    <div className={`blog-area pt-95 pb-55`}>
      <div className="container">
        <SectionTitle
          titleText="Latest News"
          subtitleText="Stay updated with the most recent developments and insights."
          positionClass="text-center"
          spaceClass="mb-55"
          borderClass="no-border"
        />
        <div className="row g-4">
          {blogFeaturedData.map((singlePost) => {
            return (
              <div key={singlePost.id} className="col-lg-4 col-sm-6">
                <div className="blog-wrap mb-30 scroll-zoom">
                  <div className="blog-img">
                    {/* <Link to={process.env.PUBLIC_URL + singlePost.url}> */}
                      <img
                        src={process.env.PUBLIC_URL + singlePost.image}
                        alt="Cleaning"
                      />
                    {/* </Link> */}
                    <div className="blog-category-names">
                      {singlePost.category.map((singleCategory, key) => {
                        return (
                          <span className="purple" key={key}>
                            {singleCategory}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <div className="blog-content-wrap">
                    <div className="blog-content text-center">
                      <h3>
                        <Link>
                          {singlePost.title}
                        </Link>
                      </h3>
                      <span>
                        By{" "}
                        <Link
                          // to={process.env.PUBLIC_URL + singlePost.authorUrl}
                        >
                          {singlePost.author}
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

BlogFeaturedFour.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default BlogFeaturedFour;
