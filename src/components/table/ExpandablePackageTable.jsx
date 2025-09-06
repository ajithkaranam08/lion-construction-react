import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import TitleSection from "../titleSection";
import { FaPlus, FaMinus, FaStar } from "react-icons/fa";

const packages = [
  {
    name: "Basic Package",
    price: "₹ 1999",
    priceUnit: "per sqft",
    popular: false,
    color: "primary",
  },
  {
    name: "Standard Package",
    price: "₹ 2199", 
    priceUnit: "per sqft",
    popular: true,
    color: "success",
  },
  {
    name: "Premium Package",
    price: "₹ 2499",
    priceUnit: "per sqft",
    popular: false,
    color: "warning",
  },
];

const packageDetails = {
  design: {
    title: "Design",
    details: {
      basic: [
        "Architectural Plan - 2D",
        "Structural Drawing",
        "Basic Elevation Design"
      ],
      standard: [
        "Architectural Plan - 2D",
        "Structural Drawing",
        "Elevation Design - 3D"
      ],
      premium: [
        "Architectural Plan - 2D",
        "Soil testing",
        "Structural Drawing",
        "Elevation Design - 3D",
        "Furniture Layout",
        "Plumbing Layout",
        "Electrical Layout"
      ]
    }
  },
  structure: {
    title: "Structure",
    details: {
      basic: [
        "Base Height: Up to 2 Feet",
        "Steel: FE550 (ISI Brand)",
        "Aggregates: 20mm & 40mm",
        "Cement: Ultratech, Ramco & Zuari",
        "Bricks: Chamber Bricks, 9\" Main walls & 4.5\" Wall for internal walls",
        "Blocks: 6\" for Main walls & 4\" for internal walls",
        "Sand: M-Sand - Concrete, Brick & Blockworks",
        "Sand: P-Sand for Plastering",
        "Concrete - M20",
        "Ceiling height: 10 Feet"
      ],
      standard: [
        "Base Height: Up to 2 Feet",
        "Steel: FE550 (ISI Brand)",
        "Aggregates: 20mm & 40mm",
        "Cement: Ultratech, Ramco & Zuari",
        "Bricks: Chamber Bricks, 9\" Main walls & 4.5\" Wall for internal walls",
        "Blocks: 6\" for Main walls & 4\" for internal walls",
        "Sand: M-Sand - Concrete, Brick & Blockworks",
        "Sand: P-Sand for Plastering",
        "Concrete - M20",
        "Ceiling height: 10 Feet"
      ],
      premium: [
        "Base Height: Up to 4 Feet",
        "Steel: FE550 (ISI Brand)",
        "Aggregates: 20mm & 40mm",
        "Cement: Ultratech, Ramco, Zuari & Dalmia",
        "Bricks: Wirecut Bricks, 9\" Main walls & 4.5\" Wall for internal walls",
        "Blocks: 6\" for Main walls & 4\" for internal walls",
        "Sand: M-Sand - Concrete, Brick & Blockworks",
        "Sand: P-Sand for Plastering",
        "Concrete - M20",
        "Ceiling height: 10 Feet"
      ]
    }
  },
  finishing: {
    title: "Finishing",
    details: {
      basic: [
        "TILING:",
        "• Flooring - 2'x2' Vetrified tile (Base price: 45/sqft)",
        "• Wall Tile - 2'x1' tile up to 7' height (Base price: 40/sqft)",
        "• Kitchen platform - Granite (Base price: 120/Sqft)",
        "",
        "JOINERYS:",
        "• Main Doors - Teak wood doors (Frame & door)",
        "• Inner Doors - Flush doors",
        "• Bath room doors - PVC Doors",
        "• Windows - UPVC windows with MS grills",
        "",
        "PLUMBING:",
        "• EWC & Washbasin - Parryware",
        "• Fittings - Hindware fittings",
        "• Kitchen Sink - SS Single bowl (up to 2800/-)",
        "• Pipes - Finolux PVC, Ashirvad - Upvc",
        "",
        "ELECTRICAL:",
        "• Electrical wires - Orbit or Equivalent",
        "• Electrical pipes - Orbit or Equivalent",
        "• Electrical Switches - Legrant / Fybros",
        "",
        "PAINTING:",
        "• Internal - Tractor emulsion - Any ISI Brand",
        "• External - ACE - Any ISI Brand"
      ],
      standard: [
        "TILING:",
        "• Flooring - 2'x2' Vetrified tile (Base price: 45/sqft)",
        "• Wall Tile - 2'x1' tile up to 7' height (Base price: 40/sqft)",
        "• Kitchen platform - Granite (Base price: 120/Sqft)",
        "",
        "JOINERYS:",
        "• Main Doors - Teak wood doors (Frame & door)",
        "• Inner Doors - Flush doors",
        "• Bath room doors - PVC Doors",
        "• Windows - UPVC windows with MS grills",
        "",
        "PLUMBING:",
        "• EWC & Washbasin - Parryware",
        "• Fittings - Hindware fittings",
        "• Kitchen Sink - SS Single bowl (up to 2800/-)",
        "• Pipes - Finolux PVC, Ashirvad - Upvc",
        "",
        "ELECTRICAL:",
        "• Electrical wires - Orbit or Equivalent",
        "• Electrical pipes - Orbit or Equivalent",
        "• Electrical Switches - Legrant / Fybros",
        "",
        "PAINTING:",
        "• Internal - Tractor emulsion - Any ISI Brand",
        "• External - ACE - Any ISI Brand"
      ],
      premium: [
        "TILING:",
        "• Flooring - 4'x2' Vetrified tile (Base price: 60/sqft)",
        "• Wall Tile - 2'x2' tile up to ceiling with highlighter tile (Base price: 55/sqft)",
        "• Wall tile in kitchen highlighter 2'x1' up to ceiling (Base price: 65/Sqft)",
        "• Kitchen platform - Granite (Base price: 160/Sqft)",
        "",
        "JOINERYS:",
        "• Doors - 1st class Teak wood doors (Main door)",
        "• Inner doors - Flush door with laminates",
        "• Bath room doors - WPC doors",
        "• Windows - UPVC windows with MS grills",
        "• Staircase railing - SS",
        "",
        "PLUMBING:",
        "• EWC & Washbasin - Parryware",
        "• Fittings - Hindware fittings",
        "• Kitchen quartz Sink with drain (up to 5000/-)",
        "• Pipes - Finolux PVC, Ashirvad - Upvc",
        "• Solar power provision",
        "",
        "ELECTRICAL:",
        "• Electrical wires - Finolex / Havelles or Equivalent",
        "• Electrical pipes - Orbit or Equivalent",
        "• Electrical Switches - Legrant / Fybros",
        "• Inverter Provisions",
        "",
        "PAINTING:",
        "• Internal - Royal emulsion - Any ISI Brand",
        "• External - Damp shealth primer & APEX - Any ISI Brand"
      ]
    }
  },
  exclusions: {
    title: "Exclusions",
    details: {
      basic: [
        "Compound wall with gate",
        "Sump & Septic tank",
        "Lift & its structure",
        "Drainage connection",
        "Electricity connection",
        "Local Authority Approval Expenses"
      ],
      standard: [
        "Compound wall with gate",
        "Sump & Septic tank",
        "Lift & its structure",
        "Drainage connection",
        "Electricity connection",
        "Local Authority Approval Expenses"
      ],
      premium: [
        "Compound wall with gate",
        "Sump & Septic tank",
        "Lift & its structure",
        "Drainage connection",
        "Electricity connection",
        "Local Authority Approval Expenses"
      ]
    }
  }
};

