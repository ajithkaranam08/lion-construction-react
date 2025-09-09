import Link from "next/link";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaPlay } from "react-icons/fa";
import ModalVideo from "react-modal-video";
import { useState } from "react";
function AboutUsStyleOne({ sectionSpace, data , minHeight = true }) {
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
                <div className="about-us-img-wrap about-img-left h-100">
                  <img loading="lazy" width={600} height={600} src={`${data?.relativePath ? data?.image : `/img/banner/${data?.image}`}`} alt="About Us Image" className={`${minHeight ? 'img-align-height' : ''}`} />
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
                  {data.subtitle &&
                    <h6 className=" section-subtitle-2 ltn__secondary-color">
                      {data.subtitle}
                    </h6>
                  }
                  <h1 className="section-title">
                    {data?.titleSpan ?
                      <>
                        <span>{data.titleSpan}</span>
                      </>
                      : <>
                        {data.Title}
                        {/* <span>.</span> */}
                      </>
                    }
                  </h1>
                  {data.descriptions?.map((description, index) => (
                    <>
                      {index ? <><br /> </> : null}
                      <p key={index}>{description}</p>
                    </>
                  ))}

                </div>



                {data?.list?.length ? <ul className="ltn__list-item-half clearfix">
                  {data.list?.map((item, index) => (
                    <li key={index}>
                      <i className={item.icon}></i>
                      {item.title}
                    </li>
                  ))}
                </ul> : null}

                {/* <div className="ltn__callout bg-overlay-theme-05  mt-30">
                  <p>
                    Enimad minim veniam quis nostrud exercitation <br />
                    llamco laboris. Lorem ipsum dolor sit amet Lion Construction is proud to be recognized as one of the best construction company in Chennai. We provide top-quality services to meet all your construction needs. With a team of skilled professionals, we ensure every project is completed with precision, quality, and attention to detail. Our goal is to deliver outstanding results on time and within budget.
                    <br />
                    <br />
                    At Lion Construction, we take on all types of construction projects, including residential, commercial, and industrial developments. We also specialize in renovations, extensions, and custom builds tailored to each client’s unique vision. By using advanced technology and premium materials, we create structures that are both strong and visually appealing
                    <br />
                    <br />
                    What sets Lion Construction apart is our commitment to customer satisfaction. We stay open and honest with you from the first meeting to the end of the project. When you choose Lion Construction, you’re partnering with a construction company that truly values trust, quality, and your peace of mind. Trust Lion Construction for your next project and experience why we are Chennai’s top choice for construction<br />
                  </p>
                </div>

                <div className="btn-wrapper animated">
                  <Link
                    href="/service"
                    className="theme-btn-1 btn btn-effect-1"
                  >
                    OUR SERVICES
                  </Link>
                </div> */}


              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default AboutUsStyleOne;
