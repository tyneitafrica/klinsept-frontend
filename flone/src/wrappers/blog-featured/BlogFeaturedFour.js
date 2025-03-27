import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import { useTranslation } from "react-i18next";
import { Card } from "../blog/BlogPostsNoSidebar";
import { useSelector, useDispatch } from "react-redux";
import { getBlogs } from "../../helpers/backendFectch";

const BlogFeaturedFour = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.productData.blogs);
  const [randomBlogs, setRandomBlogs] = useState([]);

  // Function to shuffle and pick random 3-4 unique blogs
  const getRandomBlogs = (arr) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random()); // Shuffle array
    const randomCount = Math.floor(Math.random() * 2) + 3; // Random 3 or 4
    return shuffled.slice(0, randomCount);
  };

  useEffect(() => {
    if (blogs?.length <= 0) {
      getBlogs(dispatch);
    } else {
      // Set random blogs whenever blogs are fetched
      setRandomBlogs(getRandomBlogs(blogs));
    }
  }, [blogs, dispatch]);

  return (
    <div className={`blog-area pt-95 pb-55`}>
      <div className="contai ner">
        <SectionTitle
          titleText={t("Latest News")}
          subtitleText={t(
            "Stay updated with the most recent developments and insights."
          )}
          positionClass="text-center"
          spaceClass="mb-55"
          borderClass="no-border"
        />
        <div className="ro w blog-list g-4">
          {randomBlogs?.map((singlePost) => {
            return <Card key={singlePost.id} post={singlePost} blogs={blogs} />;
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