const ExpandablePackageTable = () => {
  const [expandedSections, setExpandedSections] = useState({
    design: true, // Default expanded
    structure: false,
    finishing: false,
    exclusions: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getPackageKey = (packageName) => {
    if (packageName.includes("Basic")) return "basic";
    if (packageName.includes("Standard")) return "standard";
    if (packageName.includes("Premium")) return "premium";
    return "basic";
  };

  return (
    <Container className="py-5">
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
            <div className={`package-card h-100 ${pkg.popular ? "popular-package" : ""}`}>
              {pkg.popular && (
                <div className="popular-badge">
                  <FaStar className="me-1" /> Most Popular
                </div>
              )}

              <div className="package-header text-center">
                <h3 className="package-title">{pkg.name}</h3>
                <div className="package-price">
                  <span className="price">{pkg.price}</span>
                  <span className="price-unit">{pkg.priceUnit}</span>
                </div>
              </div>

              <div className="package-features">
                {Object.entries(packageDetails).map(([sectionKey, section]) => {
                  const isExpanded = expandedSections[sectionKey];
                  const packageKey = getPackageKey(pkg.name);
                  const details = section.details[packageKey] || [];

                  return (
                    <div key={sectionKey} className="feature-section">
                      <div 
                        className="feature-header"
                        onClick={() => toggleSection(sectionKey)}
                      >
                        <span className="feature-title">{section.title}</span>
                        <span className="expand-icon">
                          {isExpanded ? <FaMinus /> : <FaPlus />}
                        </span>
                      </div>
                      
                      {isExpanded && (
                        <div className="feature-details">
                          {details.map((detail, idx) => (
                            <div key={idx} className="detail-item">
                              <span className="detail-text">
                                {detail === "" ? "\u00A0" : detail}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="package-footer text-center mt-auto">
                <button className={`btn btn-${pkg.color} btn-lg w-100`}>
                  Get Quote
                </button>
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
          border: 2px solid transparent;
          height: 100%;
          min-height: 600px;
        }

        .package-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }

        .popular-package {
          border-color: #ffc107;
          transform: scale(1.05);
        }

        .popular-badge {
          background: #ffc107;
          color: #000;
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
          background: #ffc107;
          color: #000;
          padding: 30px 20px;
        }

        .package-title {
          font-size: 1.2rem;
          font-weight: bold;
          margin-bottom: 15px;
          text-transform: uppercase;
        }

        .package-price {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .price {
          font-size: 2.2rem;
          font-weight: bold;
          line-height: 1;
          color: #000;
        }

        .price-unit {
          font-size: 0.9rem;
          opacity: 0.8;
          color: #000;
        }

        .package-features {
          padding: 20px;
          flex-grow: 1;
        }

        .feature-section {
          margin-bottom: 15px;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          overflow: hidden;
        }

        .feature-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 20px;
          background: #f8f9fa;
          cursor: pointer;
          transition: background-color 0.3s ease;
          border-bottom: 1px solid #e9ecef;
        }

        .feature-header:hover {
          background: #e9ecef;
        }

        .feature-title {
          font-weight: 600;
          color: #333;
          font-size: 1rem;
        }

        .expand-icon {
          color: #666;
          font-size: 1.2rem;
          transition: transform 0.3s ease;
        }

        .feature-details {
          padding: 15px 20px;
          background: #fff;
          animation: slideDown 0.3s ease;
          max-height: 400px;
          overflow-y: auto;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 400px;
          }
        }

        .detail-item {
          padding: 6px 0;
          border-bottom: 1px solid #f0f0f0;
          display: flex;
          align-items: flex-start;
        }

        .detail-item:last-child {
          border-bottom: none;
        }

        .detail-item:empty {
          padding: 3px 0;
          border-bottom: none;
        }

        .detail-text {
          color: #555;
          font-size: 0.85rem;
          line-height: 1.3;
          margin: 0;
        }

        .detail-text:empty {
          display: none;
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
          border: none;
        }

        .btn-primary {
          background: linear-gradient(45deg, #007bff, #0056b3);
          color: white;
        }

        .btn-success {
          background: linear-gradient(45deg, #28a745, #1e7e34);
          color: white;
        }

        .btn-warning {
          background: linear-gradient(45deg, #ffc107, #e0a800);
          color: #000;
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 768px) {
          .popular-package {
            transform: none;
          }

          .package-title {
            font-size: 1rem;
          }

          .price {
            font-size: 1.8rem;
          }

          .feature-title {
            font-size: 0.9rem;
          }

          .detail-text {
            font-size: 0.8rem;
          }

          .feature-header {
            padding: 12px 15px;
          }

          .feature-details {
            padding: 12px 15px;
          }
        }
      `}</style>
    </Container>
  );
};

export default ExpandablePackageTable;
