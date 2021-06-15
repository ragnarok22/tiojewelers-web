import React, { useState, useEffect, useContext } from "react";

import Link from "next/link";
import NavBar from "./common/navbar";
import { Media, Row, Col, Container } from "reactstrap";
import search from "../../public/assets/images/jewellery/icon/search.png";
import heart from "../../public/assets/images/jewellery/icon/heart.png";
import avatar from "../../public/assets/images/jewellery/icon/avatar.png";
import Currency from "./common/currency";
import cart from "../../public/assets/images/jewellery/icon/cart.png";
import settings from "../../public/assets/images/jewellery/icon/controls.png";
import CartContainer from "../containers/CartContainer";
import SearchOverlay from "./common/search-overlay";
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/actions/auth'
import { useRouter } from "next/router";
import i18next from "../../components/constant/i18n";
import CartContext from "../../helpers/cart";

const HeaderSeven = ({ logoName }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(function () {
      document.querySelectorAll(".loader-wrapper").style = "display:none";
    }, 2000);
  }, []);

  const openSearch = () => {
    document.getElementById("search-overlay").style.display = "block";
  };

  const { login, user } = useSelector(state => ({
    login: state.auth.login,
    user: state.auth.user
  }))
  const context = useContext(CartContext)

  return (
    <>
      <header className="header-5">
        <div className="mobile-fix-option"></div>
        <Container>
          <Row>
            <Col sm="12">
              <div className="main-menu">
                <div className="menu-left">
                  {/* <div className="brand-logo">
                    <LogoImage logo={logoName} />
                  </div> */}
                </div>
                <div className="menu-right pull-right">
                  <div>
                    <nav id="main-nav">
                      <NavBar />
                    </nav>
                  </div>
                  <div className="top-header">
                    <ul className="header-dropdown">
                      {
                        login.isAuthenticated &&
                        <li className="mobile-wishlist">
                          <Link href="/page/account/wishlist">
                            <a>
                              <Media src={heart} alt="" />
                            </a>
                          </Link>
                        </li>
                      }
                      <li className="onhover-dropdown mobile-account" >
                        <Media src={!login.isAuthenticated ? avatar : user.photo || avatar} alt="" style={{ height: 25, width: 25 }} className="rounded-circle" />
                        <ul className="onhover-show-div" style={{ width: 190 }}>

                          {
                            !login.isAuthenticated
                              ? <>
                                <li>
                                  <Link href="/page/account/login">
                                    <a data-lng="en">Login</a>
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/page/account/register">
                                    <a data-lng="en">Register</a>
                                  </Link>
                                </li>
                              </>
                              :
                              <>
                                <li>
                                  <Link href="/page/account/profile">
                                    <a data-lng="en" >Profile</a>
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/page/account/change-password">
                                    <a data-lng="en" >Change Password</a>
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/page/account/history">
                                    <a data-lng="en" >Shopping History</a>
                                  </Link>
                                </li>
                                {
                                  !user.isActive &&
                                  <li>
                                    <Link href="/page/account/activate-account">
                                      <a data-lng="en" >Activate Account</a>
                                    </Link>
                                  </li>
                                }
                                <li>
                                  <Link href="/">
                                    <a data-lng="en" onClick={() => {
                                      dispatch(
                                        logout((response) => {
                                          if (!response.prompt) {
                                            context.setCartItems({
                                              "amount": 0,
                                              "id": 0,
                                              "status": "",
                                              "sendStatus": "",
                                              "createdAt": "",
                                              "updatedAt": "",
                                              "userId": 0,
                                              "products": []
                                            })
                                            i18next.changeLanguage(response.lang);
                                            router.push('/')
                                          } else {
                                            console.error(response.prompt)
                                          }
                                        })
                                      );
                                    }}>Logout</a>
                                  </Link>
                                </li>
                              </>
                          }
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <div className="icon-nav">
                      <ul>
                        {/* <li className="onhover-div mobile-search">
                          <div>
                            <Media
                              src={search}
                              onClick={openSearch}
                              className="img-fluid"
                              alt=""
                            />
                          </div>
                        </li> */}
                        <Currency icon={settings} />
                        <CartContainer icon={cart} />
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </header>
      <SearchOverlay />
    </>
  );
};

export default HeaderSeven;
