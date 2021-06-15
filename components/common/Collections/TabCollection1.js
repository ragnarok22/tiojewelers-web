import React, { useState, useContext, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import ProductItem from "../product-box/ProductBox1";
import CartContext from "../../../helpers/cart/index";
import { Container, Row, Col, Media } from "reactstrap";
import { WishlistContext } from "../../../helpers/wishlist/WishlistContext";
import PostLoader from "../PostLoader";
import { CompareContext } from "../../../helpers/Compare/CompareContext";
import { CurrencyContext } from "../../../helpers/Currency/CurrencyContext";
import emptySearch from "../../../public/assets/images/empty-search.jpg";
import {
  getProducts as getProductsApi,
  getNewArrival as getNewArrivalApi,
  getFeatured as getFeaturedApi,
  getSpecial as getSpecialApi
} from '../../../config/api/products';
import axios from "axios";
import { useRouter } from 'next/router';

const TabContent = ({ data, loading, startIndex, endIndex, cartClass, backImage, }) => {
  const context = useContext(CartContext);
  const wishListContext = useContext(WishlistContext);
  const compareContext = useContext(CompareContext);
  const curContext = useContext(CurrencyContext);
  const currency = curContext.state;
  const quantity = context.quantity;
  const router = useRouter();
  // Validando agragar al carro
  const handleClickAddToCart = async (product, quantity) => {
    try {
      const res = await axios.post(`/carts/${product.id}`, { quantity: quantity }, {
        validateStatus: (status) => {
          return status >= 200 && status < 500;
        }
      })
      if (res.status === 401) {
        router.push('/page/account/login');
      } else if (res.status === 204) {
        context.addToCart2(product, quantity);
      }
    } catch (error) {
      console.log(`Yo soy el error ${error}`);
    }
  }
  return (
    <Row className="no-slider">
      {

        loading ?
          (
            <div className="row mx-0 margin-default">
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
            data &&
              data.length === 0 ? (
              <Col xs="12">
                <div>
                  <div className="col-sm-12 empty-cart-cls text-center">
                    <Media
                      src={emptySearch}
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
            )
              :
              (
                data &&
                data.slice(startIndex, endIndex).map((product, i) => (
                  <ProductItem
                    key={i}
                    product={product}
                    symbol={currency.symbol}
                    addCompare={() => compareContext.addToCompare(product)}
                    addCart={() => handleClickAddToCart(product, quantity)}
                    addWishlist={() => wishListContext.addToWish(product)}
                    cartClass={cartClass}
                    backImage={backImage}
                  />
                ))
              ))
      }
    </Row>
  );
};

const SpecialProducts = ({
  type,
  fluid,
  designClass,
  cartClass,
  heading,
  noTitle,
  title,
  inner,
  line,
  hrClass,
  backImage,
}) => {
  const [activeTab, setActiveTab] = useState(type);
  const context = useContext(CartContext);
  const wishListContext = useContext(WishlistContext);
  const compareContext = useContext(CompareContext);
  const curContext = useContext(CurrencyContext);
  const currency = curContext.state;
  const quantity = context.quantity;
  const [newArrival, setNewArrival] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [special, setSpecial] = useState([]);
  const [loading, setLoading] = useState(true)



  useEffect(() => {
    const getProducts = async () => {
      try {
        let { data: newArrival } = await getNewArrivalApi();
        setNewArrival(newArrival);
        let { data: featured } = await getFeaturedApi();
        setFeatured(featured);
        let { data: special } = await getSpecialApi();
        setSpecial(special);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    }
    getProducts();

  }, [])


  return (
    <div>
      <section className={designClass}>
        <Container fluid={fluid}>
          {noTitle ? (
            ""
          ) : (
            <div className={title}>
              <h4>{heading}</h4>
              {/* exclusive products */}
              <h2 className={inner}>special products</h2>
              {line ? (
                <div className="line"></div>
              ) : hrClass ? (
                <hr role="tournament6"></hr>
              ) : (
                ""
              )}
            </div>
          )}

          <Tabs className="theme-tab">
            <TabList className="tabs tab-title">
              <Tab
                className={activeTab == type ? "active" : ""}
                onClick={() => setActiveTab(type)}
              >
                NEW ARRIVAL
              </Tab>
              <Tab
                className={activeTab == "furniture" ? "active" : ""}
                onClick={() => setActiveTab("furniture")}
              >
                FEATURED{" "}
              </Tab>
              <Tab
                className={activeTab == "furniture" ? "active" : ""}
                onClick={() => setActiveTab("furniture")}
              >
                SPECIAL
              </Tab>
            </TabList>

            <TabPanel>
              <TabContent
                data={newArrival}
                loading={loading}
                startIndex={0}
                endIndex={8}
                cartClass={cartClass}
                backImage={backImage}
              />
            </TabPanel>
            <TabPanel>
              <TabContent
                data={featured}
                loading={loading}
                startIndex={0}
                endIndex={8}
                cartClass={cartClass}
                backImage={backImage}
              />
            </TabPanel>
            <TabPanel>
              <TabContent
                data={special}
                loading={loading}
                startIndex={0}
                endIndex={8}
                cartClass={cartClass}
                backImage={backImage}
              />
            </TabPanel>
          </Tabs>
        </Container>
      </section>
    </div>
  );
};

export default SpecialProducts;
