import React from 'react';
import CommonLayout from '../../../components/shop/common-layout';
import CartHistory from './common/cart-history';


const ShoppingHistory = () => {
    return (
        <CommonLayout parent="home" title="history">
            <CartHistory />
        </CommonLayout>
    )
}

export default ShoppingHistory;