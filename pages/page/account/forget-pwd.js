import React, {useState} from 'react';
import CommonLayout from '../../../components/shop/common-layout';
import { Container, Row, Form, Input, Col } from 'reactstrap';
import { forgotPassword } from '../../../redux/actions/auth';
import { useRouter } from "next/router";
import { useDispatch } from 'react-redux';



const ForgetPwd = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');

        const handleChange = (event) => {
           setEmail(event.target.value)
        }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(
            forgotPassword(email, (response) => {
              if (!response.prompt) {
                router.push("/page/account/reset-password");
              } else {
                console.error(response.prompt)
              }
            })
          );
    }

    return (
        <CommonLayout parent="login" title="Forget Password" parentUrl="/page/account/login">
            <section className="pwd-page section-b-space">
                <Container>
                    <Row>
                        <Col lg="6" className="m-auto">
                            <h2>Forgot Your Password?</h2>
                            <Form className="theme-form" onSubmit={handleSubmit}>
                                <Row>
                                    <Col md="12">
                                        <Input type="email" onChange={handleChange} className="form-control" id="email" placeholder="Enter Your Email"
                                            required="" />
                                    </Col>
                                    <button type='submit' className="btn btn-solid">Submit</button>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </section>
        </CommonLayout>
    )
}

export default ForgetPwd;