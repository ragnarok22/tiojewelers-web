import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import CartContext from "../../../../helpers/cart";
import { Container, Row, Col, Media, Input } from "reactstrap";
import { CurrencyContext } from "../../../../helpers/Currency/CurrencyContext";
import cart from "../../../../public/assets/images/icon-empty-cart.png";
import defaultImage from '../../../../public/assets/images/tiojewelers/default-image.png';
import axios from "axios";
import { toast } from "react-toastify";


const CartHistory = () => {
  const context = useContext(CartContext);
  const cartItems = context.state;
  const curContext = useContext(CurrencyContext);
  const symbol = curContext.state.symbol;
  const total = context.cartTotal;
  const quantity = context.quantity;
  const [quantityError, setQuantityError] = useState(false);
  const [lastCart, setLastCart] = useState([])


  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/carts/lasts', {
          validateStatus: (status) => {
            return status >= 200 && status < 500;
          }
        })
        if (res.status === 200) {
          setLastCart(res.data)
        }
      } catch (error) {
      }
    })()
  }, [])

  const refund = async (id) => {
    try {
      const res = await axios.get(`/refunds/${id}`, {
        validateStatus: (status) => {
          return status >= 200 && status < 500;
        }
      })
      if (res.status === 204) {
        const last = await axios.get('/carts/lasts', {
          validateStatus: (status) => {
            return status >= 200 && status < 500;
          }
        })
        if (last.status === 200) {
          setLastCart(last.data)
        }
      }
    } catch (error) {

    }
  }
  return (
    <div>
      {
        lastCart?.length > 0 ? lastCart.map((last, i) =>
        (<section key={i} className="cart-section section-b-space">
          <Container>
            <Row>
              <Col sm="12">
                <table className="table cart-table table-responsive-xs">
                  <thead>
                    <tr className="table-head">
                      <th scope="col">image</th>
                      <th scope="col">product name</th>
                      <th scope="col">price</th>
                      <th scope="col">quantity</th>
                      <th scope="col">total</th>
                    </tr>
                  </thead>
                  {last.products.map((item, index) => {
                    return (
                      <tbody key={index}>
                        <tr>
                          {/* Imagen del producto */}
                          <td>
                            <a>
                              <Media
                                src={
                                  item.photos.length > 0 && item.photos[0].path || defaultImage
                                }
                                alt=""
                              />
                            </a>
                          </td>
                          <td>
                            {/* Titulo del producto */}
                            <h3>{item.title}</h3>

                            <div className="mobile-cart-content row">
                              <div className="col-xs-3">
                                <div className="qty-box">
                                  <div className="input-group">
                                    {/* Cantidad */}
                                    <h3>{item.productCart.quantity}</h3>
                                  </div>
                                </div>
                                {/*  {item.qty >= item.quantity ? "out of Stock" : ""} */}
                              </div>
                              <div className="col-xs-3">
                                <h2 className="td-color">
                                  {symbol}
                                  {item.productCart.quantity * item.price}
                                  {/* {item.price -
                                    (item.price * item.discount) / 100} */}
                                </h2>
                              </div>
                              <div className="col-xs-3">
                                <h2 className="td-color">
                                  <a href="#" className="icon">
                                    <i
                                      className="fa fa-times"
                                      onClick={() => context.removeFromCart(item)}
                                    ></i>
                                  </a>
                                </h2>
                              </div>
                            </div>
                          </td>
                          <td>
                            <h2>
                              {symbol}
                              {item.price}
                            </h2>
                          </td>
                          <td>
                            <div className="qty-box">
                              <div className="input-group">
                                {/* Cantidad */}
                                <h3>{item.productCart.quantity}</h3>
                              </div>
                            </div>
                          </td>
                          <td>
                            <h2 className="td-color">
                              {symbol}
                              {item.price}
                            </h2>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
                </table>

              </Col>
            </Row>
            <Row className="cart-buttons">
              <Col xs="4">
                <h3 > STATUS:<strong> {last.sendStatus}</strong></h3>
              </Col>
              <Col xs="4">
                <h3>
                  <strong>CART AMOUNT: </strong>{symbol}{last.amount}{" "}
                </h3>
              </Col>
              <Col xs="4">
                <button className="btn btn-solid" onClick={() => refund(last.id)}>Refund</button>
              </Col>
            </Row>
          </Container>
        </section>)
        )
          : (
            <section className="cart-section section-b-space">
              <Container>
                <Row>
                  <Col sm="12">
                    <div>
                      <div className="col-sm-12 empty-cart-cls text-center">
                        <Media
                          src={cart}
                          className="img-fluid mb-4 mx-auto"
                          alt=""
                        />
                        <h3>
                          <strong>You don't have any purchase</strong>
                        </h3>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </section>
          )
      }
    </div>
  );
};

export default CartHistory;
