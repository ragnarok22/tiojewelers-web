import React, { useContext, useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Product4 } from '../../../services/script'
import ProductItem from '../product-box/ProductBox1';
import PostLoader from '../PostLoader';
import { Row, Col, Container } from 'reactstrap';
import CartContext from '../../../helpers/cart';
import { WishlistContext } from '../../../helpers/wishlist/WishlistContext';
import { CompareContext } from '../../../helpers/Compare/CompareContext';
import { getPopular as getPopularApi } from '../../../config/api/products';
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';


const TopCollection = ({ type, title, subtitle, designClass, line, noSlider, cartClass, productDetail, noTitle, titleClass, innerTitle }) => {
    const context = useContext(CartContext)
    const contextWishlist = useContext(WishlistContext);
    const contextCompare = useContext(CompareContext);
    const quantity = context.quantity;
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true)

    const router = useRouter();

    const { login } = useSelector(state => ({
        login: state.auth.login,
    }))

    const handleClickAddToCart = async (product, quantity) => {
        if (login.isAuthenticated) {
            try {
                const res = await axios.post(`/carts/${product.id}`, { quantity: quantity }, {
                    validateStatus: (status) => {
                        return status >= 200 && status < 500;
                    }
                })
                if (res.status === 401) {
                    router.push('/page/account/login');
                } else if (res.status === 404) {
                    toast.warning("The product not exist !")
                } else if (res.status === 204) {
                    context.addToCart2(product, quantity);
                }

            } catch (error) {
                console.log(error);
            }
        } else {
            router.push('/page/account/login');
        }
    }
    useEffect(() => {
        const getPopular = async () => {
            try {
                let { data } = await getPopularApi();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error(error);
            }
        }
        getPopular();

    }, [])

    return (
        <>
            <section className={designClass}>
                {noSlider ?
                    <Container>
                        <Row>
                            <Col>
                                {
                                    noTitle ?
                                        ''
                                        :
                                        <div className={titleClass}>
                                            {subtitle ? <h4>{subtitle}</h4> : ''}
                                            <h2 className={innerTitle}>{title}</h2>
                                            {line ?
                                                <div className="line"></div>
                                                : ''}
                                        </div>
                                }

                                {
                                    loading ?
                                        (
                                            <div className="row mx-0 margin-default">
                                                <div className="col-xl-3 col-lg-4 col-6">
                                                    <PostLoader />
                                                </div>
                                                <div className="col-xl-3 col-lg-4 col-6">
                                                    <PostLoader />
                                                </div>
                                                <div className="col-xl-3 col-lg-4 col-6">
                                                    <PostLoader />
                                                </div>
                                                <div className="col-xl-3 col-lg-4 col-6">
                                                    <PostLoader />
                                                </div>
                                            </div>
                                        )
                                        :
                                        (
                                            products && products.length === 0
                                                ?
                                                (<Col xs="12">
                                                    <div>
                                                        <div className="col-sm-12 empty-cart-cls text-center">
                                                            <img
                                                                src={`/assets/images/empty-search.jpg`}
                                                                className="img-fluid mb-4 mx-auto"
                                                                alt=""
                                                            />
                                                            <h3>
                                                                <strong>Your Cart is Empty</strong>
                                                            </h3>
                                                            <h4>Explore more shortlist some items.</h4>
                                                        </div>
                                                    </div>
                                                </Col>
                                                )
                                                :
                                                (<Slider {...Product4} className="product-4 product-m no-arrow">
                                                    {products && products.slice(0, 8).map((product, index) =>
                                                        <div key={index}>
                                                            <ProductItem product={product} productDetail={productDetail}
                                                                addCompare={() => contextCompare.addToCompare(product)}
                                                                addWishlist={() => contextWishlist.addToWish(product)}
                                                                addCart={() => handleClickAddToCart(product, quantity)} key={index} cartClass={cartClass} />

                                                        </div>

                                                    )
                                                    }
                                                </Slider>
                                                ))}
                            </Col>
                        </Row>
                    </Container>
                    :
                    <>
                        <div className="title1 title-gradient  section-t-space">
                            {subtitle ? <h4>{subtitle}</h4> : ''}
                            <h2 className="title-inner1">{title}</h2>
                        </div>
                        <Container>
                            <Row>
                                {data && data.products.items.slice(0, 8).map((product, index) =>
                                    <Col xl="3" sm="6" key={index}>
                                        <div>
                                            <ProductItem product={product} productDetail={productDetail}
                                                addCompare={() => contextCompare.addToCompare(product)}
                                                addWishlist={() => contextWishlist.addToWish(product)}
                                                addCart={() => context.addToCart2(product, quantity)} key={index} />
                                        </div>
                                    </Col>
                                )
                                }
                            </Row>
                        </Container>
                    </>
                }

            </section>
        </>
    )
}


export default TopCollection;