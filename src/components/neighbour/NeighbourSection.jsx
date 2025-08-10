import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NeighbourTabs from "./NeighbourTabs";
import NeighbourAccordions from "./NeighbourAccordions";

const NeighbourSection = ({
    titleSectionData = {
        "subTitle": "Explore Neighbour",
        "title": "Our Complete Design Process"
    },

    tabItems = [],
    showTabs = true
}) => {
    const [open, setOpen] = useState(false);


    return (

        <Container>
            <Row>
                <Col xs={12}>
                    <div className="section-title-area">
                        <h6 className="section-subtitle-2 ltn__secondary-color">{titleSectionData.subTitle}</h6>
                        <h1 className="section-title">
                            {titleSectionData.title} <br /> Explore Below
                        </h1>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    {showTabs && <NeighbourTabs tabItems={tabItems} />}
                    <NeighbourAccordions accordionItems={tabItems} setOpen={setOpen} />
                </Col>
            </Row>
        </Container>

    );
};

export default NeighbourSection;