import React from "react";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TitleSection from "@/components/titleSection";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import AminitiesItemTwo from "@/components/aminities/itemTwo";

function AmenitiesSlider({ data = [], titleSectionData, classes = "" }) {
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
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <SlickArrowRight />,
        prevArrow: <SlickArrowLeft />,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className={`ltn__category-area ltn__product-gutter pt-115 pb-90 ${classes}`}>
            <Container>
                <Row>
                    <Col xs={12}>
                        <TitleSection
                            titleSectionData={titleSectionData}
                            sectionClasses={titleSectionData?.sectionClasses || "text-center"}
                            headingClasses={titleSectionData?.headingClasses || ""}
                        />
                    </Col>
                </Row>
                <Slider
                    {...sliderSettings}
                    className="ltn__upcoming-project-slider-1-active slick-arrow-1"
                >
                    {data.map((item, key) => (
                        <div key={key} >
                            <AminitiesItemTwo data={item} styles={{ maxHeight: 420 }} />
                        </div>
                    ))}
                </Slider>
            </Container>
        </div>
    );
}

export default AmenitiesSlider;
