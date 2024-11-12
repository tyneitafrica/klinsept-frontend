import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import LayoutOne from "../layouts/LayoutOne";
import SectionTitleTwo from "../components/section-title/SectionTitleTwo";

export default function Search() {
  const { searchParams } = useParams();
  return (
    <Fragment>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <SectionTitleTwo
          titleText={`Search results for ${searchParams}`}
          positionClass="text-center"
          spaceClass="mb-10"
        />
        <div className="blog-area pt-100 pb-100 blog-no-sidebar">
          <SectionTitleTwo
            titleText="Related products"
            positionClass="text-center"
            spaceClass="mb-10"
          />
        </div>
      </LayoutOne>
    </Fragment>
  );
}
