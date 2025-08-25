import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import TitleSection from "../titleSection";
import { FaCheck, FaTimes, FaStar } from "react-icons/fa";

const packages = [
  {
    name: "Basic",
    price: "₹1,500",
    priceUnit: "per sqft",
    popular: false,
    color: "primary",
  },
  {
    name: "Standard",
    price: "₹1,800",
    priceUnit: "per sqft",
    popular: true,
    color: "success",
  },
  {
    name: "Premium",
    price: "₹2,200",
    priceUnit: "per sqft",
    popular: false,
    color: "warning",
  },
];

const data = [
  {
    title: "Design & Drawings",
    values: [true, true, true],
  },
  {
    title: "Architectural Layout 2D",
    values: [true, true, true],
  },
  {
    title: "Structural Drawing",
    values: [true, true, true],
  },
  {
    title: "Elevation Design 3D",
    values: [true, true, true],
  },
  {
    title: "Plumbing Layout Drawings 2D",
    values: [false, true, true],
  },
  {
    title: "Base Height",
    values: ["Up to 2 Ft", "Up to 3 Ft", "Up to 5 Ft"],
  },
  {
    title: "Ceiling Height",
    values: ["10 ft (FFL to FFL)", "10 ft (FFL to FFL)", "11 ft (FFL to FFL)"],
  },
  {
    title: "Steel (500 TMT Bars)",
    values: ["ISI Brand", "ISI Brand", "ISI Brand"],
  },
  {
    title: "Cement",
    values: [
      "Grade 43",
      "Zuari / Ultratech / ACC - Grade 43",
      "Dalmia / Coramontal - Grade 43",
    ],
  },
  {
    title: "Concrete",
    values: ["M20/M25 Manual Mix", "M20/M25 RMC", "M20/M25 RMC"],
  },
  {
    title: "Brick Work",
    values: [
      'Chamber brick 9" main, 4" inner',
      'Chamber brick 9" main, 4" inner',
      'Chamber brick 9" main, 4" inner',
    ],
  },
  {
    title: "Parapet Wall",
    values: [
      '3\'6" height, 6" thick',
      '3\'6" height, 6" thick',
      '3\'6" height, 6" thick or glass railing',
    ],
  },
  {
    title: "Living/Dining/Bedroom/Kitchen Flooring",
    values: [
      "2'x2' Vitrified up to ₹45/sqft",
      "4'x2' Vitrified up to ₹65/sqft",
      "4'x2' Vitrified up to ₹80/sqft",
    ],
  },
  {
    title: "Balcony & Utility Flooring",
    values: [
      "1'x1' Anti-skid up to ₹35/sqft",
      "1'x1' Anti-skid up to ₹45/sqft",
      "1'x1' Anti-skid up to ₹60/sqft",
    ],
  },
  {
    title: "Staircase",
    values: [
      "1'x1' Anti-skid tile up to ₹35/sqft",
      "Sadarhalli granite up to ₹65/sqft",
      "Sadarhalli granite up to ₹85/sqft",
    ],
  },
  {
    title: "Terrace Floor",
    values: [false, false, "Waterproofing with Tile"],
  },
  {
    title: "Kitchen Counter",
    values: ["Granite", "Granite", "Granite"],
  },
  {
    title: "Wall Dado",
    values: [
      "Ceramic 2' above counter ₹35 / sqft",
      "Ceramic full height ₹45/sqft",
      "Vitrified full height ₹65/sqft",
    ],
  },
  {
    title: "Kitchen Sink & Faucet",
    values: [
      "Single SS Bowl, ISI accessories",
      "SS with drain board, ISI accessories",
      "Double bowl or granite, ISI accessories",
    ],
  },
  {
    title: "Exhaust / Kitchen Setup",
    values: [
      "Fan provision",
      "Fan, Modular Kitchen + Chimney",
      "Modular Kitchen + Chimney",
    ],
  },
];

