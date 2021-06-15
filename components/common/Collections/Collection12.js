import React, { Fragment, useContext } from "react";
import { Container } from "reactstrap";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import CartContext from "../../../helpers/cart";
import Masonry from "react-masonry-css";
import { WishlistContext } from "../../../helpers/wishlist/WishlistContext";
import ProductBox from "../product-box/ProductBox9";
import { CompareContext } from "../../../helpers/Compare/CompareContext";
import context from "react-bootstrap/esm/AccordionContext";
import axios from "axios";
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux'
const GET_PRODUCTS = gql`
  query products($type: _CategoryType!, $indexFrom: Int!, $limit: Int!) {
    products(type: $type, indexFrom: $indexFrom, limit: $limit) {
      items {
        id
        title
        description
        type
        brand
        category
        price
        new
        sale
        stock
        discount
        variants {
          id
          sku
          size
          color
          image_id
        }
        images {
          image_id
          id
          alt
          src
        }
      }
    }
  }
`;

const ProductsCollection = ({ type, col }) => {
  const cartContext = useContext(CartContext);
  const wishlistContext = useContext(WishlistContext);
  const compareContext = useContext(CompareContext);
  const quantity = cartContext.quantity;
  const router = useRouter();

  const { login } = useSelector(state => ({
    login: state.auth.login,
  }))

  var { data } = useQuery(GET_PRODUCTS, {
    variables: {
      type: type,
      indexFrom: 0,
      limit: 20,
    },
  });
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
    <Fragment>
      <section className="portfolio-section portfolio-padding metro-section port-col">
        <Container fluid={col == "full"}>
          <Masonry
            breakpointCols={col == "metro" ? 4 : 6}
            className="isotopeContainer row"
            columnClassName={`isotopeSelector ${col == "metro"
              ? "col-xl-3 col-sm-6"
              : "col-xl-2 col-lg-3 col-md-4 col-sm-6"
              }`}
          >
            {data &&
              data.products.items
                .slice(0, 20)
                .map((product, index) => (
                  <ProductBox
                    product={product}
                    addCart={() => handleClickAddToCart(product, quantity)}
                    addWish={() => wishlistContext.addToWish(product)}
                    addCompare={() => compareContext.addToCompare(product)}
                    key={index}
                  />
                ))}
          </Masonry>
        </Container>
      </section>
    </Fragment>
  );
};

export default ProductsCollection;
