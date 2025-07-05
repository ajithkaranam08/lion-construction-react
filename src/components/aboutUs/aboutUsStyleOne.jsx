import Link from "next/link";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaPlay } from "react-icons/fa";
import ModalVideo from "react-modal-video";
import { useState } from "react";
function AboutUsStyleOne({ sectionSpace, data }) {
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
          <Row className={`${data?.reverse ? 'flex-row-reverse' : ''}`}>
            <Col xs={12} lg={6} >
              {data?.image && (
                <div className="about-us-img-wrap about-img-left">
                  <img src={`${data?.relativePath ? data?.image : `/img/banner/${data?.image}`}`} alt="About Us Image" />
                  {/* <div className="about-us-img-info about-us-img-info-2 about-us-img-info-3">
                  <div className="ltn__video-img ltn__animation-pulse1">
                    <img src="/img/others/8.png" alt="video popup bg image" />
                    <button
                      onClick={() => setOpen(true)}
                      className="ltn__video-icon-2"
                    >
                      <FaPlay />
                    </button>
                  </div>
                </div> */}
                </div>
              )}
            </Col>
            <Col xs={12} lg={6}>
              <div className="about-us-info-wrap">
                <div className="section-title-area mb-20">
                  <h6 className=" section-subtitle-2 ltn__secondary-color">
                    {data.subtitle}
                  </h6>
                  <h1 className="section-title">
                    {data.Title}<span>.</span>
                  </h1>
                  {data.descriptions?.map((description, index) => (
                    <>
                      {index ? <><br /> </> : null}
                      <p key={index}>{description}</p>
                    </>
                  ))}

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
