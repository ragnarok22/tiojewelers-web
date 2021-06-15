import React, { useContext, useEffect, useState } from 'react';
import CommonLayout from '../../components/shop/common-layout';
import { Container, Row, Col } from 'reactstrap';

const OrderCancel = ({message="To get to this page you must have bought through paypal first", subtitle="Warning"}) => {
    return (
        <CommonLayout parent="home" title="warning">
            <section className="section-b-space light-layout">
                <Container>
                    <Row>
                        <Col md="12">
                            <div className="warning-text"><i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
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