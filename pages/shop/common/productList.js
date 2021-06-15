import React, { useState, useContext, useEffect } from "react";
import { Col, Row, Media, Button, Spinner } from "reactstrap";
import FilterContext from "../../../helpers/filter/FilterContext";
import ProductItem from "../../../components/common/product-box/ProductBox1";
import { CurrencyContext } from "../../../helpers/Currency/CurrencyContext";
import { useRouter } from "next/router";
import PostLoader from "../../../components/common/PostLoader";
import CartContext from "../../../helpers/cart";
import { WishlistContext } from "../../../helpers/wishlist/WishlistContext";
import { CompareContext } from "../../../helpers/Compare/CompareContext";
import { getProducts as getProductsApi } from '../../../config/api/products';
import { useSelector } from 'react-redux';


const ProductList = ({ colClass, layoutList, openSidebar, noSidebar }) => {
  const cartContext = useContext(CartContext);
  const quantity = cartContext.quantity;
  const wishlistContext = useContext(WishlistContext);
  const compareContext = useContext(CompareContext);
  const router = useRouter();
  const [limit, setLimit] = useState(8);
  const curContext = useContext(CurrencyContext);
  const [grid, setGrid] = useState(colClass);
  const symbol = curContext.state.symbol;
  const filterContext = useContext(FilterContext);
  //const [sortBy, setSortBy] = useState("AscOrder");
  const [isLoading, setIsLoading] = useState(true);
  const [layout, setLayout] = useState(layoutList);
  const [url, setUrl] = useState();
  const [products, setProducts] = useState([]);
  const selectedVendor = filterContext.selectedVendor;
  const selectedCategory = filterContext.selectedCategory;
  const selectedTags = filterContext.selectedTags;
  const selectedPrice = filterContext.selectedPrice;
  const { login } = useSelector(state => ({
    login: state.auth.login,
  }))


  useEffect(() => {
    const pathname = window.location.pathname;
    setUrl(pathname);

    const getProducts = async () => {
      setIsLoading(true);
      try {
        let { data } = await getProductsApi(
          selectedTags,
          selectedVendor,
          selectedCategory,
          selectedPrice.min,
          selectedPrice.max,
        );
        setProducts(data);
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        console.error(error);
      }
    }
    getProducts();

    router.push(
      `${pathname}?vendor=${selectedVendor}&tags=${selectedTags}&productType=${selectedCategory}&minPrice=${selectedPrice.min}&maxPrice=${selectedPrice.max}`
    );
  }, [
    selectedVendor,
    selectedTags,
    selectedCategory,
    selectedPrice.min,
    selectedPrice.max,
  ]);

  const removeVendor = (val) => {
    const temp = [...selectedVendor];
    temp.splice(selectedVendor.indexOf(val), 1);
    filterContext.setSelectedVendor(temp);
  };
  const removeCategory = (val) => {
    const temp = [...selectedCategory];
    temp.splice(selectedCategory.indexOf(val), 1);
    filterContext.setSelectedCategory(temp);
  };
  const removeTags = (val) => {
    const temp = [...selectedTags];
    temp.splice(selectedTags.indexOf(val), 1);
    filterContext.setSelectedTags(temp);
  };
  // Validando agragar al carro
  const handleClickAddToCart = async (product, quantity) => {
    console.log(login.isAuthenticated);
    if (login.isAuthenticated) {
      console.log(login.isAuthenticated);
      try {
        const res = await axios.post(`/carts/${product.id}`, { quantity: quantity }, {
          validateStatus: (status) => {
            return status >= 200 && status < 500;
          }
        })
        if (res.status === 401) {
          router.push('/page/account/login');
        } else if (res.status === 404) {
          toast.warning("The product not exist !")
        } else if (res.status === 204) {
          cartContext.addToCart2(product, quantity);
        }

      } catch (error) {
        console.log(error);
      }
    } else {
      router.push('/page/account/login');
    }
  }
  return (
    <Col className="collection-content">
      <div className="page-main-content">
        <Row>
          <Col sm="12">
            <div className="top-banner-wrapper">
              <a href={null}>
                <Media
                  src={'/assets/images/tiojewelers/product_list.jpg'}
                  className="img-fluid blur-up lazyload"
                  alt=""
                />
              </a>
              <div className="top-banner-content small-section">
                <h4>Tio Jewelers</h4>
                <h5>
                  Quality is our game, and you can trust in our name.
                </h5>
                <p>

                </p>
              </div>
            </div>
            <Row>
              <Col xs="12">
                <ul className="product-filter-tags">
                  {
                    <li>
                      <a href={null} className="filter_tag">
                        Price: {selectedPrice.min} - {selectedPrice.max}
                      </a>
                    </li>
                  }
                  {selectedVendor.map((vendor, i) => (
                    <li key={i}>
                      <a href={null} className="filter_tag">
                        Vendor: {vendor.name}
                        <i
                          className="fa fa-close"
                          onClick={() => removeVendor(vendor)}
                        ></i>
                      </a>
                    </li>
                  ))}
                  {selectedCategory.map((category, i) => (
                    <li key={i}>
                      <a href={null} className="filter_tag">
                        Product Type: {category.name}
                        <i
                          className="fa fa-close"
                          onClick={() => removeCategory(category)}
                        ></i>
                      </a>
                    </li>
                  ))}
                  {selectedTags.map((tags, i) => (
                    <li key={i}>
                      <a href={null} className="filter_tag">
                        Product Type: {tags.name}
                        <i
                          className="fa fa-close"
                          onClick={() => removeTags(tags)}
                        ></i>
                      </a>
                    </li>
                  ))}
                </ul>
              </Col>
            </Row>
            <div className="collection-product-wrapper">
              <div className="product-top-filter">
                {!noSidebar ? (
                  <Row>
                    <Col xl="12">
                      <div
                        className="filter-main-btn"
                        onClick={() => openSidebar()}
                      >
                        <span className="filter-btn btn btn-theme">
                          <i className="fa fa-filter" aria-hidden="true"></i>{" "}
                          Filter
                        </span>
                      </div>
                    </Col>
                  </Row>
                ) : (
                  ""
                )}
                <Row>
                  <Col>
                    <div className="product-filter-content">
                      <div className="search-count">
                        <h5>
                          {products
                            ? `Showing Products 1-${products.length} of ${products.length}`
                            : "loading"}{" "}
                          Result
                        </h5>
                      </div>
                      <div className="collection-view">
                        <ul>
                          <li>
                            <i
                              className="fa fa-th grid-layout-view"
                              onClick={() => {
                                setLayout("");
                                setGrid("col-lg-3");
                              }}
                            ></i>
                          </li>
                          <li>
                            <i
                              className="fa fa-list-ul list-layout-view"
                              onClick={() => {
                                setLayout("list-view");
                                setGrid("col-lg-12");
                              }}
                            ></i>
                          </li>
                        </ul>
                      </div>
                      <div
                        className="collection-grid-view"
                        style={
                          layout === "list-view"
                            ? { opacity: 0 }
                            : { opacity: 1 }
                        }
                      >
                        <ul>
                          <li>
                            <Media
                              src={`/assets/images/icon/2.png`}
                              alt=""
                              className="product-2-layout-view"
                              onClick={() => setGrid("col-lg-6")}
                            />
                          </li>
                          <li>
                            <Media
                              src={`/assets/images/icon/3.png`}
                              alt=""
                              className="product-3-layout-view"
                              onClick={() => setGrid("col-lg-4")}
                            />
                          </li>
                          <li>
                            <Media
                              src={`/assets/images/icon/4.png`}
                              alt=""
                              className="product-4-layout-view"
                              onClick={() => setGrid("col-lg-3")}
                            />
                          </li>
                          <li>
                            <Media
                              src={`/assets/images/icon/6.png`}
                              alt=""
                              className="product-6-layout-view"
                              onClick={() => setGrid("col-lg-2")}
                            />
                          </li>
                        </ul>
                      </div>
                      <div className="product-page-per-view">
                        <select
                          onChange={(e) => setLimit(parseInt(e.target.value))}
                        >
                          <option value="10">10 Products Par Page</option>
                          <option value="15">15 Products Par Page</option>
                          <option value="20">20 Products Par Page</option>
                        </select>
                      </div>
                      {/* <div className="product-page-filter">
                        <select onChange={(e) => setSortBy(e.target.value)}>
                          <option value="AscOrder">Sorting items</option>
                          <option value="HighToLow">High To Low</option>
                          <option value="LowToHigh">Low To High</option>
                          <option value="AscOrder">Asc Order</option>
                          <option value="DescOrder">Desc Order</option>
                        </select>
                      </div> */}
                    </div>
                  </Col>
                </Row>
              </div>
              <div className={`product-wrapper-grid ${layout}`}>
                <Row>
                  {
                    isLoading ?
                      (
                        <div className="row mx-0 margin-default mt-4">
                          <div className="col-xl-3 col-lg-4 col-6">
                            <PostLoader />
                          </div>
                          <div className="col-xl-3 col-lg-4 col-6">
                            <PostLoader />
                          </div>
                          <div className="col-xl-3 col-lg-4 col-6">
                            <PostLoader />
                          </div>
                          <div className="col-xl-3 col-lg-4 col-6">
                            <PostLoader />
                          </div>
                        </div>
                      )
                      :
                      (
                        !products ||
                          products.length === 0
                          ? (
                            <Col xs="12">
                              <div>
                                <div className="col-sm-12 empty-cart-cls text-center">
                                  <img
                                    src={`/assets/images/empty-search.jpg`}
                                    className="img-fluid mb-4 mx-auto"
                                    alt=""
                                  />
                                  <h3>
                                    <strong>Your Cart is Empty</strong>
                                  </h3>
                                  <h4>Explore more shortlist some items.</h4>
                                </div>
                              </div>
                            </Col>
                          ) :
                          (
                            products &&
                            products.map((product, i) => (
                              <div className={grid} key={i}>
                                <div className="product">
                                  <div>
                                    <ProductItem
                                      des={true}
                                      product={product}
                                      symbol={symbol}
                                      cartClass="cart-info cart-wrap"
                                      addCompare={() =>
                                        compareContext.addToCompare(product)
                                      }
                                      addWishlist={() =>
                                        wishlistContext.addToWish(product)
                                      }
                                      addCart={() =>
                                        handleClickAddToCart(product, quantity)
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            ))
                          )
                      )}
                </Row>
              </div>
              {/*  <div className="section-t-space">
                <div className="text-center">
                  <Row>
                    <Col xl="12" md="12" sm="12">
                      {products && products.hasMore && (
                        <Button onClick={() => handlePagination()}>
                          {isLoading && (
                            <Spinner animation="border" variant="light" />
                          )}
                          Load More
                        </Button>
                      )}
                    </Col>
                  </Row>
                </div>
              </div> */}
            </div>
          </Col>
        </Row>
      </div>
    </Col>
  );
};

export default ProductList;