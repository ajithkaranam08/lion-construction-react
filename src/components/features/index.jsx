import Link from "next/link";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TitleSection from "@/components/titleSection";
import { productSlug } from "@/lib/product";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import IconRenderer from "../icons/iconsRender";

function Feature({
  data,
  iconTag,
  servicebtn,
  titleSectionData,
  classes,
  headingClasses,
  minHeight = 415
}) {
  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <button
      {...props}
      className={
        "slick-prev slick-arrow" + (currentSlide === 0 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === 0 ? true : false}
      type="button"
    >
      <FaArrowLeft />
    </button>
  );
  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <button
      {...props}
      className={
        "slick-next slick-arrow" +
        (currentSlide === slideCount - 1 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === slideCount - 1 ? true : false}
      type="button"
    >
      <FaArrowRight />
    </button>
  );

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SlickArrowRight />,
    prevArrow: <SlickArrowLeft />,
    autoplay: true,
    adaptiveHeight: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    pauseOnFocus: true,
    pauseOnDotsHover: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          arrows: false,
          slidesToShow: 2,
          autoplay: true,
          autoplaySpeed: 3000,
          pauseOnHover: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          arrows: false,
          slidesToShow: 1,
          autoplay: true,
          autoplaySpeed: 3000,
          pauseOnHover: true,
        },
      },
    ],
  };

  return (
    <>
      <div
        className={`ltn__feature-area pt-50 pb-50 contact-us-banner slick-slide-p ${classes}`}
      >
        <Container>
          <Row>
            <Col xs={12}>
              <TitleSection
                titleSectionData={titleSectionData}
                sectionClasses={titleSectionData.sectionClasses}
                headingClasses={headingClasses}
              />
            </Col>
          </Row>
          <Slider 
            {...sliderSettings}
            className="ltn__upcoming-project-slider-1-active slick-arrow-1"
          >
            {data.map((item, key) => {
              const slug = productSlug(item.title);
              return (
                <div key={key}>
                  <div
                    style={{ minHeight}}
                    className={`ltn__feature-item ltn__feature-item-6 text-center bg-white  box-shadow-1 ${
                      item.active ? "active" : ""
                    }`}
                  >
                    <div className="ltn__feature-icon d-flex justify-content-center">
                      {iconTag ? (
                        item?.from === "react-icon" ? (
                          <IconRenderer name={item.icon} className="no-size ltn__primary-color" size={68} />
                        ) : (
                          <i className={`${item.icon}`}></i>
                        )
                      ) : (
                        <img
                        width={100}
                        height={100}
                          style={{ filter: "invert(100%) sepia(18%) saturate(7330%) hue-rotate(325deg) brightness(91%) contrast(84%)"}}
                          src={`/img/icons/icon-img/${item.img}`}
                          alt={`${item.title}`}
                        />
                      )}
                    </div>
                    <div className="ltn__feature-info">
                      <h3>
                        <span>{item.title}</span>
                      </h3>
                      <p title={item.shortDescription} className="">
                        {item?.shortDescription.split("\n").map((line, idx) => (
                          <span key={idx}>
                            {line}
                            <br />
                          </span>
                        ))}
                      </p>

                      {/* {servicebtn ? (
                        <Link
                          className="ltn__service-btn"
                          href={`/service/${slug}`}
                        >
                          {item.buttonText}

                          <i className="flaticon-right-arrow"></i>
                        </Link>
                      ) : (
                        ""
                      )} */}
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </Container>
      </div>
    </>
  );
}

export default Feature;
