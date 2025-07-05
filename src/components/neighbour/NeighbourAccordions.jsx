import React from "react";
import { Row, Col, Accordion } from "react-bootstrap";
import { FaPlay } from "react-icons/fa";

const NeighbourAccordions = ({ accordionItems = [], setOpen }) => (
    <div className="ltn__faq-inner ltn__faq-inner-2 ltn__faq-inner-3">
        <Row>
            {[0, 1].map((colIndex) => (
                <Col xs={12} lg={6} key={colIndex}>
                    <Accordion>
                        {accordionItems
                            .filter((_, idx) => idx % 2 === colIndex)
                            .map((item, i) => (
                                <Accordion.Item eventKey={String(i)} className="card" key={i}>
                                    <Accordion.Header className="ltn__card-title">
                                        <i className={item.icon}></i> {item.title}
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        {item.image && (
                                            <div className="ltn__video-img alignleft">
                                                <img src={item.image} alt="accordion" />
                                                <button
                                                    className="ltn__video-icon-2 ltn__video-icon-2-small"
                                                    onClick={() => setOpen(true)}
                                                >
                                                    <FaPlay />
                                                </button>
                                            </div>
                                        )}
                                        <p>{item.description}</p>
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))}
                    </Accordion>
                </Col>
            ))}
        </Row>
    </div>
);

export default NeighbourAccordions;
