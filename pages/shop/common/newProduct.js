import React, { useContext, useEffect, useState } from "react";
import { Media } from "reactstrap";
import Slider from "react-slick";
import { CurrencyContext } from "../../../helpers/Currency/CurrencyContext";
import { getNewArrival as getNewArrivalApi } from '../../../config/api/products';
import defaultImage from '../../../public/assets/images/tiojewelers/default-image.png';
import { useRouter } from "next/router";



const NewProduct = () => {
  const router = useRouter();
  const CurContect = useContext(CurrencyContext);
  const symbol = CurContect.state.symbol;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        let { data : newArrival } = await getNewArrivalApi();
        setProducts(newArrival);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    }
    getProducts();

  }, [])

  const clickProductDetail = (product) => {
    router.push(`/product-details/${product.id}`);
  };
  return (
    // <!-- side-bar single product slider start -->
    <div className="theme-card">
      <h5 className="title-border">new product</h5>
      <Slider className="offer-slider slide-1">
        <div>
          {!products ||
            products.length === 0 ||
            loading ? (
            "loading"
          ) : (
            <>
              {products &&
                products.slice(0, 3).map((product, index) => (
                  <div className="media" key={index}>
                    <a href={null}>
                      <Media
                        onClick={() => clickProductDetail(product)}
                        className="img-fluid blur-up lazyload"
                        src={product.photos.length > 0 && product.photos[0].path || defaultImage}
                        alt={""}
                      />
                    </a>
                    <div className="media-body align-self-center">
                      <div className="rating">
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>
                      </div>
                      <a href={null}>
                        <h6>{product.title}</h6>
                      </a>
                      <h4>
                        {symbol}
                        {product.price}
                      </h4>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
        <div>
          {!products ||
            products.length === 0 ||
            loading ? (
            "loading"
          ) : (
            <>
              {products &&
                products.slice(4, 7).map((product, index) => (
                  <div className="media" key={index}>
                    <a href="">
                      <Media
                        onClick={() => clickProductDetail(product)}
                        className="img-fluid blur-up lazyload"
                        src={product.photos.length > 0 && product.photos[0].path || defaultImage}
                        alt={""}
                      />
                    </a>
                    <div className="media-body align-self-center">
                      <div className="rating">
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>
                      </div>
                      <a href={null}>
                        <h6>{product.title}</h6>
                      </a>
                      <h4>
                        {symbol}
                        {product.price}
                      </h4>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
      </Slider>
    </div>
    //  <!-- side-bar single product slider end -->
  );
};

export default NewProduct;
