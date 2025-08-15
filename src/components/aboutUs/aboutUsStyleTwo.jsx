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
  subTitle: "",
  title: "Premier and Best Builders in Chennai for Your Dream Home",
  description:
    "We are known as one of the best builders in Chennai, always focused on QCT delivering top-Quality results within optimal Costs and committed Timelines.",
  image: "/img/banner/home-contact-2.jpg",
  list: [
    "Do it Right from First time – We always prefer to doing right thing at first time.",
    "High-Quality Work – We use the Quality materials and excellent workmanship",
    "On-Time Delivery – Every project is finished without delay.",
    "Meeting Customer requirements – We stay in touch and listen and value your ideas.",
    "Smart Project Planning – We use Gantt charts to keep work on track.",
    "Quality Control & Quality Assurance – We always adhered quality check on each activity and ensure complaince with 300+ Quality checks during process.",
    "Progress Updates – You're always informed about the work.",
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
                  {data.subTitle && (
                    <h6 className="section-subtitle section-subtitle-2 ltn__secondary-color">
                      {data.subTitle}
                    </h6>
                  )}

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
                  loading="lazy"
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
