import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, Row, Col, Form, Button, Alert, Tab, Nav } from 'react-bootstrap';
import { FaCog, FaDatabase, FaShield, FaEnvelope, FaSave } from 'react-icons/fa';

const AdminSettings = () => {
  const [savedMessage, setSavedMessage] = useState('');
  const [settings, setSettings] = useState({
    siteName: 'Lion Construction',
    siteEmail: 'info@lionconstruction.com',
    sitePhone: '+91-897-876-987-90',
    siteAddress: 'Chennai, Tamil Nadu, India',
    maintenanceMode: false,
    allowRegistration: true,
    emailNotifications: true,
    smsNotifications: false,
    backupFrequency: 'daily',
    maxFileSize: '10',
    allowedFileTypes: 'jpg,jpeg,png,pdf,doc,docx'
  });

  const handleInputChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = (section) => {
    // Save to localStorage (in production, this would be an API call)
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    
    setSavedMessage(`${section} settings saved successfully!`);
    setTimeout(() => setSavedMessage(''), 3000);
  };

  return (
    <AdminLayout title="Settings">
      {savedMessage && (
        <Alert variant="success" className="mb-4">
          {savedMessage}
        </Alert>
      )}

      <Tab.Container defaultActiveKey="general">
        <Nav variant="tabs" className="mb-4">
          <Nav.Item>
            <Nav.Link eventKey="general">
              <FaCog className="me-2" />
              General
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="security">
              <FaShield className="me-2" />
              Security
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="notifications">
              <FaEnvelope className="me-2" />
              Notifications
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="system">
              <FaDatabase className="me-2" />
              System
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="general">
            <Card>
              <Card.Header>
                <h5 className="mb-0">General Settings</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Site Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={settings.siteName}
                        onChange={(e) => handleInputChange('siteName', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Site Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={settings.siteEmail}
                        onChange={(e) => handleInputChange('siteEmail', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Site Phone</Form.Label>
                      <Form.Control
                        type="text"
                        value={settings.sitePhone}
                        onChange={(e) => handleInputChange('sitePhone', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Site Address</Form.Label>
                      <Form.Control
                        type="text"
                        value={settings.siteAddress}
                        onChange={(e) => handleInputChange('siteAddress', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button variant="primary" onClick={() => handleSave('General')}>
                  <FaSave className="me-2" />
                  Save General Settings
                </Button>
              </Card.Body>
            </Card>
          </Tab.Pane>

          <Tab.Pane eventKey="security">
            <Card>
              <Card.Header>
                <h5 className="mb-0">Security Settings</h5>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="maintenance-mode"
                    label="Maintenance Mode"
                    checked={settings.maintenanceMode}
                    onChange={(e) => handleInputChange('maintenanceMode', e.target.checked)}
                  />
                  <Form.Text className="text-muted">
                    Enable this to put the site in maintenance mode
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="allow-registration"
                    label="Allow User Registration"
                    checked={settings.allowRegistration}
                    onChange={(e) => handleInputChange('allowRegistration', e.target.checked)}
                  />
                </Form.Group>

                <Button variant="primary" onClick={() => handleSave('Security')}>
                  <FaSave className="me-2" />
                  Save Security Settings
                </Button>
              </Card.Body>
            </Card>
          </Tab.Pane>

          <Tab.Pane eventKey="notifications">
            <Card>
              <Card.Header>
                <h5 className="mb-0">Notification Settings</h5>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="email-notifications"
                    label="Email Notifications"
                    checked={settings.emailNotifications}
                    onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="sms-notifications"
                    label="SMS Notifications"
                    checked={settings.smsNotifications}
                    onChange={(e) => handleInputChange('smsNotifications', e.target.checked)}
                  />
                </Form.Group>

                <Button variant="primary" onClick={() => handleSave('Notifications')}>
                  <FaSave className="me-2" />
                  Save Notification Settings
                </Button>
              </Card.Body>
            </Card>
          </Tab.Pane>

          <Tab.Pane eventKey="system">
            <Card>
              <Card.Header>
                <h5 className="mb-0">System Settings</h5>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Backup Frequency</Form.Label>
                  <Form.Select
                    value={settings.backupFrequency}
                    onChange={(e) => handleInputChange('backupFrequency', e.target.value)}
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </Form.Select>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Max File Size (MB)</Form.Label>
                      <Form.Control
                        type="number"
                        value={settings.maxFileSize}
                        onChange={(e) => handleInputChange('maxFileSize', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Allowed File Types</Form.Label>
                      <Form.Control
                        type="text"
                        value={settings.allowedFileTypes}
                        onChange={(e) => handleInputChange('allowedFileTypes', e.target.value)}
                        placeholder="jpg,png,pdf"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button variant="primary" onClick={() => handleSave('System')}>
                  <FaSave className="me-2" />
                  Save System Settings
                </Button>
              </Card.Body>
            </Card>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </AdminLayout>
  );
};

export default AdminSettings;