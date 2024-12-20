import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";

const ProductImageGallery = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(
    product.images?.[0]?.image || ""
  );

  return (
    <Fragment>
      <div className="product-large-image-wrapper">
        <LightgalleryProvider>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              margin: "20px 0",
            }}
          >
            {/* Large Image Section */}
            <div
              style={{
                width: "100%",
                maxWidth: "600px",
                aspectRatio: "16 / 9", // Maintain a 16:9 ratio
                position: "relative",
                overflow: "hidden", // Ensure images stay within the bounds
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <LightgalleryItem group="any" src={selectedImage}>
                <button
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "rgba(0, 0, 0, 0.6)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    padding: "8px",
                    cursor: "pointer",
                    transition: "background 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.background = "rgba(0, 0, 0, 0.8)")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.background = "rgba(0, 0, 0, 0.6)")
                  }
                >
                  <i className="pe-7s-expand1"></i>
                </button>
              </LightgalleryItem>
              <img
                src={selectedImage}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain", // Ensures image fills the area without distortion
                }}
              />
            </div>

            {/* Slider Section */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                overflowX: "auto",
                justifyContent: "center",
                padding: "10px",
              }}
            >
              {product.images &&
                product.images.map((single, key) => (
                  <img
                    key={key}
                    src={single.image}
                    alt={`Thumbnail ${key}`}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      border:
                        selectedImage === single.image
                          ? "2px solid #007bff"
                          : "2px solid transparent",
                      borderRadius: "8px",
                      transition: "border 0.3s ease",
                      cursor: "pointer",
                    }}
                    onClick={() => setSelectedImage(single.image)}
                  />
                ))}
            </div>
          </div>
        </LightgalleryProvider>
      </div>
    </Fragment>
  );
};

ProductImageGallery.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.string,
      })
    ),
  }),
};

export default ProductImageGallery;
