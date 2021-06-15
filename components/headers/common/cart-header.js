import React, { Fragment, useContext } from "react";
import Link from "next/link";
import CartContext from "../../../helpers/cart";
import { Media } from "reactstrap";
import defaultImage from '../../../public/assets/images/tiojewelers/default-image.png';


const CartHeader = ({ item, symbol }) => {
  const context = useContext(CartContext);

  return (
    <Fragment>
      <li>
        <div className="media">
          <Link href={"/page/account/cart"}>
            <a>
              <Media alt="" className="mr-3" src={item?.photos.length > 0 && item.photos[0].path || defaultImage} />
            </a>
          </Link>
          <div className="media-body">
            <Link href={"/page/account/cart"}>
              <a>
                <h4>{item.title}</h4>
              </a>
            </Link>

            <h4>
              <span>
                {item.qty} x {symbol}{" "}
                {(item.price).toFixed(2)}
                {/* {(item.price  - (item.price * item.discount) / 100).toFixed(2)} */}
              </span>
            </h4>
          </div>
        </div>
        <div className="close-circle">
          <i
            className="fa fa-times"
            aria-hidden="true"
            onClick={() => context.removeFromCart(item)}
          ></i>
        </div>
      </li>
    </Fragment>
  );
};

export default CartHeader;
