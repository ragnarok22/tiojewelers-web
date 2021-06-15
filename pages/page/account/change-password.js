import React, { useEffect, useState } from 'react';
import CommonLayout from '../../../components/shop/common-layout';
import { Container, Row, Form, Input, Col } from 'reactstrap';
import { updatePassword } from '../../../redux/actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/router";
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next";


const ChangePwd = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const dispatch = useDispatch();
    const { login } = useSelector(state => ({
        login: state.auth.login,
    }))

    useEffect(() => {
        if (!login.isAuthenticated) {
            router.push('/page/account/login');
        }
    }, [])
    const [credentials, setCredentials] = useState({
        currentPasswd: '',
        password: '',
        confPasswd: '',
    });

    const handleChange = (event) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value,
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (credentials.password === credentials.confPasswd) {
            dispatch(
                updatePassword(credentials.currentPasswd, credentials.password, (response) => {
                    if (!response.prompt) {
                        toast.success(t('Password changed successfully'));
                        router.push("/");
                    } else {
                        toast.error(t(`${response.prompt}`));
                    }
                })
            );
        } else {
            toast.error(t('Passwords don\'t match'));
        }
    }

    return (
        <CommonLayout parent="User Profile" title="Change Password">
            <section className="pwd-page section-b-space">
                <Container>
                    <Row>
                        <Col lg="6" className="m-auto">
                            <h2>Change Password</h2>
                            <Form className="theme-form" onSubmit={handleSubmit}>
                                <Row>
                                    <Col md="12">
                                        <Input type="password" name="currentPasswd" onChange={handleChange} className="form-control" id="currentPasswd" placeholder="Enter Current Password"
                                            required="" />
                                    </Col>
                                    <Col md="12">
                                        <Input type="password" name="password" onChange={handleChange} className="form-control" id="password" placeholder="Enter Your Password"
                                            required="" />
                                    </Col>
                                    <Col md="12">
                                        <Input type="password" name="confPasswd" onChange={handleChange} className="form-control" id="confPasswd" placeholder="Confirm Your Password"
                                            required="" />
                                    </Col>
                                    <button type='submit' className="btn btn-solid">Change</button>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </section>
        </CommonLayout>
    )
}

export default ChangePwd;