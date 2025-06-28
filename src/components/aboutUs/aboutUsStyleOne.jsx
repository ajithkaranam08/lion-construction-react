import Link from "next/link";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaPlay } from "react-icons/fa";
import ModalVideo from "react-modal-video";
import { useState } from "react";
function AboutUsStyleOne({ sectionSpace }) {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId="X7R-q9rsrtU"
        onClose={() => setOpen(false)}
      />
      <div className={`ltn__about-us-area ${sectionSpace}`}>
        <Container>
          <Row>
            <Col xs={12} lg={6} className="align-self-center">
              <div className="about-us-img-wrap about-img-left">
                <img src="/img/others/7.png" alt="About Us Image" />
                <div className="about-us-img-info about-us-img-info-2 about-us-img-info-3">
                  <div className="ltn__video-img ltn__animation-pulse1">
                    <img src="/img/others/8.png" alt="video popup bg image" />
                    <button
                      onClick={() => setOpen(true)}
                      className="ltn__video-icon-2"
                    >
                      <FaPlay />
                    </button>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={12} lg={6} className="align-self-center">
              <div className="about-us-info-wrap">
                <div className="section-title-area mb-20">
                  <h6 className="section-subtitle section-subtitle-2 ltn__secondary-color">
                    About Us
                  </h6>
                  <h1 className="section-title">
                  Best Construction Company in Chennai - For Quality Builds<span>.</span>
                  </h1>
                  <p>
                  Lion Construction is proud to be recognized as one of the best construction company in Chennai. We provide top-quality services to meet all your construction needs. With a team of skilled professionals, we ensure every project is completed with precision, quality, and attention to detail. Our goal is to deliver outstanding results on time and within budget.
                  <br />
                  <br />
                  At Lion Construction, we take on all types of construction projects, including residential, commercial, and industrial developments. We also specialize in renovations, extensions, and custom builds tailored to each client’s unique vision. By using advanced technology and premium materials, we create structures that are both strong and visually appealing
                  <br />
                  <br />
                  What sets Lion Construction apart is our commitment to customer satisfaction. We stay open and honest with you from the first meeting to the end of the project. When you choose Lion Construction, you’re partnering with a construction company that truly values trust, quality, and your peace of mind. Trust Lion Construction for your next project and experience why we are Chennai’s top choice for construction<br />
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default AboutUsStyleOne;
