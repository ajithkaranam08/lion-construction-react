import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";

const callToActionstyleTwo = () => {
  return (
    <>
      <div
        className="ltn__call-to-action-area ltn__call-to-action-4 bg-image pt-115 pb-120"
        style={{ backgroundImage: `url("../img/banner/home-contact.webp")` }}
      >
        <Container>
          <Row>
            <Col xs={12}>
              <div className="call-to-action-inner call-to-action-inner-4 text-center">
                <div className="section-title-area ltn__section-title-2">
                  <h6 className="section-subtitle text-white">{`//  Looking for a Reliable Construction Partner?  //`}</h6>
                  <div className="text-white">
                  We bring your vision to life with precision, quality, and commitment.
                  </div>
                  <h1 className="section-title white-color">897-876-987-90</h1>
                </div>
                <div className="btn-wrapper">
                  <Link
                    href="/contact"
                    className="theme-btn-1 btn btn-effect-1"
                  >
                    CONTACT US
                  </Link>
                  {/* <Link
                 
                    className="btn btn-transparent btn-effect-3 white-color"
                  >
                   
                  </Link> */}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <div className="ltn__call-to-4-img-1">
          <img src="/img/banner/home-banner.png" alt="home-banner" />
        </div>
        <div className="ltn__call-to-4-img-2">
          <img src="/img/bg/11.png" alt="#" />
        </div>
      </div>
    </>
  );
};

export default callToActionstyleTwo;
