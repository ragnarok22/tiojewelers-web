import React from 'react';
import { Col, Media } from 'reactstrap';
import sideBanner from '../../../public/assets/images/side-banner.png';
import NewProduct from './newProduct';
import Category from './category';
import Vendor from './vendor'
import Tags from './tags'
import Price from './price';

const FilterPage = ({sm,sidebarView,closeSidebar}) => {
    return (
        <>
            <Col sm={sm} className="collection-filter" style={sidebarView ? {left:"0px"} : {}}>
                {/* <!-- side-bar colleps block stat --> */}
                <div className="collection-filter-block">
                    {/* <!-- brand filter start --> */}
                    <div className="collection-mobile-back" onClick={() => closeSidebar()}>
                        <span className="filter-back">
                            <i className="fa fa-angle-left" aria-hidden="true"></i> back
                        </span>
                    </div>
                    {/* <Availability/> */}
                    <Vendor/>
                    <Category />
                    <Tags />
                    {/* <Size/> */}
                    {/* <Discount/> */}
                    <Price />
                </div>
                {/* <!-- silde-bar colleps block end here -->*/}
                <NewProduct />
                {/* <!-- side-bar banner start here -->  */}
                <div className="collection-sidebar-banner">
                    <a href={null}><Media src={'/assets/images/tiojewelers/logo2.png'} className="img-fluid blur-up lazyload" alt="" /></a>
                </div>
                {/* <!-- side-bar banner end here --> */}
            </Col>
        </>
    )
}

export default FilterPage;