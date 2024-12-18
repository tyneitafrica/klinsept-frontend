import PropTypes from "prop-types";
import React from "react";
// import blogFeaturedData from "../../data/blog-featured/blog-featured-two.json";
import SectionTitle from "../../components/SectionTitle";
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";



const BlogFeaturedFour = () => {
  const { t } = useTranslation();
  const blogFeaturedData = [
    {
      id: 2,
      image: "/assets/img/blog/ecoa.jpeg",
      category: ["cleaning", "sustainability", "environment"],
      title:
        t("Eco-Friendly Cleaning Solutions: Sustainable Detergents for Your Home"),
      url: "/blog-details-standard",
      author: "Klinsolutions",
      authorUrl: "/about",
    },
    {
      id: 3,
      image: "/assets/img/blog/klin.kichen.png",
      category: ["cleaning", "household", "maintenance"],
      title:
        "How to Maintain a Clean and Hygienic Kitchen with the Right Products",
      url: "/blog-details-standard",
      author: "Klinsolutions",
      authorUrl: "/about",
    },
    {
      id: 1,
      image: "/assets/img/blog/hand-sanitize.jpeg",
      category: ["cleaning", "antiseptics", "health"],
      title: "The Importance of Hand Sanitizers in Preventing Germs",
      url: "/blog-details-standard",
      author: "Klinsolutions",
      authorUrl: "/about",
    },
    {
      id: 4,
      image: "/assets/img/blog/floor-cleaner.jpeg",
      category: ["cleaning", "detergents", "tips"],
      title: "How to Choose the Right Floor Cleaning Detergent",
      url: "/blog-details-standard",
      author: "Klinsolutions",
      authorUrl: "/about",
    },
  ];
  return (
    <div className={`blog-area pt-95 pb-55`}>
      <div className="container">
        <SectionTitle
          titleText={t("Latest News")}
          subtitleText={t("Stay updated with the most recent developments and insights.")}
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
                            {t(singleCategory)}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <div className="blog-content-wrap">
                    <div className="blog-content text-center">
                      <h3>
                        <Link>
                          {t(singlePost.title)}
                        </Link>
                      </h3>
                      <span>
                        {t('By')}{" "}
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
