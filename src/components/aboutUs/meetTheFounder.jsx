import { Container, Row, Col, Card } from "react-bootstrap";

const MeetTheFounder = () => {
    return (
        <div className="py-5">
            <Container>
                <Row className="align-items-center">
                    {/* Image Section */}
                    <Col md={5} className="mb-4 mb-md-0">
                        <div className="p-3 rounded-4 h-100">
                            <img

                                src="https://www.kekgaconstruction.com/site-assets/images/ganapathy.png"
                                alt="Mr. S.N. Suresh Kumar"
                                className="img-fluid rounded-4 h-100"
                                style={{ objectFit: "cover", filter: "hue-rotate(147deg)" }}
                            />
                        </div>
                    </Col>

                    {/* Text Section */}
                    <Col md={7}>
                        <Card className="p-4 shadow-sm bg-light border-0 rounded-4">
                            <div className="mb-2 text-muted fw-bold ltn__secondary-color">Meet</div>
                            <h2 className="fw-bold">Mr. S.N. Suresh Kumar</h2>
                            <p className="mb-3">
                                Lion Construction is an official CMDA-approved construction company in Chennai. We work on projects all over Tamil Nadu, especially around Chennai. We offer many construction services including planning, designing, cost estimation, and building for residential, interior designing, commercial, and industrial projects.
                            </p>
                            <p>
                                Lion Construction is led by Engineer Mr. S.N. Suresh Kumar. He graduated in civil engineering and has 22 years of experience managing projects. He has worked with big companies like Sobha Developers, DLF, Shapoorji Pallonji, and Unitech Ltd. He also worked abroad with companies like M/S Leighton Contracting LLC and Petroserv Limited, gaining experience in high-rise homes, commercial buildings, and infrastructure projects.
                            </p>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default MeetTheFounder;
