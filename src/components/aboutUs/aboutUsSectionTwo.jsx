import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ModalVideo from "react-modal-video";
import { useState } from "react";


const defaultData = {
  titleSectionData: {
    subTitle: "Building Facilities",
    title: "Making living spaces More Beautiful",
    description: "Over 39,000 people work for us in more than 70 countries all over the This breadth of global coverage, combined with specialist services",
  },
  showVideo: true,
  list: [
    {
      title: "Living rooms are pre-wired for Surround",
      icon: "icon-done",
    },
    {
      title: "Luxurious interior design and amenities",
      icon: "icon-done",
    },
    {
      title: "Nestled in the Buckhead Vinings communities",
      icon: "icon-done",
    },
    {
      title: "Private balconies with stunning views",
      icon: "icon-done",
    },
    {
      title: "A rare combination of inspired architecture",
      icon: "icon-done",
    },
    {
      title: "Outdoor grilling with dining court",
      icon: "icon-done",
    },

  ],
  leftImage: "https://quarter-nextjs.vercel.app/img/about/1.jpg",
}

function AboutUsSectionTwo({ data = defaultData }) {
  console.log({ data });
  const [isOpen, setOpen] = useState(false);
  const { titleSectionData, showVideo, list, leftImage } = data;
  const { subTitle, title, description } = titleSectionData;

  return (
    <>
      {showVideo && (
        <ModalVideo
          channel="youtube"
          autoplay
          isOpen={isOpen}
          videoId="HnbMYzdjuBs"
          onClose={() => setOpen(false)}
        />
      )}
      <Container>
        <Row>
          <Col xs={12} lg={6} className="align-self-center">
            <div className="about-us-info-wrap">
              <div className="section-title-area mb-20">
                <h6 className="section-subtitle ltn__secondary-color">
                  {subTitle}
                </h6>
                <h1 className="section-title">{title}</h1>
                {description && <p>{description}</p>}
              </div>
              {showVideo && (
                <div className="  ltn__animation-pulse2 text-center mt-30">
                  <button
                    className="ltn__video-play-btn bg-white--- ltn__secondary-bg"
                    onClick={() => setOpen(true)}
                  >
                    <i className="icon-play white-color"></i>
                  </button>
                </div>
              )}
              <ul className="ltn__list-item-half ltn__list-item-half-2 list-item-margin clearfix">
                {list.map((item, index) => (
                  <li key={item.title} className="d-flex align-items-start">
                    <i className={item.icon}></i>
                    {item.shortDescription && item.title ? (
                      <div className="ltn__list-item-half-content">
                        <h5 >{item.title}</h5>
                        <p>{item.shortDescription}</p>
                      </div>
                    ) : item.title}

                  </li>
                ))}


              </ul>
              {showVideo && (
                <div className="  ltn__animation-pulse2 text-center mt-30">
                  <button
                    className="ltn__video-play-btn bg-white--- ltn__secondary-bg"
                    onClick={() => setOpen(true)}
                  >
                    <i className="icon-play white-color"></i>
                  </button>
                </div>
              )}
            </div>
          </Col>
          <Col xs={12} lg={6}>
            {leftImage && (
              <div style={{ backgroundImage: `url(${leftImage})` }} className="about-us-img-wrap about-img-left"></div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AboutUsSectionTwo;
