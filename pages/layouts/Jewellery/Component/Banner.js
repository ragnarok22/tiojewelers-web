import React, { Fragment } from "react";
import Slider from "react-slick";
import MasterBanner from "./MasterBanner";

const Data = [
  {
    img: "home47",
    title: "DESIGN YOUR OWN ENGAGEMENT RING",
    desc: "Tio Jewelers",
    link: "/shop/custom_product",
    classes: "text-center bg-size blur-up lazyloaded",
    buttonName: 'Design yourself'
  },
  {
    img: "home48",
    title: "ELEGANT PIECES YOU'LL KEEP FOREVER",
    desc: "Tio Jewelers",
    link: "#",
    classes: "text-center bg-size blur-up lazyloaded p-left",
    buttonName: 'Shop'
  },
];

const Banner = () => {
  return (
    <Fragment>
      <section className="p-0 height-100">
        <div className="home-slider">
          <Slider>
            {Data.map((data, i) => {
              return (
                <MasterBanner
                  key={i}
                  img={data.img}
                  link={data.link}
                  title={data.title}
                  desc={data.desc}
                  classes={data.classes}
                  btn ={ data.buttonName }
                />
              );
            })}
          </Slider>
        </div>
      </section>
    </Fragment>
  );
};

export default Banner;
