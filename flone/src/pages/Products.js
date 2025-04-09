import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { connect, useSelector } from "react-redux";
import LayoutOne from "../components/LayoutOne";
import ShopProducts from "../wrappers/product/ShopProducts";
import "./products.css"; // Custom CSS file

const Products = () => {
  const [currentData, setCurrentData] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [uniqueSizes, setUniqueSizes] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000000);
  const [sortBy, setSortBy] = useState("default");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const products = useSelector((state) => state.productData.products);
  console.log(products);

  // Initialize and filter data
  useEffect(() => {
    if (products && products.length > 0) {
      // Get unique categories
      const categoriesSet = new Set();
      products.forEach((product) => {
        if (product.category && Array.isArray(product.category)) {
          product.category.forEach((category) => {
            categoriesSet.add(category);
          });
        }
      });
      setUniqueCategories([...categoriesSet]);

      // Get unique sizes from variations
      const sizesSet = new Set();
      products.forEach((product) => {
        if (product.variations && Array.isArray(product.variations)) {
          product.variations.forEach((variation) => {
            if (variation.size) {
              sizesSet.add(variation.size);
            }
          });
        }
      });
      setUniqueSizes([...sizesSet]);

      // Set initial price range
      let minProductPrice = Number.MAX_SAFE_INTEGER;
      let maxProductPrice = 0;
      products.forEach((product) => {
        if (product.variations && Array.isArray(product.variations)) {
          product.variations.forEach((variation) => {
            const price = parseFloat(variation.price);
            if (price < minProductPrice) minProductPrice = price;
            if (price > maxProductPrice) maxProductPrice = price;
          });
        }
      });
      
      // if (minProductPrice !== Number.MAX_SAFE_INTEGER) {
      //   setMinPrice(minProductPrice);
      //   setMaxPrice(maxProductPrice);
      //   setPriceRange({ min: minProductPrice, max: maxProductPrice });
      // }
      console.log(products);

      // Set initial data
      setCurrentData(products);
    }
  }, [products]);

  // Apply filters and sorting
  useEffect(() => {
    if (products && products.length > 0) {
      let filteredProducts = [...products];

      // Filter by category
      if (selectedCategory) {
        filteredProducts = filteredProducts.filter(product => 
          product.category && product.category.includes(selectedCategory)
        );
      }

      // Filter by size
      if (selectedSize) {
        filteredProducts = filteredProducts.filter(product => {
          if (!product.variations) return false;
          return product.variations.some(variation => variation.size === selectedSize);
        });
      }

      // Filter by price range
      filteredProducts = filteredProducts.filter(product => {
        if (!product.variations || product.variations.length === 0) return false;
        
        return product.variations.some(variation => {
          const price = parseFloat(variation.price);
          return price >= priceRange.min && price <= priceRange.max;
        });
      });

      // Sort products
      if (sortBy === "price-low-high") {
        filteredProducts.sort((a, b) => {
          const priceA = Math.min(...a.variations.map(v => parseFloat(v.price)));
          const priceB = Math.min(...b.variations.map(v => parseFloat(v.price)));
          return priceA - priceB;
        });
      } else if (sortBy === "price-high-low") {
        filteredProducts.sort((a, b) => {
          const priceA = Math.max(...a.variations.map(v => parseFloat(v.price)));
          const priceB = Math.max(...b.variations.map(v => parseFloat(v.price)));
          return priceB - priceA;
        });
      }
      // console.log("filteredProducts",filteredProducts);

      setCurrentData(filteredProducts);
    }
  }, [products, selectedCategory, selectedSize, priceRange, sortBy]);

  // Handle price range changes
  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    if (name === "min") {
      setPriceRange(prev => ({ ...prev, min: parseInt(value) || 0 }));
    } else if (name === "max") {
      setPriceRange(prev => ({ ...prev, max: parseInt(value) || 0 }));
    }
  };

  // Handle category selection with toggle behavior
  const handleCategoryChange = (category) => {
    setSelectedCategory(prevCategory => prevCategory === category ? "" : category);
  };

  // Handle size selection with toggle behavior
  const handleSizeChange = (size) => {
    setSelectedSize(prevSize => prevSize === size ? "" : size);
  };

  // Handle sort change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="mt-5 ">
      <MetaTags>
        <title>Klinsept</title>
        <meta
          name="description"
          content="Shop page of klinsept."
        />
      </MetaTags>

      <LayoutOne headerTop="visible">
          <div className="products-banner mb-4">
            <div className="products-banner-content">
              <h2 className="text-dark">Products</h2>
            </div>
          </div>
        <div className="container-nene den">
          
          <div className="row">
            {/* Filter sidebar */}
            <div className="col-lg-3 col-md-4 filter-sidebar">
              <div className="card filter-card">
                <div className="card-body">
                  <h5 className="filter-title">Filter Products</h5>
                  
                  {/* Categories Filter */}
                  <div className="filter-section">
                    <h6>Categories</h6>
                    <div className="category-options">
                      {uniqueCategories && uniqueCategories.length > 0 ? (
                        uniqueCategories.map((category, index) => (
                          <div className="form-check" key={index}>
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id={`category-${index}`}
                              checked={selectedCategory === category}
                              onChange={() => handleCategoryChange(category)}
                            />
                            <label 
                              className="form-check-label" 
                              htmlFor={`category-${index}`}
                              onClick={() => handleCategoryChange(category)}
                            >
                              {category}
                            </label>
                          </div>
                        ))
                      ) : (
                        <p className="no-options">No categories available.</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Sizes Filter */}
                  <div className="filter-section">
                    <h6>Sizes</h6>
                    <div className="size-options">
                      {uniqueSizes && uniqueSizes.length > 0 ? (
                        uniqueSizes.map((size, index) => (
                          <div className="form-check" key={index}>
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id={`size-${index}`}
                              checked={selectedSize === size}
                              onChange={() => handleSizeChange(size)}
                            />
                            <label 
                              className="form-check-label" 
                              htmlFor={`size-${index}`}
                              onClick={() => handleSizeChange(size)}
                            >
                              {size}
                            </label>
                          </div>
                        ))
                      ) : (
                        <p className="no-options">No sizes available.</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Price Range Filter */}
                 <div className="filter-section">
                    <h6>Price Range</h6>
                    <div className="price-range-inputs">
                      <div className="row">
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="min-price">Min:</label>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              id="min-price"
                              name="min"
                              value={priceRange.min}
                              onChange={handlePriceRangeChange}
                              min={minPrice}
                              max={maxPrice}
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="max-price">Max:</label>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              id="max-price"
                              name="max"
                              value={priceRange.max}
                              onChange={handlePriceRangeChange}
                              min={minPrice}
                              max={maxPrice}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> 
                  
                  {/* Reset Filters button */}
                  <button 
                    className="btn btn-outline-secondary btn-sm btn-block mt-3"
                    onClick={() => {
                      setSelectedCategory("");
                      setSelectedSize("");
                      setPriceRange({ min: minPrice, max: maxPrice });
                      setSortBy("default");
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            </div>
            
            {/* Products area */}
            <div className="col-lg-9 col-md-8">
              <div className="products-top-bar">
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <p className="result-count">
                      Showing {currentData.length} of {products.length} products
                    </p>
                  </div>
                  <div className="col-md-6">
                    <div className="sort-by">
                      <select 
                        className="form-select form-select-sm"
                        value={sortBy}
                        onChange={handleSortChange}
                      >
                        <option value="default">Default sorting</option>
                        <option value="price-low-high">Price: Low to High</option>
                        <option value="price-high-low">Price: High to Low</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Products grid */}
              <div className="shop-products-wrapper">
                <ShopProducts
                  products={currentData}
                  currentData={currentData}
                />
              </div>
              
              {currentData.length === 0 && (
                <div className="no-products-found">
                  <p>No products match your current filters. Try adjusting your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </LayoutOne>
    </div>
  );
};

Products.propTypes = {
  products: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    products: state.productData.products,
  };
};

export default connect(mapStateToProps)(Products);