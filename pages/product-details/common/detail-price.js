import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import sizeChart from "../../../public/assets/images/size-chart.jpg";
import { Modal, ModalBody, ModalHeader, Media, Input } from "reactstrap";
import { CurrencyContext } from "../../../helpers/Currency/CurrencyContext";
import CartContext from "../../../helpers/cart";
import CountdownComponent from "../../../components/common/widgets/countdownComponent";
import MasterSocial from "./master_social";
import ReactHtmlParser from 'react-html-parser';
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from "next/router";

const DetailsWithPrice = ({ item/*, variants*/, element, setVariantId/*, stickyClass, changeColorVar*/ }) => {
  const [modal, setModal] = useState(false);
  const CurContect = useContext(CurrencyContext);
  const symbol = CurContect.state.symbol;
  const router = useRouter();
  const toggle = () => setModal(!modal);
  const context = useContext(CartContext);
  const stock = context.stock;
  const plusQty = context.plusQty;
  const minusQty = context.minusQty;
  const setQuantity = context.setQty;
  const quantity = context.quantity;
  let product = item;
  const { login } = useSelector(state => ({
    login: state.auth.login,
  }))
  //console.log(product)
  /*   const uniqueColor = [];
    const uniqueSize = []; */
  const changeQty = (e) => {
    let number = e.target.value;
    if (number === '') {
      setQuantity(product, parseInt(1));
    } else if (!isNaN(number)) {
      setQuantity(product, parseInt(number));
    }
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
          context.addToCart2(product, quantity);
        }

      } catch (error) {
        console.log(error);
      }
    } else {
      router.push('/page/account/login');
    }
  }
  return (
    <>
      <div className={`product-right`}>
        Detail Price
        <h2> {item.title} </h2>
        <h4>
          <del>
            {symbol}
            {!element ? product.compareAtPrice : element.compareAtPrice}
          </del>
        </h4>
        <h3>
          {symbol}
          {!element ? product.price : element.price}
        </h3>
        {/*   {product.variants.map((vari) => {
          var findItem = uniqueColor.find((x) => x.color === vari.color);
          if (!findItem) uniqueColor.push(vari);
          var findItemSize = uniqueSize.find((x) => x === vari.size);
          if (!findItemSize) uniqueSize.push(vari.size);
        })} */}
        {/* {changeColorVar === undefined ? (
          <>
            {uniqueColor ? (
              <ul className="color-variant">
                {uniqueColor.map((vari, i) => {
                  return (
                    <li className={vari.color} key={i} title={vari.color}></li>
                  );
                })}
              </ul>
            ) : (
              ""
            )}
          </>
        ) : (
          <>
            {uniqueColor ? (
              <ul className="color-variant">
                {uniqueColor.map((vari, i) => {
                  return (
                    <li
                      className={vari.color}
                      key={i}
                      title={vari.color}
                      onClick={() => changeColorVar(i)}
                    ></li>
                  );
                })}
              </ul>
            ) : (
              ""
            )}
          </>
        )} */}
        <div className="product-description">
          {/* {variants.length > 0 ? (
            <div className="border-product" >
              <h5 className="product-title">Variants</h5>
              <h6 className="product-title">{Object.keys(JSON.parse(variants[0].options))}</h6>
              <ul>
                {variants.map((item, i) => (
                  <li key={i} className="btn btn-outline">
                    <a onClick={() => setVariantId(item.id)} href={null}>{JSON.parse(item.options)[Object.keys(JSON.parse(item.options))]}</a>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            ""
          )} */}
          <div className="border-product">
            <span className="instock-cls">{stock}</span>
            <h6 className="product-title">quantity</h6>
            <div className="qty-box">
              <div className="input-group">
                <span className="input-group-prepend">
                  <button
                    type="button"
                    className="btn quantity-left-minus"
                    onClick={minusQty}
                    data-type="minus"
                    data-field=""
                  >
                    <i className="fa fa-angle-left"></i>
                  </button>
                </span>
                <Input
                  type="text"
                  name="quantity"
                  value={quantity}
                  onChange={changeQty}
                  className="form-control input-number"
                />
                <span className="input-group-prepend">
                  <button
                    type="button"
                    className="btn quantity-right-plus"
                    onClick={() => plusQty(product)}
                    data-type="plus"
                    data-field=""
                  >
                    <i className="fa fa-angle-right"></i>
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="product-buttons">
          <a
            href={null}
            className="btn btn-solid"
            onClick={() => context.addToCart2(product, quantity)}
          >
            add to cart
          </a>
          <Link href={`/page/account/checkout`}>
            <a className="btn btn-solid">buy now</a>
          </Link>
        </div>
        <div className="border-product">
          <h6 className="product-title">Description</h6>
          {ReactHtmlParser(product.description)}
          <h6 className="product-title">Sku:</h6>
          {!element ? product.sku : element.sku}
          <h6 className="product-title">Weight:</h6>
          {product.weight}{product.weightUnit}
        </div>
        <div className="border-product">
          <h6 className="product-title">share it</h6>
          <div className="product-icon">
            <MasterSocial />
          </div>
        </div>
        <div className="border-product">
          <h6 className="product-title">Time Reminder</h6>
          <CountdownComponent />
        </div>
      </div>
    </>
  );
};

export default DetailsWithPrice;
