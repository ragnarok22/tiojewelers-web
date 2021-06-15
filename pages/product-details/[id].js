import React from 'react';
import { useRouter } from 'next/router'
import CommonLayout from '../../components/shop/common-layout';
import ProductSection from './common/product_section';
import LeftSidebarPage from './product/leftSidebarPage';

const LeftSidebar = () => {

  const router = useRouter();
  const id = router.query.id;

  return (
    <CommonLayout parent="Home" title="Product">
        <LeftSidebarPage pathId={id} />
      <ProductSection pathId={id}/>
    </CommonLayout>
  );
}


export default LeftSidebar;