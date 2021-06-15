import React, { useContext, useEffect } from 'react';
import { Container, Row, Col, Table } from 'reactstrap';
import { WishlistContext } from '../../../../helpers/wishlist/WishlistContext';
import CartContext from '../../../../helpers/cart/index';
import { useRouter } from 'next/router';
import Link from 'next/link'
import defaultImage from '../../../../public/assets/images/tiojewelers/default-image.png';
import { BASE_API } from '../../../../config/api/Security';
import { useSelector } from 'react-redux';

const WishlistPage = () => {
    const router = useRouter();
    const context = useContext(WishlistContext)
    const cartContext = useContext(CartContext);

    const { login } = useSelector(state => ({
        login: state.auth.login,
    }))

    useEffect(() => {
        if (!login.isAuthenticated) {
            router.push('/page/account/login');
        }
    }, [])

    const wishlist = context.wishlistItems;
    const removeFromWish = context.removeFromWish;
    const addCart = cartContext.addToCart2;


    const checkOut = () => {
        router.push('/page/account/checkout');
    }
    // Validando agragar al carro
    const handleClickAddToCart = async (product, quantity) => {
        console.log(login.isAuthenticated);
        if (login.isAuthenticated) {
            console.log(login.isAuthenticated);
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
    return (
        <>
            {wishlist.length >= 0
                ?
                <section className="wishlist-section section-b-space">
                    <Container>
                        <Row>
                            <Col sm="12">
                                <Table className="table cart-table table-responsive-xs">
                                    <thead>
                                        <tr className="table-head">
                                            <th scope="col">image</th>
                                            <th scope="col">product name</th>
                                            <th scope="col">price</th>
                                            <th scope="col">availability</th>
                                            <th scope="col">action</th>
                                        </tr>
                                    </thead>
                                    {wishlist.map((item, i) =>
                                        <tbody key={i}>
                                            <tr>
                                                <td>
                                                    <a href="#"><img src={item.photos && item.photos[0].path || defaultImage} alt="" /></a>
                                                </td>
                                                <td><a href="#">{item.title}</a>
                                                    <Row className="mobile-cart-content">
                                                        <div className="col-xs-3">
                                                            <p>out of stock</p>
                                                        </div>
                                                        <div className="col-xs-3">
                                                            <h2 className="td-color">$63.00</h2>
                                                        </div>
                                                        <div className="col-xs-3">
                                                            <h2 className="td-color"><a href="#" className="icon mr-1"><i className="fa fa-close"></i>
                                                            </a><a href="#" className="cart"><i className="fa fa-shopping-cart"></i></a></h2>
                                                        </div>
                                                    </Row>
                                                </td>
                                                <td>
                                                    <h2>${item.price}</h2>
                                                </td>
                                                <td>
                                                    <p>{(item.quantity > 0) ? 'In Stock' : 'out of Stock'}</p>
                                                </td>
                                                <td>
                                                    <a href={null} className="icon" onClick={() => removeFromWish(item)}>
                                                        <i className="fa fa-times"></i>
                                                    </a>
                                                    <a href={null} className="cart" onClick={() => handleClickAddToCart(item, cartContext.quantity)} >
                                                        <i className="fa fa-shopping-cart"></i>
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    )}
                                </Table>
                            </Col>
                        </Row>
                        <Row className="wishlist-buttons">
                            <Col sm="12">
                                <Link href={'/'}><a href={null} className="btn btn-solid" >continue shopping</a></Link>
                                <a href={null} className="btn btn-solid" onClick={checkOut}>check out</a>
                            </Col>
                        </Row>
                    </Container>
                </section>
                : ''}

        </>
    )
}

export default WishlistPage;