const BuildingPackageTable = () => (
  <Container>
    <Row>
      <Col xs={12}>
        <TitleSection
          titleSectionData={{
            subTitle: "Construction Packages",
            title: "Choose Your Perfect Package",
          }}
          sectionClasses={"text-center mb-5"}
        />
      </Col>
    </Row>

    <Row className="justify-content-center">
      {packages.map((pkg, pkgIndex) => (
        <Col key={pkg.name} lg={4} md={6} className="mb-4">
          <div
            className={`package-card h-100 ${
              pkg.popular ? "popular-package" : ""
            }`}>
            {pkg.popular && (
              <div className="popular-badge">
                <FaStar className="me-1" /> Most Popular
              </div>
            )}

            <div className="package-header text-center">
              <h3 className="package-title">{pkg.name}</h3>
              {/* <div className="package-price">
                <span className="price">{pkg.price}</span>
                <span className="price-unit">{pkg.priceUnit}</span>
              </div> */}
            </div>

            <div className="package-features">
              {data.map((feature, idx) => (
                <div key={idx} className="feature-row">
                  <div className="feature-name">{feature.title}</div>
                  <div className="feature-value">
                    {typeof feature.values[pkgIndex] === "boolean" ? (
                      feature.values[pkgIndex] ? (
                        <FaCheck className="text-success" />
                      ) : (
                        <FaTimes className="text-muted" />
                      )
                    ) : (
                      feature.values[pkgIndex] || (
                        <FaTimes className="text-muted" />
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="package-footer text-center mt-auto">
              <Link
                href="/contact"
                className={`btn btn-${pkg.color} btn-lg w-100`}>
                Get Quote
              </Link>
            </div>
          </div>
        </Col>
      ))}
    </Row>

    <style jsx>{`
      .package-card {
        background: #fff;
        border-radius: 15px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        padding: 0;
        overflow: hidden;
        position: relative;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        display: flex;
        flex-direction: column;
      }

      .package-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
      }

      .popular-package {
        border: 3px solid #28a745;
        transform: scale(1.05);
      }

      .popular-badge {
        background: #28a745;
        color: white;
        padding: 8px 15px;
        border-radius: 20px;
        position: absolute;
        top: -10px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 12px;
        font-weight: bold;
        z-index: 1;
      }

      .package-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 30px 20px;
      }

      .package-title {
        font-size: 1.8rem;
        font-weight: bold;
        margin-bottom: 10px;
      }

      .package-price {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .price {
        font-size: 2.5rem;
        font-weight: bold;
        line-height: 1;
      }

      .price-unit {
        font-size: 0.9rem;
        opacity: 0.9;
      }

      .package-features {
        padding: 20px;
        flex-grow: 1;
      }

      .feature-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 0;
        border-bottom: 1px solid #f0f0f0;
      }

      .feature-row:last-child {
        border-bottom: none;
      }

      .feature-name {
        font-weight: 500;
        color: #333;
        font-size: 0.9rem;
        flex: 1;
        text-align: left;
      }

      .feature-value {
        text-align: right;
        font-size: 0.85rem;
        color: #666;
        max-width: 40%;
      }

      .package-footer {
        padding: 20px;
        background: #f8f9fa;
      }

      .btn-lg {
        padding: 12px 30px;
        font-weight: bold;
        border-radius: 25px;
        text-transform: uppercase;
        letter-spacing: 1px;
        transition: all 0.3s ease;
      }

      .btn-primary {
        background: linear-gradient(45deg, #007bff, #0056b3);
        border: none;
      }

      .btn-success {
        background: linear-gradient(45deg, #28a745, #1e7e34);
        border: none;
      }

      .btn-warning {
        background: linear-gradient(45deg, #ffc107, #e0a800);
        border: none;
        color: #000;
      }

      @media (max-width: 768px) {
        .popular-package {
          transform: none;
        }

        .package-title {
          font-size: 1.5rem;
        }

        .price {
          font-size: 2rem;
        }

        .feature-name {
          font-size: 0.8rem;
        }

        .feature-value {
          font-size: 0.75rem;
        }
      }
    `}</style>
  </Container>
);

export default BuildingPackageTable;
