import { useState, useEffect } from "react";
import { Col, Container, Row, Form, Table, Alert } from "react-bootstrap";
import TitleSection from "../titleSection";
import { FaCalculator, FaHome, FaRuler, FaMoneyBillWave } from "react-icons/fa";

const packages = [
  {
    name: "Basic Package",
    pricePerSqft: 1999,
    color: "primary",
    description: "Essential construction package"
  },
  {
    name: "Standard Package", 
    pricePerSqft: 2199,
    color: "success",
    description: "Most popular choice",
    popular: true
  },
  {
    name: "Premium Package",
    pricePerSqft: 2499,
    color: "warning", 
    description: "Premium materials & finishes"
  }
];

const floorOptions = [
  { value: "G", label: "Ground Floor Only", floors: 1 },
  { value: "G+1", label: "Ground + 1 Floor", floors: 2 },
  { value: "G+2", label: "Ground + 2 Floors", floors: 3 },
  { value: "G+3", label: "Ground + 3 Floors", floors: 4 },
  { value: "G+4", label: "Ground + 4 Floors", floors: 5 },
  { value: "G+5", label: "Ground + 5 Floors", floors: 6 }
];

const PackageCalculationTable = () => {
  const [formData, setFormData] = useState({
    selectedPackage: "Basic Package",
    selectedFloors: "G",
    floorAreas: {
      ground: '',
      first: '',
      second: '',
      third: '',
      fourth: '',
      fifth: ''
    },
    additionalItems: {
       waterSump: '',
      septicTank: '',
      compoundWallLength: '',
      compoundWallHeight: ''
    }
  });

  const [calculations, setCalculations] = useState({
    totalArea: 0,
    totalCost: 0,
    breakdown: []
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFloorAreaChange = (floor, value) => {
    setFormData(prev => ({
      ...prev,
      floorAreas: {
        ...prev.floorAreas,
        [floor]: value
      }
    }));
  };

  const handleAdditionalItemChange = (item, value) => {
    setFormData(prev => ({
      ...prev,
      additionalItems: {
        ...prev.additionalItems,
        [item]: value
      }
    }));
  };

  const calculateCosts = () => {
    const selectedPkg = packages.find(pkg => pkg.name === formData.selectedPackage);
    const selectedFloorOption = floorOptions.find(opt => opt.value === formData.selectedFloors);
    
    if (!selectedPkg || !selectedFloorOption) return;

    const breakdown = [];
    let totalArea = 0;
    let totalCost = 0;

    // Calculate floor areas
    const floorNames = ['ground', 'first', 'second', 'third', 'fourth', 'fifth'];
    const floorLabels = ['Ground Floor', 'First Floor', 'Second Floor', 'Third Floor', 'Fourth Floor', 'Fifth Floor'];
    
    floorNames.forEach((floor, index) => {
      if (index < selectedFloorOption.floors) {
        const area = parseFloat(formData.floorAreas[floor]) || 0;
        if (area > 0) {
          const cost = area * selectedPkg.pricePerSqft;
          totalArea += area;
          totalCost += cost;
          
          breakdown.push({
            work: `Enter required Built up Area for ${floorLabels[index]}`,
            area: area,
            unit: 'sqft',
            rate: `Rs.${selectedPkg.pricePerSqft}`,
            cost: cost
          });
        }
      }
    });

    // Calculate additional items
    const waterSump = parseFloat(formData.additionalItems.waterSump) || 0;
    if (waterSump > 0) {
      const cost = waterSump * 24;
      totalCost += cost;
      breakdown.push({
        work: 'Size of RCC Water Sump (A 4 member family will require 9000 liter capacity)',
        area: waterSump,
        unit: 'ltr',
        rate: 'Rs.24',
        cost: cost
      });
    }

    const septicTank = parseFloat(formData.additionalItems.septicTank) || 0;
    if (septicTank > 0) {
      const cost = septicTank * 24;
      totalCost += cost;
      breakdown.push({
        work: 'Size of Septic Tank',
        area: septicTank,
        unit: 'ltr',
        rate: 'Rs.24',
        cost: cost
      });
    }

    const compoundLength = parseFloat(formData.additionalItems.compoundWallLength) || 0;
    const compoundHeight = parseFloat(formData.additionalItems.compoundWallHeight) || 0;
    if (compoundLength > 0 && compoundHeight > 0) {
      const area = compoundLength * compoundHeight;
      const cost = area * 425;
      totalCost += cost;
      breakdown.push({
        work: 'Plain Compound Wall',
        area: `${compoundLength} × ${compoundHeight}`,
        unit: 'sqft',
        rate: 'Rs.425',
        cost: cost
      });
    }

    setCalculations({
      totalArea,
      totalCost,
      breakdown
    });
  };

  useEffect(() => {
    calculateCosts();
  }, [formData]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getSelectedPackage = () => {
    return packages.find(pkg => pkg.name === formData.selectedPackage);
  };

  const getSelectedFloorOption = () => {
    return floorOptions.find(opt => opt.value === formData.selectedFloors);
  };

  return (
    <Container className="py-5">
      <Row>
        <Col xs={12}>
          <TitleSection
            titleSectionData={{
              subTitle: "Construction Cost Calculator",
              title: "Calculate Your Project Cost",
            }}
            sectionClasses={"text-center mb-5"}
          />
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col lg={10}>
          <div className="calculator-container">
            {/* Header Controls */}
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-bold">No. of Floors</Form.Label>
                  <Form.Select
                    value={formData.selectedFloors}
                    onChange={(e) => handleInputChange('selectedFloors', e.target.value)}
                    className="form-control-lg"
                  >
                    {floorOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-bold">Package</Form.Label>
                  <Form.Select
                    value={formData.selectedPackage}
                    onChange={(e) => handleInputChange('selectedPackage', e.target.value)}
                    className="form-control-lg"
                  >
                    {packages.map(pkg => (
                      <option key={pkg.name} value={pkg.name}>
                        {pkg.name} @ {pkg.pricePerSqft}/sqft
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            {/* Calculation Table */}
            <div className="table-responsive">
              <Table striped bordered hover className="calculation-table">
                <thead className="table-dark">
                  <tr>
                    <th style={{ width: '40%' }}>Work</th>
                    <th style={{ width: '15%' }}>Area</th>
                    <th style={{ width: '10%' }}>Unit</th>
                    <th style={{ width: '15%' }}>Rate</th>
                    <th style={{ width: '20%' }}>Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Floor Area Rows */}
                  {(() => {
                    const selectedFloorOption = getSelectedFloorOption();
                    const floorNames = ['ground', 'first', 'second', 'third', 'fourth', 'fifth'];
                    const floorLabels = ['Ground Floor', 'First Floor', 'Second Floor', 'Third Floor', 'Fourth Floor', 'Fifth Floor'];
                    
                    return floorNames.map((floor, index) => {
                      if (index < selectedFloorOption.floors) {
                        const area = parseFloat(formData.floorAreas[floor]) || 0;
                        const selectedPkg = getSelectedPackage();
                        const cost = area * selectedPkg.pricePerSqft;
                        
                        return (
                          <tr key={floor}>
                            <td className="fw-bold" data-label="Work">
                              Enter required Built up Area for {floorLabels[index]}
                            </td>
                            <td data-label="Area">
                              <Form.Control
                                type="number"
                                placeholder="Area in sqft"
                                value={formData.floorAreas[floor]}
                                onChange={(e) => handleFloorAreaChange(floor, e.target.value)}
                                min="0"
                                step="0.01"
                              />
                            </td>
                            <td className="text-center" data-label="Unit">sqft</td>
                            <td className="text-center" data-label="Rate">Rs.{selectedPkg.pricePerSqft}</td>
                            <td className="text-end fw-bold" data-label="Cost">
                              Rs. {cost.toLocaleString('en-IN')}
                            </td>
                          </tr>
                        );
                      }
                      return null;
                    });
                  })()}

                  {/* Additional Items */}
                  <tr>
                    <td className="fw-bold" data-label="Work">
                      Size of RCC Water Sump (A 4 member family will require 9000 liter capacity)
                    </td>
                    <td data-label="Area">
                      <Form.Control
                        type="number"
                        placeholder="No. of Liters"
                        value={formData.additionalItems.waterSump}
                        onChange={(e) => handleAdditionalItemChange('waterSump', e.target.value)}
                        min="0"
                        step="0.01"
                      />
                    </td>
                    <td className="text-center" data-label="Unit">ltr</td>
                    <td className="text-center" data-label="Rate">Rs.24</td>
                    <td className="text-end fw-bold" data-label="Cost">
                      Rs. {((parseFloat(formData.additionalItems.waterSump) || 0) * 24).toLocaleString('en-IN')}
                    </td>
                  </tr>

                  <tr>
                    <td className="fw-bold" data-label="Work">Size of Septic Tank</td>
                    <td data-label="Area">
                      <Form.Control
                        type="number"
                        placeholder="No. of Liters"
                        value={formData.additionalItems.septicTank}
                        onChange={(e) => handleAdditionalItemChange('septicTank', e.target.value)}
                        min="0"
                        step="0.01"
                      />
                    </td>
                    <td className="text-center" data-label="Unit">ltr</td>
                    <td className="text-center" data-label="Rate">Rs.24</td>
                    <td className="text-end fw-bold" data-label="Cost">
                      Rs. {((parseFloat(formData.additionalItems.septicTank) || 0) * 24).toLocaleString('en-IN')}
                    </td>
                  </tr>

                  <tr>
                    <td className="fw-bold" data-label="Work">Plain Compound Wall</td>
                    <td data-label="Area">
                      <div className="d-flex gap-2">
                        <Form.Control
                          type="number"
                          placeholder="Length"
                          value={formData.additionalItems.compoundWallLength}
                          onChange={(e) => handleAdditionalItemChange('compoundWallLength', e.target.value)}
                          min="0"
                          step="0.01"
                        />
                        <Form.Control
                          type="number"
                          placeholder="Height"
                          value={formData.additionalItems.compoundWallHeight}
                          onChange={(e) => handleAdditionalItemChange('compoundWallHeight', e.target.value)}
                          min="0"
                          step="0.01"
                        />
                      </div>
                    </td>
                    <td className="text-center" data-label="Unit">sqft</td>
                    <td className="text-center" data-label="Rate">Rs.425</td>
                    <td className="text-end fw-bold" data-label="Cost">
                      Rs. {(() => {
                        const length = parseFloat(formData.additionalItems.compoundWallLength) || 0;
                        const height = parseFloat(formData.additionalItems.compoundWallHeight) || 0;
                        return (length * height * 425).toLocaleString('en-IN');
                      })()}
                    </td>
                  </tr>

                  {/* Total Row */}
                  <tr className="table-success">
                    <td colSpan="4" className="text-end fw-bold fs-5" data-label="Work">
                      Total Construction Cost
                    </td>
                    <td className="text-end fw-bold fs-5 text-primary" data-label="Cost">
                      Rs. {calculations.totalCost.toLocaleString('en-IN')}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </Col>
      </Row>

      <style jsx>{`
        .calculator-container {
          background: #fff;
          border-radius: 15px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
          padding: 30px;
        }
        
        .calculation-table {
          margin-bottom: 0;
        }
        
        .calculation-table th {
          background-color: #343a40;
          color: white;
          font-weight: 600;
          text-align: center;
          vertical-align: middle;
          padding: 15px 10px;
        }
        
        .calculation-table td {
          vertical-align: middle;
          padding: 12px 10px;
        }
        
        .calculation-table tbody tr:hover {
          background-color: #f8f9fa;
        }
        
        .form-control {
          border-radius: 8px;
          border: 1px solid #ced4da;
          transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }
        
        .form-control:focus {
          border-color: #28a745;
          box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
        }
        
        .form-select {
          border-radius: 8px;
          border: 1px solid #ced4da;
        }
        
        .form-select:focus {
          border-color: #28a745;
          box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
        }
        
        .table-success {
          background-color: #d1e7dd !important;
        }
        
        .table-success td {
          border-color: #badbcc;
        }
        
        /* Tablet and below */
        @media (max-width: 992px) {
          .calculator-container {
            padding: 20px;
            margin: 0 10px;
          }
          
          .calculation-table th,
          .calculation-table td {
            padding: 10px 8px;
            font-size: 0.9rem;
          }
          
          .calculation-table th {
            font-size: 0.85rem;
          }
        }
        
        /* Mobile landscape */
        @media (max-width: 768px) {
          .calculator-container {
            padding: 15px;
            margin: 0 5px;
            border-radius: 10px;
          }
          
          .calculation-table {
            font-size: 0.85rem;
          }
          
          .calculation-table th,
          .calculation-table td {
            padding: 8px 5px;
            font-size: 0.8rem;
          }
          
          .calculation-table th {
            font-size: 0.75rem;
            padding: 10px 5px;
          }
          
          .d-flex.gap-2 {
            flex-direction: column;
            gap: 0.5rem !important;
          }
          
          .form-control,
          .form-select {
            font-size: 0.85rem;
            padding: 8px 12px;
          }
          
          .fw-bold {
            font-size: 0.8rem;
          }
        }
        
        /* Mobile portrait */
        @media (max-width: 576px) {
          .calculator-container {
            padding: 10px;
            margin: 0;
            border-radius: 8px;
          }
          
          .calculation-table {
            font-size: 0.75rem;
          }
          
          .calculation-table th,
          .calculation-table td {
            padding: 6px 3px;
            font-size: 0.7rem;
          }
          
          .calculation-table th {
            font-size: 0.65rem;
            padding: 8px 3px;
          }
          
          .form-control,
          .form-select {
            font-size: 0.8rem;
            padding: 6px 10px;
          }
          
          .fw-bold {
            font-size: 0.75rem;
          }
          
          .fs-5 {
            font-size: 1rem !important;
          }
          
          /* Stack table columns on very small screens */
          .calculation-table,
          .calculation-table thead,
          .calculation-table tbody,
          .calculation-table th,
          .calculation-table td,
          .calculation-table tr {
            display: block;
          }
          
          .calculation-table thead tr {
            position: absolute;
            top: -9999px;
            left: -9999px;
          }
          
          .calculation-table tr {
            border: 1px solid #ccc;
            margin-bottom: 10px;
            padding: 10px;
            border-radius: 5px;
            background: #f9f9f9;
          }
          
          .calculation-table td {
            border: none;
            position: relative;
            padding-left: 50%;
            padding-top: 5px;
            padding-bottom: 5px;
          }
          
          .calculation-table td:before {
            content: attr(data-label) ": ";
            position: absolute;
            left: 6px;
            width: 45%;
            padding-right: 10px;
            white-space: nowrap;
            font-weight: bold;
            color: #333;
          }
          
          .calculation-table td[data-label="Work"]:before {
            content: "Work: ";
          }
          
          .calculation-table td[data-label="Area"]:before {
            content: "Area: ";
          }
          
          .calculation-table td[data-label="Unit"]:before {
            content: "Unit: ";
          }
          
          .calculation-table td[data-label="Rate"]:before {
            content: "Rate: ";
          }
          
          .calculation-table td[data-label="Cost"]:before {
            content: "Cost: ";
          }
        }
        
        /* Extra small devices */
        @media (max-width: 400px) {
          .calculator-container {
            padding: 8px;
          }
          
          .calculation-table tr {
            padding: 8px;
            margin-bottom: 8px;
          }
          
          .calculation-table td {
            padding-left: 45%;
            font-size: 0.65rem;
          }
          
          .calculation-table td:before {
            font-size: 0.6rem;
            width: 40%;
          }
        }
      `}</style>
    </Container>
  );
};

export default PackageCalculationTable;
