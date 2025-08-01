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
import Image from "next/image";

const defaultData = {
  sectionSpace: "pt-100 pb-100",
  subTitle: "CONTACT US",
  title: "Premier and Best Builders in Chennai for Your Dream Home",
  description:
    "We are known as one of the best builders in Chennai, always focused on giving top-quality construction on time",
  image: "/img/banner/home-contact-2.jpg",
  list: [
    "High-Quality Work – We use the best materials and build with care",
    "On-Time Delivery – Every project is finished without delay.",
    "We Understand Your Needs – We stay in touch and listen to your ideas.",
    "Smart Project Planning – We use Gantt charts to keep work on track.",
    "Regular Progress Updates – You’re always informed about the work.",
    "Strict Quality Checks – We check every step to ensure top quality.",
  ],
  slides: [
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
  ],
};

function AboutUsStyleTwo({ sectionSpace, data = defaultData }) {
  const [index, setIndex] = useState(-1);

  const slides = data?.slides;

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
                    {data.subTitle}
                  </h6>
                  <h1 className="section-title">{data.title}</h1>
                  {data.description && <p>{data.description}</p>}
                </div>
                <ul className="ltn__list-item-1 ltn__list-item-1-before clearfix">
                  {data.list.map((item, index) =>
                    item?.description ? (
                      <li key={index}>
                        <h5 className="mb-2">{item.title}</h5>
                        <p>{item.description}</p>
                      </li>
                    ) : (
                      <li key={index}>{item}</li>
                    )
                  )}
                </ul>
              </div>
            </Col>
            <Col xs={12} lg={6} className="align-self-center">
              <div className="about-us-img-wrap about-img-right">
                <Image
                  src={data.image}
                  alt="About Us Image"
                  className="object-fit-cover"
                  sizes="(min-width: 808px) 50vw, 100vw"
                  width={550}
                  height={550}     
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default AboutUsStyleTwo;
