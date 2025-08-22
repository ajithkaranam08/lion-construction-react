import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const serviceOptions = [
  "New Home",
  "Interior Works",
  "Commercial Space",
  "Renovation",
  "Modular Kitchen",
];

const defaltLeftCartData = {
  subTitle: "Have a Project in Mind?",
  title: "Let’s Build It Together.",
  descriptions: ["We help bring your ideas to life."],
};

const ContactSection = ({ classes = "", leftCart = defaltLeftCartData }) => {
  return (
    <section className={`py-5 contact-us-banner ${classes}`}>
      <Container>
        <Row className="align-items-stretch gy-4">
          {/* LEFT: Image with overlaid text */}
          <Col md={6} className="position-relative">
            <div
              className="h-100 d-flex flex-column justify-content-center text-white"
              style={{
                backgroundImage: `url(/img/banner/contact-us-image.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "0.5rem",
                height: "100%",
                minHeight: "500px",
              }}>
              <div className="overlay-text bg-dark bg-opacity-50 p-4 rounded h-100 w-100 d-flex justify-content-end flex-column">
                <h4 className="ltn__primary-color  mb-2">
                  {leftCart.subTitle}
                </h4>
                <h2 className="fw-bold mb-3 text-white">{leftCart.title}</h2>
                {leftCart.descriptions?.map((description, index) => (
                  <>
                    <p className="text-white mb-1">{description}</p>
                  </>
                ))}
              </div>
            </div>
          </Col>

          {/* RIGHT: Contact form */}
          <Col md={6}>
            <div
              className={`${
                classes.includes("section-bg-1") ? "bg-white" : "bg-light"
              } p-4 p-md-5 rounded-3 shadow-sm h-100 `}
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,137,63,0.08) 0%, rgba(255,255,255,1) 60%)",
                border: "1px solid rgba(255,137,63,0.25)",
              }}>
              <div className="mb-4 p-3 rounded-3 ltn__gradient-bricks-container">
                <h4 className="mb-0 fw-bold ltn__brown-bricks">
                  Ready to Build? Let’s Talk
                </h4>
              </div>
              <p className="text-muted mb-4">
                Let’s start building your dream space. Just fill out the form,
                and our team will get in touch with you soon.
              </p>

              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-4" controlId="fullName">
                      <Form.Label className="form-label">Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        className="form-input"
                        placeholder="Enter your first and last name"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-4" controlId="location">
                      <Form.Label className="form-label">
                        Site Location
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className="form-input"
                        placeholder="Where is your site located?"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-4" controlId="email">
                      <Form.Label className="form-label">
                        Email Address
                      </Form.Label>
                      <Form.Control
                        type="email"
                        className="form-input"
                        placeholder="We’ll use this to send updates"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-4" controlId="phone">
                      <Form.Label className="form-label">
                        Phone Number
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className="form-input"
                        placeholder="So we can reach you quickly"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group className="mb-4" controlId="services">
                      <Form.Label className="form-label">
                        Type of Services
                      </Form.Label>
                      <Form.Select className="form-input">
                        <option disabled defaultChecked>
                          Select Service
                        </option>
                        {serviceOptions.map((option, idx) => (
                          <option key={idx}>{option}</option>
                        ))}
                      </Form.Select>
                      <div className="form-text">
                        Example: Home Construction, Interior Design, Renovation
                      </div>
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group className="mb-4" controlId="requirements">
                      <Form.Label className="form-label">
                        Your Requirements
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        className="form-input-textaera"
                        placeholder="Let us know what you need or how we can assist you."
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-4" controlId="notRobot">
                      <Form.Check
                        type="checkbox"
                        label="I’m not a robot"
                        className="form-check-box"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Button
                      type="submit"
                      className="w-100  btn-effect-1 theme-btn-1  form-btn">
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactSection;
