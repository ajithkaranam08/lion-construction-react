import Link from "next/link";
import { Col, Container, Row, Table } from "react-bootstrap";
import TitleSection from "../titleSection";

const wrongIcon =
  "https://www.conceptventure.in/site-assets/images/icons/wrong.png";

const packages = ["Basic", "Standard", "Premium"];

const data = [
  {
    title: "Design & Drawings",
    values: ["✓", "✓", "✓"],
  },
  {
    title: "Architectural Layout 2D",
    values: ["✓", "✓", "✓"],
  },
  {
    title: "Structural Drawing",
    values: ["✓", "✓", "✓"],
  },
  {
    title: "Elevation Design 3D",
    values: ["✓", "✓", "✓"],
  },
  {
    title: "Plumbing Layout Drawings 2D",
    values: ["", "✓", "✓"],
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
    values: ["", "", "Waterproofing with Tile"],
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
          }}
          sectionClasses={"text-center mb-4"}
        />
      </Col>
    </Row>
    <div className="table-responsive">
      <Table bordered hover className="text-center align-middle table-custom">
        <thead>
          <tr>
            <th className="bg-light">Items</th>
            {packages.map((pkg) => (
              <th key={pkg}>{pkg}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <th className="text-start bg-light">{row.title}</th>
              {row.values.map((val, idx) => (
                <td key={idx}>
                  {val === "✓"
                    ? "✓"
                    : val || <img src={wrongIcon} alt="❌" height="16" />}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <th className="bg-light">Quote</th>
            {packages.map((_, i) => (
              <td key={i}>
                <Link href="/contact" className="theme-btn-1 btn btn-effect-1">
                  Get Quote
                </Link>
              </td>
            ))}
          </tr>
        </tbody>
      </Table>
    </div>
  </Container>
);

export default BuildingPackageTable;
