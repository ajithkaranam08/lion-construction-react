import HeroSectionStyleTwo from "@/components/hero/styleTwo";
import { LayoutOne } from "@/layouts";
import serviceData from "@/data/service/construction.json";
import ExpandablePackageTable from "@/components/table/ExpandablePackageTable";
import AboutUsStyleOne from "@/components/aboutUs/aboutUsStyleOne";
import AmenitiesSlider from "@/components/aminities/AmenitiesSlider";
import NeighbourSection from "@/components/neighbour/NeighbourSection";
import { Col, Container, Row } from "react-bootstrap";
import TitleSection from "@/components/titleSection";
import testimonialData from "@/data/testimonial/index-three.json";
import TestimonialStyleThree from "@/components/testimonialCarousel/indexThree";
import ContactSection from "@/components/contact/ContactSection";
import AboutUsSectionTwo from "@/components/aboutUs/aboutUsSectionTwo";
import PackageCalculationTable from "@/components/table/PackageCalculationTable";


const Construction = () => {
  return (
    <LayoutOne topbar={true}>
      <div className="ltn__slider-area ltn__slider-11 section-bg-1">
        <HeroSectionStyleTwo data={serviceData.hero} />
      </div>

      <div className="ltn__about-us-area pt-50 pb-50">
        <AboutUsStyleOne data={serviceData.aboutSectionOne} />
      </div>

      <AmenitiesSlider minHeight={400} data={serviceData.aboutSectionProcess.processSteps} titleSectionData={serviceData.aboutSectionProcess.titleSectionData} />

      <div className="ltn__about-us-area pt-50 pb-50 section-bg-1">
        <ExpandablePackageTable />
      </div>

      <div className="ltn__about-us-area pt-50 pb-50 section-bg-1">
        <PackageCalculationTable />
      </div>

      <AmenitiesSlider
        data={serviceData.constructionProcessSteps.processSteps}
        titleSectionData={serviceData.constructionProcessSteps.titleSectionData}
      />

  

      <div className="neighbour-area section-bg-1 pt-50 pb-50">
        <NeighbourSection
          showTabs={serviceData.neighbourSection.showTabs}
          titleSectionData={serviceData.neighbourSection.titleSectionData}
          tabItems={serviceData.neighbourSection.tabItems}
        />
      </div>

      <div
        style={{
          "--image": "url(/img/banner/construction-approach.jpg)",
        }}
        className="ltn__about-us-area section-bg-1 bg-image-right-before pt-50 pb-50"
      >
        <AboutUsSectionTwo data={serviceData.aboutSectionTwo} />
      </div>

      {/* <div className="ltn__testimonial-area ltn__testimonial-4 pt-50 pb-50 plr--9">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <TitleSection
                sectionClasses="text-center"
                headingClasses="section-subtitle-2"
                titleSectionData={{
                  subTitle: "Our Testimonial",
                  title: "Clients Feedback",
                }}
              />
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              <TestimonialStyleThree data={testimonialData} />
            </Col>
          </Row>
        </Container>
      </div> */}

      <ContactSection classes="pt-50 pb-50 section-bg-1" />
    </LayoutOne>
  );
};

export default Construction;
