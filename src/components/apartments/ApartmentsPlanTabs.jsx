import React from "react";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import TitleSection from "@/components/titleSection";

const defaultTabs = [
  {
    key: "site-inspection",
    title: "Site Inspection",
    heading: "Site Inspection",
    description:
      "Our journey begins with a detailed site inspection. We visit your location to assess the land, understand existing site conditions, and align your goals with the practical possibilities. During this visit, we evaluate factors like soil type, water levels, orientation, and utility access. This critical step helps us prepare for a smooth construction phase while avoiding delays or surprises. We also take time to listen to your vision so we can tailor the project to your needs from day one.",
    info: [
      { label: "Focus", value: "Understanding the Land & Your Vision" },
      { label: "Checks", value: "Soil, Water, Orientation, Utilities" },
    ],
    image: "/img/others/10.png",
  },
  {
    key: "custom-design",
    title: "Custom Design Planning",
    heading: "Custom Design Planning",
    description:
      "Once we understand the site and your preferences, we move into the design phase. Our team develops a personalized layout that maximizes your space, suits your lifestyle, and reflects your taste. Whether you dream of an open-concept layout, energy-efficient features, or traditional design elements, we incorporate them into the plan. We ensure the design flows well, offers proper ventilation and lighting, and is ready for future needs. Every design is reviewed with you in detail, with modifications made until you're fully satisfied.",
    info: [
      { label: "Goal", value: "Your Ideas, Expertly Brought to Life" },
      { label: "Features", value: "Personalized, Efficient, Future-ready" },
    ],
    image: "/img/others/10.png",
  },
  {
    key: "detailed-costing",
    title: "Detailed Costing",
    heading: "Detailed Costing",
    description:
      "We believe clarity in pricing builds trust. After finalizing the design, we provide a comprehensive cost estimate — clearly itemized to show how every rupee is being spent. From construction materials and labor to plumbing, electrical, and finishing, you'll see the complete breakdown. We also offer options at various budget levels, so you can make informed choices without compromising on quality. With us, what you see is what you get — no hidden fees or last-minute surprises.",
    info: [
      { label: "Promise", value: "Full Transparency. No Hidden Costs." },
      { label: "Options", value: "Multiple Budgets, Clear Breakdown" },
    ],
    image: "/img/others/10.png",
  },
  {
    key: "contract-signing",
    title: "Signing the Contract",
    heading: "Signing the Contract",
    description:
      "Before breaking ground, we prepare a detailed contract that outlines the scope of work, project timelines, total cost, payment terms, and mutual responsibilities. We walk you through every section of the agreement so you know exactly what to expect. This document is designed to protect your interests and give you full confidence in the journey ahead. It marks the official start of your project — built on trust and transparency.",
    info: [
      { label: "Scope", value: "Defined Work, Timelines, Costs" },
      { label: "Confidence", value: "Clear Responsibilities, No Surprises" },
    ],
    image: "/img/others/10.png",
  },
  {
    key: "groundbreaking",
    title: "Groundbreaking Ceremony",
    heading: "Groundbreaking Ceremony",
    description:
      "To begin your home construction on an auspicious note, we organize a traditional Bhoomi Pooja (groundbreaking ceremony). This sacred ritual is performed to seek blessings from Mother Earth and ensure a safe, successful construction journey. Our team coordinates the arrangements and guides your family through the ceremony. It's a meaningful milestone that connects cultural values with modern construction, setting the tone for your new beginning.",
    info: [
      { label: "Tradition", value: "Bhoomi Pooja, Blessings" },
      { label: "Meaning", value: "Auspicious Start, Family Involvement" },
    ],
    image: "/img/others/10.png",
  },
  {
    key: "building-home",
    title: "Building Your Home",
    heading: "Building Your Home",
    description:
      "With plans in place and blessings received, construction begins. Our skilled team of engineers, architects, and project managers work with precision and care at every stage — from laying the foundation to finishing touches. We follow strict quality checks, use trusted materials, and ensure compliance with all safety standards. You'll receive regular progress updates and have complete visibility into the process. The result is a beautifully built home designed to last for generations.",
    info: [
      { label: "Execution", value: "Vision Meets Precision" },
      { label: "Quality", value: "Skilled Team, Trusted Materials, Safety" },
    ],
    image: "/img/others/10.png",
  },
];

const ApartmentsPlanTabs = ({
  tabs = defaultTabs,
  sectionTitle = {
    sectionClasses: "text-center",
    headingClasses: "",
    titleSectionData: {
      subTitle: "What We Do and How We Do It",
      title: "Our Construction Process",
      additionalClassName: "",
    },
  },
}) => (
  <div className="ltn__apartments-plan-area pb-70">
 
    <Container>
      <Row>
        <Col>
          <TitleSection
            sectionClasses={sectionTitle.sectionClasses}
            headingClasses={sectionTitle.headingClasses}
            titleSectionData={sectionTitle.titleSectionData}
          />
          <Tab.Container defaultActiveKey={tabs[0].key}>
            <div className="ltn__tab-menu ltn__tab-menu-3 text-center responsive-tab-scroll">
              <Nav className="nav flex-nowrap overflow-auto justify-content-start justify-content-lg-center">
                {tabs.map((tab) => (
                  <Nav.Link eventKey={tab.key} key={tab.key}>{tab.title}</Nav.Link>
                ))}
              </Nav>
            </div>
            <Tab.Content>
              {tabs.map((tab) => (
                <Tab.Pane eventKey={tab.key} key={tab.key}>
                  <div className="ltn__apartments-tab-content-inner">
                    <Row>
                      <Col xs={12} lg={6}>
                        <div className="apartments-plan-info section-bg-1">
                          <h2>{tab.heading}</h2>
                          <p>{tab.description}</p>
                          {tab.info && tab.info.length > 0 && (
                            <div className="apartments-info-list apartments-info-list-color mt-40">
                              <ul>
                                {tab.info.map((item, idx) => (
                                  <li key={idx}>
                                    <label>{item.label}</label>
                                    <span>{item.value}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </Col>
                      <Col xs={12} lg={6}>
                        <div className="apartments-plan-img">
                          <img src={tab.image} alt="#" />
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  </div>
);

export default ApartmentsPlanTabs; 