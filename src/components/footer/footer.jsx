import Link from "next/link";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaPaperPlane,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaInstagram,
} from "react-icons/fa";
import PassionQualityText from "@/components/passionQualityText/PassionQualityText";

const Footer = function () {
  return (
    <>
      {/* <!-- FOOTER AREA START --> */}
      <footer className="ltn__footer-area  ">
        <div className="footer-top-area section-bg-2 plr--5">
          <Container fluid>
            <Row className="footer-change">
              <Col xs={12} sm={6} xl={3}>
                <div className="footer-widget footer-about-widget">
                  <div className="footer-logo" style={{ position: "relative" }}>
                    <div className="site-logo" style={{ position: "relative" }}>
                      {/* <img src="/img/logo.png" alt="Logo" /> */}
                      <img
                        src="/img/logo-2.png"
                        alt="Logo"
                        width={150}
                        height={150}
                      />
                      <PassionQualityText
                        variant="footer"
                        positioning="absolute"
                      />
                    </div>
                  </div>
                  <p className="ltn__primary-color">
                    {
                      "At Lion Construction, we turn your ideas into real spaces that are simple, strong, and built for the future. Let's build something great together."
                    }
                  </p>
                </div>
              </Col>
              <Col xs={12} sm={6} xl={2}>
                <div className="footer-widget footer-menu-widget clearfix ">
                  <h4 className="footer-title">Quick Links</h4>
                  <div className="footer-menu">
                    <ul>
                      <li>
                        <Link href="/">Home</Link>
                      </li>
                      <li>
                        <Link href="/about">About</Link>
                      </li>
                      <li>
                        <Link href="/coming-soon">Blog</Link>
                      </li>
                      <li>
                        <Link href="/projects">Projects</Link>
                      </li>
                      <li>
                        <Link href="/contact">Contact</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
              <Col xs={12} sm={6} xl={2}>
                <div className="footer-widget footer-menu-widget clearfix">
                  <h4 className="footer-title">Services</h4>
                  <div className="footer-menu">
                    <ul>
                      <li>
                        <Link href="/service/construction">
                          Residential & Commercial construction
                        </Link>
                      </li>
                      <li>
                        <Link href="/service/residential">Interior Design</Link>
                      </li>
                      <li>
                        <span>Joint Ventures</span>
                      </li>
                      <li>
                        <span>Flat Promotion</span>
                      </li>
                      <li>
                        <span>Govt Plan approval</span>
                      </li>
                      <li>
                        <span>Architectural & Structural Designing</span>
                      </li>
                      <li>
                        <span>Construction consulting services.</span>
                      </li>
                      <li>
                        <span>Real Estate</span>
                      </li>
                      <li>
                        <span>Renovation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>

              <Col xs={12} sm={6} xl={3}>
                <div className="footer-address">
                  <ul>
                    <li>
                      <div className="footer-address-icon">
                        <FaMapMarkerAlt />
                      </div>
                      <div className="footer-address-info">
                        <p>
                          First Street, Kavya nagar, Korattur, Chennai — 600076.
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="footer-address-icon">
                        <FaPhoneAlt />
                      </div>
                      <div className="footer-address-info">
                        <p>
                          <Link href="tel:+919840361427">+91 9840361427</Link> /{" "}
                          <Link href="tel:+918122761428">+91 8122761428</Link>
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="footer-address-icon">
                        <FaEnvelope />
                      </div>
                      <div className="footer-address-info">
                        <p>
                          <Link href="mailto:lionconstruction07@gmail.com">
                            lionconstruction07@gmail.com
                          </Link>
                        </p>
                      </div>
                    </li>

                    <li>
                      <div className="footer-address-icon">
                        <FaInstagram />
                      </div>
                      <div className="footer-address-info">
                        <p>
                          <Link href="https://instagram.com/lionconstructionofficial">
                            lionconstructionofficial
                          </Link>
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="ltn__social-media mt-20 social-media-footer">
                  <ul>
                    {/* <li>
                      <Link href="#" title="Facebook">
                        <FaFacebookF />
                      </Link>
                    </li>
                    <li>
                      <Link href="#" title="Twitter">
                        <FaTwitter />
                      </Link>
                    </li>
                    <li>
                      <Link href="#" title="Linkedin">
                        <FaLinkedin />
                      </Link>
                    </li>
                    <li>
                      <Link href="#" title="Youtube">
                        <FaYoutube />
                      </Link>
                    </li> */}

                    {/* <li>
                      <Link
                        href="https://instagram.com/lionconstructionofficial"
                        target="_blank">
                        {" "}
                        <FaInstagram /> 
                      </Link>
                    </li> */}
                  </ul>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        {/* <div className="ltn__copyright-area ltn__copyright-2 section-bg-7  plr--5">
          <div className="container-fluid ltn__border-top-2">
            <Row>
              <Col xs={12} md={6}>
                <div className="ltn__copyright-design clearfix">
                  <p>
                    All Rights Reserved @ Company{" "}
                    <span className="current-year"></span>
                  </p>
                </div>
              </Col>
              <Col xs={12} md={6} className="align-self-center">
                <div className="ltn__copyright-menu text-end">
                  <ul>
                    <li>
                      <Link href="#">Terms & Conditions</Link>
                    </li>
                    <li>
                      <Link href="#">Claim</Link>
                    </li>
                    <li>
                      <Link href="#">Privacy & Policy</Link>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </div>
        </div> */}
      </footer>
      {/* <!-- FOOTER AREA END --> */}
    </>
  );
};

export default Footer;
