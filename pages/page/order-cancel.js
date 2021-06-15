import React, { useContext, useEffect, useState } from 'react';
import CommonLayout from '../../components/shop/common-layout';
import { Container, Row, Col } from 'reactstrap';

const OrderCancel = ({ message = "Your payment has been canceled", subtitle = "Sorry" }) => {
    return (
        <CommonLayout parent="home" title="order cancel">
            <section className="section-b-space light-layout">
                <Container>
                    <Row>
                        <Col md="12">
                            <div className="danger-text"><i className="fa fa-times-circle" aria-hidden="true"></i>
                                <h2>{subtitle}</h2>
                                <p>{message}</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </CommonLayout>
    )
}
export default OrderCancel;