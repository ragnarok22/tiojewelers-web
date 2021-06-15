import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const Paragraph = ({ title, inner, line, hrClass }) => {
    return (
        <>
            <div className={title}>
                <h4>special offer</h4>
                <h2 className={inner}>popular</h2>
                {
                    line ?
                        <div className="line"></div> :
                        hrClass ?
                            <hr role="tournament6"></hr>
                            : ''
                }
            </div>
            <Container>
                <Row>
                    <Col lg="6" className="m-auto">
                        <div className="product-para">
                            <p className="text-center">
                                Jewelry is about making a statement, and you can’t do that by being like all the rest. To that end, we stock only the hottest looks and contract our very own custom designer to build any look you can imagine.
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Paragraph;