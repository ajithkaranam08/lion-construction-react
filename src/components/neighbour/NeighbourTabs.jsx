import React from "react";
import Link from "next/link";
import { Tab, Nav, Row, Col } from "react-bootstrap";

const NeighbourTabs = ({ tabItems }) => (
    <div className="ltn__neighbour-tab-wrap">
        <Tab.Container defaultActiveKey={tabItems[0]?.key || "first"}>
            <div className="ltn__tab-menu ltn__tab-menu-4 text-center">
                <Nav>
                    {tabItems.map((item) => (
                        <Nav.Link eventKey={item.key} key={item.key}>
                            <img src={item.thumb} alt={item.title} />
                        </Nav.Link>
                    ))}
                </Nav>
            </div>
            <Tab.Content>
                {tabItems.map((item) => (
                    <Tab.Pane eventKey={item.key} key={item.key}>
                        <div className="ltn__neighbour-tab-content-inner">
                            <Row>
                                <Col lg={8}>
                                    <div className="neighbour-apartments-img">
                                        <img src={item.mainImage} alt={item.title} />
                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <div className="ltn__search-by-place-item neighbour-apartments-item">
                                        <div className="search-by-place-img">
                                            <Link href="#">
                                                <img src={item.propertyImage} alt={item.title} />
                                            </Link>
                                            <div className="search-by-place-badge">
                                                <ul><li>{item.propertyCount} Properties</li></ul>
                                            </div>
                                        </div>
                                        <div className="search-by-place-info">
                                            <h4><Link href="#">{item.title}</Link></h4>
                                            <label>
                                                <span className="ltn__secondary-color">{item.distance}</span> / {item.walkTime}
                                            </label>
                                            <div className="search-by-place-brief">
                                                <p>{item.description}</p>
                                            </div>
                                            <div className="search-by-place-btn">
                                                <Link href="#">
                                                    View Property <i className="flaticon-right-arrow"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Tab.Pane>
                ))}
            </Tab.Content>
        </Tab.Container>
    </div>
);

export default NeighbourTabs;
