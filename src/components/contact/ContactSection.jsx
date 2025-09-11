import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import toast from "react-hot-toast";

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
  descriptions: [
    "We help bring your ideas to life."

  ],
}

const ContactSection = ({ classes = "", leftCart = defaltLeftCartData }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    location: '',
    email: '',
    phone: '',
    services: '',
    requirements: '',
    notRobot: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      toast.success('Thanks for your interest! We\'ll be in touch with you soon.', {
        duration: 5000,
        position: 'top-center',
        style: {
          background: '#28a745',
          color: '#fff',
          fontWeight: '500',
          fontSize: '16px',
          padding: '16px 24px',
          borderRadius: '8px',
        },
      });

      // Reset form
      setFormData({
        fullName: '',
        location: '',
        email: '',
        phone: '',
        services: '',
        requirements: '',
        notRobot: false
      });
    } catch (error) {
      toast.error('Something went wrong. Please try again.', {
        duration: 4000,
        position: 'top-center',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              }}
            >
              <div className="overlay-text bg-dark bg-opacity-50 p-4 rounded h-100 w-100 d-flex justify-content-end flex-column">
                <h4 className="ltn__secondary-color  mb-2">{leftCart.subTitle}</h4>
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
            <div className={`${classes.includes("section-bg-1") ? "bg-white" : "bg-light"} p-4 p-md-5 rounded-3 shadow-sm h-100 `}>
              <h4 className="mb-3 fw-bold ltn__secondary-color">Ready to Build? Let’s Talk</h4>
              <p className="text-muted mb-4">
                Let’s start building your dream space. Just fill out the form, and our team will get in touch with you soon.
              </p>

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-4" controlId="fullName">
                      <Form.Label className="form-label">Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="Enter your first and last name"
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-4" controlId="location">
                      <Form.Label className="form-label">Site Location</Form.Label>
                      <Form.Control
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="Where is your site located?"
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-4" controlId="email">
                      <Form.Label className="form-label">Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="We'll use this to send updates"
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-4" controlId="phone">
                      <Form.Label className="form-label">Phone Number</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="So we can reach you quickly"
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group className="mb-4" controlId="services">
                      <Form.Label className="form-label">Type of Services</Form.Label>
                      <Form.Select 
                        name="services"
                        value={formData.services}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      >
                        <option value="" disabled>Select Service</option>
                        {serviceOptions.map((option, idx) => (
                          <option key={idx} value={option}>{option}</option>
                        ))}
                      </Form.Select>
                      <div className="form-text">
                        Example: Home Construction, Interior Design, Renovation
                      </div>
                    </Form.Group>
                  </Col>



                  <Col md={12}>
                    <Form.Group className="mb-4" controlId="requirements">
                      <Form.Label className="form-label">Your Requirements</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="requirements"
                        value={formData.requirements}
                        onChange={handleInputChange}
                        rows={4}
                        className="form-input-textaera"
                        placeholder="Let us know what you need or how we can assist you."
                        required
                      />
                    </Form.Group>
                  </Col>


                  <Col md={6}>
                    <Form.Group className="mb-4" controlId="notRobot" >
                      <Form.Check
                        type="checkbox"
                        name="notRobot"
                        checked={formData.notRobot}
                        onChange={handleInputChange}
                        label="I'm not a robot"
                        className="form-check-box"
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Button 
                      type="submit" 
                      className="w-100 btn-effect-1 theme-btn-1 form-btn"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit'}
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
