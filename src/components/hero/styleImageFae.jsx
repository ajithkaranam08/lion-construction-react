import Link from "next/link";
import Slider from "react-slick";
import { FaHome } from "react-icons/fa";
import { Container, Col, Row } from "react-bootstrap";

function HeroSectionStyleImageFade({ data }) {
  const Herosettings = {
    autoplay: true,
    autoplaySpeed: 8000,
    arrows: false,
    dots: false,
    fade: true,
    cssEase: "linear",
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const textContent = data[0]; // Only use first item for text

  return (
    <div className="hero-wrapper position-relative">
      {/* Background Slider Only */}
      <Slider
        {...Herosettings}
        className="ltn__slide-one-active slick-slide-arrow-1 slick-slide-dots-1"
      >
        {data.map((item, key) => (
          <div key={key}>
            <div
              className="bg-image bg-overlay-theme-black-60 hero-background"
              style={{
                backgroundImage: `url("../img/${item.bgImage}")`,
                height: "100vh", // adjust based on your layout
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </div>
        ))}
      </Slider>

      {/* Static Content from first item */}
      <div
        className={`ltn__slide-item-inner ${
          textContent.variationRight
            ? "text-right text-end"
            : textContent.variationCenter
            ? "text-center"
            : "text-left"
        } position-absolute top-0 w-100 h-100 d-flex align-items-center ltn__slide-item-2`}
      >
        <Container>
          <Row>
            <Col xs={12}>
              <div className="slide-item-info text-white">
                <div className="slide-item-info-inner">
                  <h6 className="slide-sub-title">
                    <span><FaHome /></span> {textContent.subtitle}
                  </h6>
                  <h1 className="slide-title">{textContent.Title}</h1>
                  <div className="slide-brief">
                    <p>{textContent.Desc}</p>
                  </div>
                  <div className="btn-wrapper">
                    <Link
                      href="/about"
                      className="theme-btn-1 btn btn-effect-1"
                    >
                      {textContent.buttonText}
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default HeroSectionStyleImageFade;
