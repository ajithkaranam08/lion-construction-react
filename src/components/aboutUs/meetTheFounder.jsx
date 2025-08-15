import { Container, Row, Col, Card } from "react-bootstrap";

const MeetTheFounder = () => {
    return (
        <div className="py-5">
            <Container>
                <Row className="">
                    {/* Image Section */}
                    <Col md={5} className="mb-4 mb-md-0">
                        <div className="p-3 rounded-4 h-100">
                            <img
                                src="/img/about/construction-ceo.jpg"
                                alt="Mr. S.N. Suresh Kumar"
                                className="img-fluid rounded-4 h-100"
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                    </Col>

                    {/* Text Section */}
                    <Col md={7}>
                        <Card className="p-4 shadow-sm bg-light border-0 rounded-4">
                            <div className="mb-2 text-muted fw-bold ltn__secondary-color">Meet</div>
                            <h2 className="fw-bold">Mr. S.N. Suresh Kumar</h2>
                            <p className="mb-3">
                                At Lion construction, we are commited to delivering excellence in every brick laid and every structure built. The company is led by Mr.S.N.Sureshkumar, a seasoned civil engineer, a registered engineer of Chennai corporation, CMDA (Chennai metropolitan Development Authority) and DTCP approvals, with over 23 years of Professional experience in renowned multinational and overseas companies our firm is driven by global standards and local expertise.
                            </p>
                            <p>
                                Mr. Suresh Kumar holds international quality certifications and brings deep technical knowledge across diverse sectors, including multi-storey residential buildings, interior fit-outs, commercial developments, and infrastructure projects. His global exposure and adherence to international construction standards form the cornerstone of our company&apos;s values and operations. At the heart of our operations is the QCT principle Quality, Cost, and Time. We believe successful construction is not just about building structures, but delivering top-quality results within optimal costs and committed timelines. This balanced approach ensures maximum value and satisfaction for every client.
                            </p>

                            <p>
                                At Lion Construction, We offer end-to-end construction services from planning and design to execution and project delivery while maintaining the highest levels of quality, safety, and integrity.
                            </p>

                            <p>
                                We believe in building not just structures, but long-lasting relationships based on trust, transparency, and technical excellence.
                            </p>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default MeetTheFounder;
