import React, {useState} from 'react';
import CommonLayout from '../../../components/shop/common-layout';
import { Input, Container, Row, Form, Label ,Col} from 'reactstrap';
import { useDispatch } from 'react-redux'
import { useRouter } from "next/router";
import { registration } from '../../../redux/actions/auth'
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next";

const Register = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { t } = useTranslation();

   // const [loading, setLoading] = useState(false);
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });
    const handleChange = (event) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value,
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(
            registration(credentials, (response) => {
                if (!response.prompt) {
                    router.push('/');
                }else{
                    toast.error(t(`${response.prompt}`));
                }
            })
        );
    }


    return (
        <CommonLayout parent="home" title="register">
            <section className="register-page section-b-space">
                <Container>
                    <Row>
                        <Col lg="12">
                            <h3>create account</h3>
                            <div className="theme-card">
                                <Form className="theme-form" onSubmit={handleSubmit}>
                                    <Row>
                                        <Col md="6">
                                            <Label for="email">email</Label>
                                            <Input type="text" onChange={handleChange} name="email" className="form-control" id="email" placeholder="Email" required="" />
                                        </Col>
                                        <Col md="6">
                                            <Label for="review">Password</Label>
                                            <Input type="password" onChange={handleChange} name="password" className="form-control" id="review"
                                                placeholder="Enter your password" required="" />
                                        </Col>
                                        <button type='submit' className="btn btn-solid">create Account</button>
                                    </Row>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </CommonLayout>
    )
}

export default Register