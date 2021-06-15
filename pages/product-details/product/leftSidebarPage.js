import React, { useState, useEffect, useRef } from "react";
import ProductTab from "../common/product-tab";
import Service from "../common/service";
import NewProduct from "../../shop/common/newProduct";
import Slider from "react-slick";
import ImageZoom from "../common/image-zoom";
import DetailsWithPrice from "../common/detail-price";
import Filter from "../common/filter";
import { Container, Row, Col, Media } from "reactstrap";
import { getProductDetail/*, getProductVariants */ } from '../../../config/api/products'
import { BASE_API } from '../../../config/api/Security';
import defaultImage from '../../../public/assets/images/tiojewelers/default-image.png';
import PostLoader from '../../../components/common/PostLoader';
import { useRouter } from "next/router";

const LeftSidebarPage = ({ pathId }) => {
  const router = useRouter();
  const [state, setState] = useState({ nav1: null, nav2: null });
  const slider1 = useRef();
  const slider2 = useRef();
  const [product, setProduct] = useState({});
  const [isLoading, setLoading] = useState(true);
  /* const [variants, setVariants] = useState([]);
  const querystring = window.location.search;
  const params = new URLSearchParams(querystring); 
  const [variantId, setVariantId] = useState(params.get('variant'));
  const [url, setUrl] = useState();*/
  const [element, setElement] = useState(null);

  var products = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    fade: true,
    initialSlide:1
  };
  var productsnav = {
    slidesToShow: 3,
    swipeToSlide: true,
    arrows: false,
    dots: false,
    focusOnSelect: true,
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data: prod } = await getProductDetail(pathId);
        setProduct(prod);
        /* const { data: vari } = await getProductVariants(pathId);
        setVariants(vari);
        let x =[...vari]
        if (variantId !== '') {
          let vari = x.filter((item) => item.id == parseInt(variantId));
            setElement(vari[0]);
        } */
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    }
    getProducts();



    /* const pathname = window.location.pathname;
    setUrl(pathname);

    router.push(
      `${pathname}?variant=${variantId}`
    ); */
  }, [pathId/*, variantId*/]);

  useEffect(() => {
    setState({
      nav1: slider1.current,
      nav2: slider2.current,
    });
  }, [product]);

  const { nav1, nav2 } = state;

  const filterClick = () => {
    document.getElementById("filter").style.left = "-15px";
  };

  const changeColorVar = (img_id) => {
    slider2.current.slickGoTo(img_id);
  };

  return (
    <section className="">
      <div className="collection-wrapper">
        <Container>
          <Row>
            <Col sm="3" className="collection-filter">
              {/* <Filter /> */}
              <Service />
              {/* <!-- side-bar single product slider start --> */}
              <NewProduct />
              {/* <!-- side-bar single product slider end --> */}
            </Col>
            <Col lg="9" sm="12" xs="12">
              <Container fluid={true}>
                {/* <Row>
                  <Col cl="12">
                    <div className="filter-main-btn mb-2">
                      <span onClick={filterClick} className="filter-btn">
                        <i className="fa fa-filter" aria-hidden="true"></i>{" "}
                        filter
                      </span>
                    </div>
                  </Col>
                </Row>
                 */}
                <Row>
                  <Col lg="6" className="product-thumbnail">
                    <Slider
                      {...products}
                      asNavFor={nav2}
                      ref={(slider) => (slider1.current = slider)}
                      className="product-slick"
                    >
                      {
                        isLoading ? (
                          <div className="row mx-0 margin-default">
                            <PostLoader />
                          </div>
                        ) : (
                          product?.photos?.length > 0 && product.photos.map((vari, index) => (
                            <div key={vari.id}>
                              <ImageZoom image={vari.path} />
                            </div>
                          )) || <Media
                            src={defaultImage}
                            alt=''
                            className="img-fluid"
                          />
                        )
                      }
                    </Slider>
                    <Slider
                      className="slider-nav"
                      {...productsnav}
                      asNavFor={nav1}
                      ref={(slider) => (slider2.current = slider)}
                    >
                      {isLoading ? (
                        ""
                      ) :
                        (product?.photos?.length > 2 ?
                          product.photos.map((vari, index) => (
                            <div key={index}>
                              <Media
                                src={vari.path}
                                key={vari.id}
                                alt={vari.alt}
                                className="img-fluid"
                              />
                            </div>
                          ))
                          : "")
                      }
                    </Slider>
                  </Col>
                  <Col lg="6" className="rtl-text">
                    <DetailsWithPrice
                      item={product}
                      // variants={variants}
                      element={element}
                    // setVariantId={setVariantId}
                    />
                  </Col>
                </Row>
              </Container>
              <ProductTab />
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default LeftSidebarPage;
