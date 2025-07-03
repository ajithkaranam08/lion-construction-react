import Link from "next/link";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TitleSection from "@/components/titleSection";
import { productSlug } from "@/lib/product";
import Slider from "react-slick";

function Feature({
  data,
  iconTag,
  servicebtn,
  titleSectionData,
  classes,
  headingClasses,
}) {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className={`ltn__feature-area pt-115 pb-90 contact-us-banner ${classes}`}>
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
          <Slider {...sliderSettings} className="feature-slider">
            {data.map((item, key) => {
              const slug = productSlug(item.title);
              return (
                <div key={key}>
                  <div
                    className={`ltn__feature-item ltn__feature-item-6 text-center bg-white  box-shadow-1 ${item.active ? "active" : ""
                      }`}
                  >
                    <div className="ltn__feature-icon d-flex justify-content-center">
                      {iconTag ? (
                        <span>
                          <i className={`${item.icon}`}></i>
                        </span>
                      ) : (
                        <img
                          src={`/img/icons/icon-img/${item.img}`}
                          alt={`${item.title}`}
                        />
                      )}
                    </div>
                    <div className="ltn__feature-info">
                      <h3>
                        <Link href={`/service/${slug}`}>{item.title}</Link>
                      </h3>
                      <p title={item.shortDescription} className="line-clamp-2">{item.shortDescription}</p>

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
