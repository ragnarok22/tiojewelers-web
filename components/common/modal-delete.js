import React, { useState } from "react";
import {
  Col,
  Media,
  Row,
  Modal,
  ModalBody,
  Input,
  Form,
  Button,
} from "reactstrap";
//import offerBanner from "../../public/assets/images/Offer-banner.png";
import { deleteUser } from '../../redux/actions/auth'
import { useDispatch } from 'react-redux';
import { useRouter } from "next/router";




const ModalDelete = ({setConfirm}) => {
  const [modal, setModal] = useState(true);
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();


  const toggle = () => {
    setModal(!modal);
    setConfirm(false);
  }
  const handleChange = (event) => {
    setPassword(event.target.value);
}

   const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(
          deleteUser(password, (response) => {
                if (!response.prompt) {
                    router.push('/')
                } else {
                    console.error(response.prompt)
                }
            })
        );
    }

  return (
    <Modal
      isOpen={modal}
      toggle={toggle}
      className="theme-modal modal-lg"
      centered
    >
      <div>
        <ModalBody className="modal1">
          <Row className="compare-modal">
            <Col lg="12">
              <div className="modal-bg">
                <Button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={toggle}
                >
                  <span aria-hidden="true">&times;</span>
                </Button>
                <div className="offer-content">
                  <h2>Do you really want to delete your user?</h2>
                  <Form
                  onSubmit={handleSubmit}
                    className="auth-form needs-validation"
                    id="mc-embedded-subscribe-form"
                  >
                    <div className="form-group mx-sm-3">
                      <Input
                        type="password"
                        className="form-control"
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        required="required"
                        onChange={handleChange}
                        value={password}
                      />
                      <Button
                        type="submit"
                        className="btn btn-solid"
                        id="mc-submit"
                      >
                        Confirm
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
        </ModalBody>
      </div>
    </Modal>
  );
};

export default ModalDelete;
