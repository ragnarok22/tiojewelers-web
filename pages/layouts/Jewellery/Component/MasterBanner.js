import Link from "next/link";
import { Col, Container, Row } from "reactstrap";
import { useTranslation } from "react-i18next";

const MasterBanner = ({ img, title, desc, link, classes, btn, btnClass }) => {
  const { t } = useTranslation();

  return (
    <div>
      <div className={`home ${img} ${classes ? classes : "text-center"}`}>
        <Container>
          <Row>
            <Col>
              <div className="slider-contain ">
                <div>
                  <h4 className="d-none d-lg-block">{t(title)}</h4>
                  <h1 className="d-none d-sm-block">{desc}</h1>
                  <Link href={link}>
                    <a className={`btn btn-solid ${btnClass ? btnClass : ""}`}>
                      {btn ? t(btn) : "Shop Now"}{" "}
                    </a>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default MasterBanner;
