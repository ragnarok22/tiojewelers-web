import React, { useState } from 'react';
import CommonLayout from '../../../components/shop/common-layout';
import { Container, Row, Form, Input, Col } from 'reactstrap';
import { activateUser, resendCode } from '../../../redux/actions/auth';
import { useRouter } from "next/router";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next";


const ForgetPwd = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const dispatch = useDispatch();

    const [code, setCode] = useState('');

    const handleChange = (event) => {
        setCode(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(
            activateUser(code, (response) => {
                if (!response.prompt) {
                    toast.success(t('User activated successfully'));
                    router.push("/");
                } else {
                    toast.error(t(response.prompt));
                }
            })
        );
    }

    const handleClick = () => {
        dispatch(
            resendCode((response) => {
                if (response.prompt) {
                    console.error(response.prompt);
                }
            })
        );
    }

    return (
        <CommonLayout parent="home" title="Activate Account">
            <section className="pwd-page section-b-space">
                <Container>
                    <Row>
                        <Col lg="6" className="m-auto">
                            <h2>Activate Account</h2>
                            <Form className="theme-form" onSubmit={handleSubmit}>
                                <Row>
                                    <Col md="12">
                                        <Input type="text" onChange={handleChange} className="form-control" id="activate" placeholder="Enter Your Code"
                                            required="" value={code} />
                                    </Col>
                                    <button type='submit' className="btn btn-solid">Submit</button>
                                </Row>
                            </Form>
                            <a onClick={handleClick} style={{ marginTop: 20, cursor: 'pointer', color: '#5fcbc4', fontSize: 20 }}>Resend Code</a>
                        </Col>
                    </Row>
                </Container>
            </section>
        </CommonLayout>
    )
}

export default ForgetPwd;