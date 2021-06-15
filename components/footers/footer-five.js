import React, { Fragment, useEffect, useState, useRef } from "react";
import CopyRight from "./common/copyright";
import { Container, Col, Row, Collapse } from "reactstrap";
import { } from "../../services/script";
import LogoImage from "./../headers/common/logo";
import { subscription } from '../../redux/actions/auth';
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next";


const FooterFive = ({ layoutClass, logoName }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState();
  const [collapse, setCollapse] = useState(0);
  const width = window.innerWidth < 750;
  useEffect(() => {
    const changeCollapse = () => {
      if (window.innerWidth < 750) {
        setCollapse(0);
        setIsOpen(false);
      } else setIsOpen(true);
    };

    window.addEventListener("resize", changeCollapse);

    return () => {
      window.removeEventListener('resize', changeCollapse)
    }
  }, []);

  const subscribe = useRef(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    subscription(subscribe.current.value, (response) => {
      if (!response.prompt) {
        toast.success(t('You Subscribed Successfully'));
      } else {
        toast.warning(t(`${response.prompt}`));
      }
  })
  subscribe.current.value = '';
  }

  return (
    <Fragment>
      <footer className="jewel-footer">
        <div className="white-layout">
          <section className="p-0 ">
            <Container fluid={true}>
              <Row className="footer-theme2 section-light footer-border">
                <Col>
                  <div className=" footer-block">
                    <div className="footer-container">
                      <div
                        className={`footer-title ${isOpen && collapse == 1 ? "active" : ""
                          }  footer-mobile-title`}
                      >
                        <h4
                          onClick={() => {
                            setCollapse(1);
                            setIsOpen(!isOpen);
                          }}
                        >
                          about
                          <span className="according-menu"></span>
                        </h4>
                      </div>
                      <Collapse
                        isOpen={
                          width ? (collapse === 1 ? isOpen : false) : true
                        }
                      >
                        <div className="footer-contant" >
                          <div className="footer-logo">
                            <LogoImage logo={logoName} />
                          </div>
                          <div className="social-white">
                            <ul>
                              <li>
                                <a
                                  href="https://www.facebook.com/HouseCubanLink/"
                                  target="_blank"
                                >
                                  <i
                                    className="fa fa-facebook"
                                    aria-hidden="true"
                                  ></i>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="https://www.yelp.com/biz/tio-jewelers-cape-coral"
                                  target="_blank"
                                >
                                  <i
                                    className="fa fa-yelp"
                                    aria-hidden="true"
                                  ></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </Collapse>
                    </div>
                  </div>
                </Col>
                <Col className="form-p p-0">
                  <div className="footer-block">
                    <div className="subscribe-white">
                      <h2 className="text-white">Stay in touch</h2>
                      <h6 className="text-black">Subscribe to receive exclusive member updates, specials, product education, and much much more!</h6>
                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <input
                          ref={subscribe}
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput"
                            placeholder="Enter your email"
                          />
                          <button
                            type="submit"
                            className="btn btn-solid black-btn"
                          >
                            subscribe
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className=" footer-block">
                    <div className="footer-container">
                      <div
                        className={`footer-title ${isOpen && collapse == 2 ? "active" : ""
                          } `}
                      >
                        <h4
                          onClick={() => {
                            setCollapse(2);
                            setIsOpen(!isOpen);
                          }}
                        >
                          The Tio Jewelers Creed
                          <span className="according-menu"></span>
                        </h4>
                      </div>
                      <Collapse
                        isOpen={
                          width ? (collapse === 2 ? isOpen : false) : true
                        }
                      >
                        <div className="footer-contant">
                          <ul className="contact-details">
                            <li>
                              110 NE 2nd Pl, #306 Cape Coral Fl 33909
                            </li>
                            <li>Call Us: 239-320-2274</li>
                            <li>
                              Email Us: <a href="#" className="text-lowercase">store@tiojewelerscapecoral.com</a>
                            </li>
                            <li>Mon - Sat: 10am - 6pm, Sun: Closed</li>
                          </ul>
                        </div>
                      </Collapse>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </div>
        <div className="white-layout box-layout">
          <Container>
            <section className="small-section">
              <Row className="footer-theme2">
                <Col>
                  <div className="footer-link link-white">
                    <div
                      className={`footer-title 	${isOpen && collapse == 3 ? "active" : ""
                        } `}
                    >
                      <h4
                        onClick={() => {
                          setCollapse(3);
                          setIsOpen(!isOpen);
                        }}
                      >
                        my account
                        <span className="according-menu"></span>
                      </h4>
                    </div>
                    <Collapse
                      isOpen={width ? (collapse === 3 ? isOpen : false) : true}
                    >
                      <div className="footer-contant">
                        <ul>
                          <li>
                            <a href="#">men</a>
                          </li>
                          <li>
                            <a href="#">women</a>
                          </li>
                          <li>
                            <a href="#">featured</a>
                          </li>
                          <li>
                            <a href="#">service</a>
                          </li>
                          <li>
                            <a href="#">cart</a>
                          </li>
                          <li>
                            <a href="#">my order</a>
                          </li>
                          <li>
                            <a href="#">FAQ</a>
                          </li>
                          <li>
                            <a href="#">new product</a>
                          </li>
                          <li>
                            <a href="#">featured product</a>
                          </li>
                        </ul>
                      </div>
                    </Collapse>
                  </div>
                </Col>
              </Row>
            </section>
          </Container>
        </div>
        <CopyRight layout={layoutClass} />
      </footer>
    </Fragment>
  );
};

export default FooterFive;
