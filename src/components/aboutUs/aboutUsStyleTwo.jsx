import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Lightbox from "yet-another-react-lightbox";
import PhotoAlbum from "react-photo-album";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Download from "yet-another-react-lightbox/plugins/download";

function AboutUsStyleTwo({ sectionSpace }) {
  const [index, setIndex] = useState(-1);

  const slides = [
    {
      src: "/img/banner/home-contact-2.jpg",
      width: 800,
      height: 570,
    },
    {
      src: "/img/banner/home-contact-2.jpg",
      width: 800,
      height: 570,
    },
    {
      src: "/img/banner/home-contact-2.jpg",
      width: 800,
      height: 570,
    },
  ];

  return (
    <>
      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={slides}
        plugins={[Zoom, Counter, Fullscreen, Download]}
      />

      <div className={`ltn__about-us-area ${sectionSpace}`}>
        <Container>
          <Row>
            <Col xs={12} lg={6} className="align-self-center">
              <div className="about-us-info-wrap">
                <div className="section-title-area ltn__section-title-2--- mb-30">
                  <h6 className="section-subtitle section-subtitle-2 ltn__secondary-color">
                  CONTACT US
                  </h6>
                  <h1 className="section-title">Premier and Best Builders in Chennai for Your Dream Home</h1>
                  <p>
                  We are known as one of the best builders in Chennai, always focused on giving top-quality construction on time
                  </p>
                </div>
                <ul className="ltn__list-item-1 ltn__list-item-1-before clearfix">
                  <li>High-Quality Work – We use the best materials and build with care</li>
                  <li>On-Time Delivery – Every project is finished without delay.</li>
                  <li>We Understand Your Needs – We stay in touch and listen to your ideas.</li>
                  <li>Smart Project Planning – We use Gantt charts to keep work on track.</li>
                  <li>Regular Progress Updates – You’re always informed about the work.</li>
                  <li>Strict Quality Checks – We check every step to ensure top quality.</li>
                </ul>
              </div>
            </Col>
            <Col xs={12} lg={6} className="align-self-center">
              <div className="about-us-img-wrap about-img-right">
                <img src="/img/banner/home-contact-2.jpg" alt="About Us Image" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default AboutUsStyleTwo;
