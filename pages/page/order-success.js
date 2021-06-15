import React, { useContext, useEffect, useState } from 'react';
import CommonLayout from '../../components/shop/common-layout';
import { Container, Row, Col, Media } from 'reactstrap';
//import one from '../../public/assets/images/pro3/1.jpg';
import CartContext from '../../helpers/cart';
import { CurrencyContext } from '../../helpers/Currency/CurrencyContext';
import { Fragment } from 'react';
import LoadingOrder from '../../components/common/LoadingOrder'
import { BASE_API } from '../../config/api/Security';
import axios from 'axios';
import Cancel from './order-cancel'
import Warning from './order-warning'

const OrderSuccess = () => {
    const querystring = window.location.search;
    const params = new URLSearchParams(querystring);
    const paypal_token = params.get('token');
    const payerID = params.get('PayerID');
    const cartContext = useContext(CartContext);
    const cartItems = cartContext.state;
    const cartTotal = cartContext.cartTotal;
    const curContext = useContext(CurrencyContext);
    const symbol = curContext.state.symbol;
    const [orderStatus, setOrderStatus] = useState(false);
    const [active, setActive] = useState(true);
    const [message, setMessage] = useState("");
    const [subtitle, setSubtitle] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${BASE_API}/payment/paypal/confirm?token=${paypal_token}&PayerID=${payerID}`, {
                    validateStatus: function (status) {
                        return status >= 200 && status < 500;
                    }
                });
                if (response.status === 400) {
                    setActive(false);
                    setSubtitle("Warning");
                    setMessage(`The payment does not exist or the purchase has already been made. Please go to the order page`);
                } else if (response.status === 200) {
                    setOrderStatus(true);
                    setActive(false);
                } else {
                    setSubtitle("Error");
                    setMessage("An unexpected error has occurred, please try again later");
                    setActive(false);
                }
            } catch (error) {
                setSubtitle("Error");
                console.log(error);
                setActive(false);
            }
        })();
    }, []);

    if (subtitle === "Warning") {
        return <Warning message={message} subtitle={subtitle} />
    }
    if (subtitle === "Error") {
        return <Cancel message={message} subtitle={subtitle} />
    }

    return (
        <LoadingOrder active={active} >
            <CommonLayout parent="home" title="order success">
                {orderStatus && <Fragment>
                    <section className="section-b-space light-layout">
                        <Container>
                            <Row>
                                <Col md="12">
                                    <div className="success-text"><i className="fa fa-check-circle" aria-hidden="true"></i>
                                        <h2>Thank You</h2>
                                        <p>Payment is successfully processsed and your order is on the way</p>
                                        <p>Transaction ID: {payerID}</p>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </section>
                    <section className="section-b-space">
                        <Container>
                            <Row>
                                <Col lg="6">
                                    <div className="product-order">
                                        <h3>your order details</h3>
                                        {cartItems.products.map((item, i) =>
                                            <Row className="product-order-detail" key={i}>
                                                <Col xs="3" >
                                                    <Media src={item?.photos?.length > 0 && item?.photos[0]?.path} alt=""
                                                        className="img-fluid blur-up lazyload" />
                                                </Col>
                                                <Col xs="3" className="order_detail">
                                                    <div>
                                                        <h4>product name</h4>
                                                        <h5>{item.title}</h5>
                                                    </div>
                                                </Col>
                                                <Col xs="3" className="order_detail">
                                                    <div>
                                                        <h4>quantity</h4>
                                                        <h5>{item.qty}</h5>
                                                    </div>
                                                </Col>
                                                <Col xs="3" className="order_detail">
                                                    <div>
                                                        <h4>price</h4>
                                                        <h5>{symbol}{item.price}</h5>
                                                    </div>
                                                </Col>
                                            </Row>
                                        )}
                                        <div className="total-sec">
                                            <ul>
                                                <li>subtotal <span>{symbol}{cartTotal}</span></li>
                                            </ul>
                                        </div>
                                        <div className="final-total">
                                            <h3>total <span>{symbol}{cartTotal}</span></h3>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg="6">
                                    <Row className="order-success-sec">
                                        <Col sm="6">
                                            <h4>summery</h4>
                                            <ul className="order-detail">
                                                <li>order ID: 5563853658932</li>
                                                <li>Order Date: October 22, 2021</li>
                                                <li>Order Total: $907.28</li>
                                            </ul>
                                        </Col>
                                        <Col sm="6">
                                            <h4>shipping address</h4>
                                            <ul className="order-detail">
                                                <li>gerg harvell</li>
                                                <li>568, suite ave.</li>
                                                <li>Austrlia, 235153</li>
                                                <li>Contact No. 987456321</li>
                                            </ul>
                                        </Col>
                                        <Col sm="12" className="payment-mode">
                                            <h4>payment method</h4>
                                            <p>Pay on Delivery (Cash/Card). Cash on delivery (COD) available. Card/Net banking
                                acceptance subject to device availability.</p>
                                        </Col>
                                        <Col md="12">
                                            <div className="delivery-sec">
                                                <h3>expected date of delivery</h3>
                                                <h2>october 22, 2021</h2>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </section>
                </Fragment>}
            </CommonLayout >
        </LoadingOrder>
    )
}

export default OrderSuccess;