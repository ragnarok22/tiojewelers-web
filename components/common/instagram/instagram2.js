import React from "react";
import Slider from "react-slick";
import { Row, Col, Container } from "reactstrap";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Slider5 } from "../../../services/script";


const Instagram = ({ type }) => {

  const instagram = [
    {
      img: '/assets/images/tiojewelers/Intagram/1.png'
    },
    {
      img: '/assets/images/tiojewelers/Intagram/2.png'
    },
    {
      img: '/assets/images/tiojewelers/Intagram/3.png'
    },
    {
      img: '/assets/images/tiojewelers/Intagram/4.png'
    },
    {
      img: '/assets/images/tiojewelers/Intagram/5.png'
    },
    {
      img: '/assets/images/tiojewelers/Intagram/6.png'
    },
    {
      img: '/assets/images/tiojewelers/Intagram/7.png'
    },
    {
      img: '/assets/images/tiojewelers/Intagram/8.png'
    },
    {
      img: '/assets/images/tiojewelers/Intagram/9.png'
    },
    {
      img: '/assets/images/tiojewelers/Intagram/10.png'
    },
    {
      img: '/assets/images/tiojewelers/Intagram/11.png'
    },
    {
      img: '/assets/images/tiojewelers/Intagram/12.png'
    },
    {
      img: '/assets/images/tiojewelers/Intagram/13.png'
    },
  ]

  return (
    <Container>
      <Row>
        <Col md="12">
          <h2 className="title-borderless"># instagram</h2>
          <Slider {...Slider5} className="slide-5 no-arrow slick-instagram">
            {instagram.map((data, i) => (
                <div key={i}>
                  <a href={null}>
                    <div className="instagram-box">
                      <img
                        src={data.img}
                        className="bg-img"
                        alt="Avatar"
                        style={{ width: "100%" }}
                      />
                      <div className="overlay">
                        <i className="fa fa-instagram" aria-hidden="true"></i>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
          </Slider>
        </Col>
      </Row>
    </Container>
  );
};

export default Instagram;
