import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AdminLayout from '@/components/admin/AdminLayout';
import { setSeoData, updatePageSeo, updateGlobalSeo } from '@/store/slices/seo-slice';
import { Card, Row, Col, Form, Button, Nav, Tab, Alert } from 'react-bootstrap';
import { FaSearch, FaGlobe, FaSave, FaEdit } from 'react-icons/fa';
import seoData from '@/data/seo/index.json';

const SeoManagement = () => {
  const dispatch = useDispatch();
  const { seoData: storeSeoData } = useSelector((state) => state.seo);
  const [activeTab, setActiveTab] = useState('global');
  const [formData, setFormData] = useState({});
  const [savedMessage, setSavedMessage] = useState('');

  useEffect(() => {
    // Load SEO data from JSON file
    dispatch(setSeoData(seoData));
    setFormData(seoData);
  }, [dispatch]);

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handlePageInputChange = (page, field, value) => {
    setFormData(prev => ({
      ...prev,
      pages: {
        ...prev.pages,
        [page]: {
          ...prev.pages[page],
          [field]: value
        }
      }
    }));
  };

  const handleSave = (section) => {
    if (section === 'global') {
      dispatch(updateGlobalSeo(formData.global));
    } else {
      dispatch(updatePageSeo({ page: section, seoData: formData.pages[section] }));
    }
    
    // Save to localStorage (in production, this would be an API call)
    localStorage.setItem('seoData', JSON.stringify(formData));
    
    setSavedMessage(`${section} SEO settings saved successfully!`);
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const GlobalSeoForm = () => (
    <Card>
      <Card.Header>
        <h5 className="mb-0 d-flex align-items-center">
          <FaGlobe className="me-2" />
          Global SEO Settings
        </h5>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Site Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.global?.siteName || ''}
                onChange={(e) => handleInputChange('global', 'siteName', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Default Title</Form.Label>
              <Form.Control
                type="text"
                value={formData.global?.defaultTitle || ''}
                onChange={(e) => handleInputChange('global', 'defaultTitle', e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Default Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={formData.global?.defaultDescription || ''}
            onChange={(e) => handleInputChange('global', 'defaultDescription', e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Default Keywords</Form.Label>
          <Form.Control
            type="text"
            value={formData.global?.defaultKeywords || ''}
            onChange={(e) => handleInputChange('global', 'defaultKeywords', e.target.value)}
            placeholder="Separate keywords with commas"
          />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Twitter Handle</Form.Label>
              <Form.Control
                type="text"
                value={formData.global?.twitterHandle || ''}
                onChange={(e) => handleInputChange('global', 'twitterHandle', e.target.value)}
                placeholder="@username"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Language</Form.Label>
              <Form.Select
                value={formData.global?.language || 'en'}
                onChange={(e) => handleInputChange('global', 'language', e.target.value)}
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="ta">Tamil</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" onClick={() => handleSave('global')}>
          <FaSave className="me-2" />
          Save Global Settings
        </Button>
      </Card.Body>
    </Card>
  );

  const PageSeoForm = ({ page, pageData }) => (
    <Card className="mb-4">
      <Card.Header>
        <h5 className="mb-0 text-capitalize">{page} Page SEO</h5>
      </Card.Header>
      <Card.Body>
        <Form.Group className="mb-3">
          <Form.Label>Page Title</Form.Label>
          <Form.Control
            type="text"
            value={pageData?.title || ''}
            onChange={(e) => handlePageInputChange(page, 'title', e.target.value)}
          />
          <Form.Text className="text-muted">
            Recommended length: 50-60 characters
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Meta Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={pageData?.description || ''}
            onChange={(e) => handlePageInputChange(page, 'description', e.target.value)}
          />
          <Form.Text className="text-muted">
            Recommended length: 150-160 characters
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Keywords</Form.Label>
          <Form.Control
            type="text"
            value={pageData?.keywords || ''}
            onChange={(e) => handlePageInputChange(page, 'keywords', e.target.value)}
            placeholder="Separate keywords with commas"
          />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>OG Title</Form.Label>
              <Form.Control
                type="text"
                value={pageData?.ogTitle || ''}
                onChange={(e) => handlePageInputChange(page, 'ogTitle', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>OG Image</Form.Label>
              <Form.Control
                type="text"
                value={pageData?.ogImage || ''}
                onChange={(e) => handlePageInputChange(page, 'ogImage', e.target.value)}
                placeholder="/img/example.jpg"
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>OG Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            value={pageData?.ogDescription || ''}
            onChange={(e) => handlePageInputChange(page, 'ogDescription', e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Canonical URL</Form.Label>
          <Form.Control
            type="text"
            value={pageData?.canonicalUrl || ''}
            onChange={(e) => handlePageInputChange(page, 'canonicalUrl', e.target.value)}
            placeholder="/page-url"
          />
        </Form.Group>

        <Button variant="primary" onClick={() => handleSave(page)}>
          <FaSave className="me-2" />
          Save {page} SEO
        </Button>
      </Card.Body>
    </Card>
  );

  return (
    <AdminLayout title="SEO Management">
      {savedMessage && (
        <Alert variant="success" className="mb-4">
          {savedMessage}
        </Alert>
      )}

      <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
        <Nav variant="tabs" className="mb-4">
          <Nav.Item>
            <Nav.Link eventKey="global">
              <FaGlobe className="me-2" />
              Global Settings
            </Nav.Link>
          </Nav.Item>
          {formData.pages && Object.keys(formData.pages).map((page) => (
            <Nav.Item key={page}>
              <Nav.Link eventKey={page}>
                <FaSearch className="me-2" />
                {page.charAt(0).toUpperCase() + page.slice(1)}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="global">
            <GlobalSeoForm />
          </Tab.Pane>
          
          {formData.pages && Object.entries(formData.pages).map(([page, pageData]) => (
            <Tab.Pane key={page} eventKey={page}>
              <PageSeoForm page={page} pageData={pageData} />
            </Tab.Pane>
          ))}
        </Tab.Content>
      </Tab.Container>
    </AdminLayout>
  );
};

export default SeoManagement;