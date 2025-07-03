import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";

const HomeContactCTA = ({ backgroundImage = "/img/banner/home-contact.webp" }) => {
  return (
    <div
      className="ltn__call-to-action-area ltn__call-to-action-4 bg-image pt-115 pb-120"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <Container>
        <Row>
          <Col xs={12}>
            <div className="call-to-action-inner call-to-action-inner-4 text-center">
              <div className="section-title-area ltn__section-title-2">
                <h6 className="section-subtitle ltn__secondary-color">{`Need a reliable builder? We're here for you`}</h6>
                <h1 className="section-title">Call Now: 897-876-987-90</h1>
              </div>
              <p>Whether it is a new home or a makeover, we're ready to help.Honest work. Lasting results</p>
              <div className="btn-wrapper">
                <Link
                  href="tel:+123456789"
                  className="theme-btn-1 btn btn-effect-1"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      {/* <div className="ltn__call-to-4-img-1">
        <img src="/img/slider/21.png" alt="#" />
      </div> */}
      <div className="ltn__call-to-4-img-2">
        <img src="/img/bg/11.png" alt="#" />
      </div>
    </div>
  );
};

export default HomeContactCTA; 