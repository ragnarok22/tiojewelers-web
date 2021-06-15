import React, { Fragment, useEffect, useState } from "react";
import Slider from "react-slick";
import {
  Slider6
} from "../../../../services/script";
import { Container, Row, Col } from "reactstrap";
import {
  getCategories as getTypesApi,
  getProducts as getTypePhoto,
} from '../../../../config/api/products'
import Link from "next/link";
const MasterCategory = ({ img, title, desc, link }) => {
  return (
    <div className="category-block">
      <div className="category-image svg-image">
        <img src={img} alt="" height={55} width={55} />
      </div>
      <div className="category-details">
        <a href={link}>
          <h5>{title}</h5>
        </a>
        <h6>{desc}</h6>
      </div>
    </div>
  );
};

const Category = () => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data: typesApi } = await getTypesApi();
        const { data: pPhotoId } = await getTypePhoto();
        let typesApinew = typesApi.map((item) => {
          let cat = pPhotoId.filter((photo) => photo.productTypeId === item.id);
          return { ...item, photoId: cat[0]?.photos[0].path, total: cat.length }
        })
        setTypes(typesApinew);
      } catch (error) {
        console.error(error);
      }
    }
    getProducts();
  }, []);

  return (
    <Fragment>
      <Container>
        <section className="section-b-space border-section border-top-0">
          <Row>
            <Col>
              <Slider {...Slider6} className="slide-6 no-arrow">
                {types.map((data, i) => {
                  return (
                    <MasterCategory
                      key={i}
                      img={data.photoId}
                      link={`/shop/left_sidebar?vendor=&tags=&productType=${data.id}&minPrice=&maxPrice=`}
                      title={data.name}
                      desc={data.total}
                    />
                  );
                })}
              </Slider>
            </Col>
          </Row>
        </section>
      </Container>
    </Fragment>
  );
};

export default Category;
