import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import { FaHome, FaAngleRight } from "react-icons/fa";

const ShopBreadCrumb = ({ title, currentSlug, sectionPace }) => {
  return (
    <>
      <div
        className={`ltn__breadcrumb-area text-left bg-overlay-white-30 bg-image ${sectionPace}`}
        style={{ backgroundImage: `url("../img/bg/14.jpg")` }}
      >
        <Container>
          <Row>
            <Col xs={12} className="px-0">
              <div className="ltn__breadcrumb-inner">
                <h1 className="page-title">{title}</h1>
                <div className="ltn__breadcrumb-list">
                  <ul>
                    <li>
                      <Link href="/">
                        <span>
                          <FaHome className="me-2 mb-1"  />
                        </span>
                        <span className="me-2">Home</span>
                        <FaAngleRight />
                      </Link>
                    </li>
                    <li>{currentSlug}</li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ShopBreadCrumb;
