import React, {useState} from 'react';
import CommonLayout from '../../../components/shop/common-layout';
import { Container, Row, Form, Input, Col } from 'reactstrap';
import { resetPassword } from '../../../redux/actions/auth';
import { useDispatch } from 'react-redux';
import { useRouter } from "next/router";
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next";

const ResetPwd = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({
    code: '',
    password:'',
    confPasswd: '',
  });

        const handleChange = (event) => {
            setCredentials({
                ...credentials,
                [event.target.name] : event.target.value,
            });
        }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.info(`${credentials.password} - ${credentials.confPasswd}`)
        if(credentials.password === credentials.confPasswd){
            dispatch(
                resetPassword(credentials.code, credentials.password, (response) => {
                  if (!response.prompt) {
                    router.push("/page/account/login");
                  } else {
                    console.error(response.prompt)
                  }
                })
              );
        }else{
            toast.error(t('Passwords don\'t match'));
        }
    }

    return (
        <CommonLayout parent="Recover Password" title="Reset Password">
            <section className="pwd-page section-b-space">
                <Container>
                    <Row>
                        <Col lg="6" className="m-auto">
                            <h2>Reset Password</h2>
                            <Form className="theme-form" onSubmit={handleSubmit}>
                                <Row>
                                    <Col md="12">
                                        <Input type="text" name="code" onChange={handleChange} className="form-control" id="code" placeholder="Enter Code"
                                            required="" />
                                    </Col>
                                    <Col md="12">
                                        <Input type="password" name="password" onChange={handleChange} className="form-control" id="password" placeholder="Enter Your Password"
                                            required="" />
                                    </Col>
                                    <Col md="12">
                                        <Input type="password" name="confPasswd" onChange={handleChange} className="form-control" id="conf-passwd" placeholder="Confirm Your Password"
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

export default ResetPwd;