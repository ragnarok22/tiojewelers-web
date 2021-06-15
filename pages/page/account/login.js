import React, { useRef, useState, useContext } from 'react';
import CommonLayout from '../../../components/shop/common-layout';
import { Container, Row, Form, Label, Input, Col } from 'reactstrap';
//import Loading from '../../../components/common/Loading'
import { authentication } from '../../../redux/actions/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from "next/router";
import Link from "next/link";
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next";
import i18next from "../../../components/constant/i18n";
import CartContext from '../../../helpers/cart';
import axios from 'axios';


const Login = () => {
    const context = useContext(CartContext)
    const { t } = useTranslation();
    const router = useRouter()
    const dispatch = useDispatch()
    const { user } = useSelector(state => ({
        user: state.auth.user
    }))
    const [loading, setLoading] = useState(false)
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });
    const handleChange = (event) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value,
        })
    }
    const cart = async () => {
        const res = await axios.get("/carts")
        context.setCartItems(res.data)
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true)
        dispatch(
            authentication(credentials, (response) => {
                if (!response.prompt) {
                    setLoading(false)
                    cart()
                    i18next.changeLanguage(response.lang);
                    router.push('/')
                } else {
                    setLoading(false)
                    toast.error(t(`${response.prompt}`));
                }
            })
        );
    }

    return (
        <CommonLayout parent="home" title="login">
            <section className="login-page section-b-space">
                <Container>
                    <Row>
                        <Col lg="6">
                            <h3>Login</h3>
                            <div className="theme-card">
                                <Form className="theme-form" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <Label for="email">Email</Label>
                                        <Input onChange={handleChange} type="email" name="email" className="form-control" id="email" placeholder="Email" required="" />
                                    </div>
                                    <div className="form-group">
                                        <Label for="review">Password</Label>
                                        <Input onChange={handleChange} name="password" type="password" className="form-control" id="review"
                                            placeholder="Enter your password" required="" />
                                    </div>
                                    <div className="d-flex justify-content-around align-items-center">
                                        <button type="submit" className="btn btn-solid">
                                            Login
                                        </button>
                                        <Link href="/page/account/forget-pwd" className="btn btn-solid ml-5">
                                            forgot password?
                                    </Link>
                                    </div>
                                </Form>
                            </div>
                        </Col>
                        <Col lg="6" className="right-login">
                            <h3>New Customer</h3>
                            <div className="theme-card authentication-right">
                                <h6 className="title-font">Create A Account</h6>
                                <p>Sign up for a free account at our store. Registration is quick and easy. It allows you to be
                            able to order from our shop. To start shopping click register.</p><Link href="/page/account/register"
                                >
                                    <div className="btn btn-solid">
                                        Create an Account
                                    </div>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </CommonLayout>
    )
}

export default Login;