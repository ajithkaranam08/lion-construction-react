import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Form, Button, Pagination } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import LayoutTwo from '@/layouts/LayoutTwo';
import TitleSection from '@/components/titleSection';

const ShopPage = () => {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [budgetRange, setBudgetRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('newest');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(12);

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    filterAndSortProjects();
  }, [projects, searchTerm, categoryFilter, budgetRange, sortBy]);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/projects?status=ACTIVE');
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      } else {
        console.error('Failed to fetch projects');
        setProjects([]);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortProjects = () => {
    let filtered = [...projects];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(project => project.category === categoryFilter);
    }

    // Apply budget range filter
    if (budgetRange.min !== '') {
      filtered = filtered.filter(project => project.budget >= parseFloat(budgetRange.min));
    }
    if (budgetRange.max !== '') {
      filtered = filtered.filter(project => project.budget <= parseFloat(budgetRange.max));
    }

    // Apply sorting
    switch (sortBy) {
      case 'budget-low':
        filtered.sort((a, b) => (a.budget || 0) - (b.budget || 0));
        break;
      case 'budget-high':
        filtered.sort((a, b) => (b.budget || 0) - (a.budget || 0));
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    setFilteredProjects(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const getCategories = () => {
    const categories = ['all', ...new Set(projects.map(project => project.category))];
    return categories;
  };

  const getBudgetRange = () => {
    if (projects.length === 0) return { min: 0, max: 100000000 };
    const budgets = projects.map(p => p.budget).filter(b => b);
    if (budgets.length === 0) return { min: 0, max: 100000000 };
    return {
      min: Math.floor(Math.min(...budgets)),
      max: Math.ceil(Math.max(...budgets))
    };
  };

  const formatBudget = (budget) => {
    if (!budget) return 'Contact for Quote';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(budget);
  };

  const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Pagination
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <LayoutTwo>
        <div className="container py-5">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading projects...</p>
          </div>
        </div>
      </LayoutTwo>
    );
  }

  return (
    <LayoutTwo>
      <TitleSection
        sectionClasses="text-center"
        subTitle="Our Projects"
        title="Construction & Interior Solutions"
        description="Discover our comprehensive range of construction projects, interior design solutions, and professional services."
      />

      <div className="ltn__shop-area mb-120">
        <Container>
          {/* Filters and Search */}
          <Row className="mb-5">
            <Col lg={3} md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Search Projects</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Search by name, description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col lg={2} md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  {getCategories().map((category) => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col lg={2} md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Min Budget</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Min"
                  value={budgetRange.min}
                  onChange={(e) => setBudgetRange(prev => ({ ...prev, min: e.target.value }))}
                />
              </Form.Group>
            </Col>
            <Col lg={2} md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Max Budget</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Max"
                  value={budgetRange.max}
                  onChange={(e) => setBudgetRange(prev => ({ ...prev, max: e.target.value }))}
                />
              </Form.Group>
            </Col>
            <Col lg={3} md={12} className="mb-3">
              <Form.Group>
                <Form.Label>Sort By</Form.Label>
                <Form.Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="budget-low">Budget: Low to High</option>
                  <option value="budget-high">Budget: High to Low</option>
                  <option value="name">Name A-Z</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          {/* Clear Filters */}
          <Row className="mb-4">
            <Col xs={12}>
              <Button 
                variant="outline-secondary" 
                onClick={() => {
                  setSearchTerm('');
                  setCategoryFilter('all');
                  setBudgetRange({ min: '', max: '' });
                  setSortBy('newest');
                }}
                className="mb-3"
              >
                Clear All Filters
              </Button>
            </Col>
          </Row>

          {/* Results Count */}
          <div className="mb-4">
            <p className="text-muted">
              Showing {filteredProjects.length} of {projects.length} projects
            </p>
          </div>

          {/* Projects Grid */}
          {currentProjects.length > 0 ? (
            <>
              <Row>
                {currentProjects.map((project) => (
                  <Col lg={3} md={4} sm={6} className="mb-4" key={project.id}>
                    <Card className="project-card h-100 shadow-sm">
                                              {project.images && project.images.length > 0 && (
                          <div className="project-image-container">
                            <Image
                              src={project.images[0]}
                              alt={project.title}
                              width={300}
                              height={200}
                              className="card-img-top project-image"
                              style={{ objectFit: 'cover' }}
                            />
                            {project.featured && (
                              <Badge 
                                bg="warning" 
                                className="position-absolute top-0 start-0 m-2"
                              >
                                Featured
                              </Badge>
                            )}
                          </div>
                        )}
                      
                      <Card.Body className="d-flex flex-column">
                        <div className="mb-2">
                          <Badge bg="primary" className="me-2">
                            {project.category}
                          </Badge>
                          <Badge bg={project.status === 'ACTIVE' ? 'success' : 'secondary'}>
                            {project.status}
                          </Badge>
                        </div>
                        
                        <Card.Title className="h6 mb-2">
                          <Link 
                            href={`/shop/${project.slug || project.id}`}
                            className="text-decoration-none"
                          >
                            {project.title}
                          </Link>
                        </Card.Title>
                        
                        <Card.Text className="flex-grow-1 text-muted small">
                          {truncateText(project.shortDescription || project.description, 80)}
                        </Card.Text>
                        
                        <div className="mt-auto">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <div>
                              <span className="h6 text-primary mb-0">
                                {formatBudget(project.budget)}
                              </span>
                            </div>
                            <small className="text-muted">
                              {project.location || 'Location TBD'}
                            </small>
                          </div>
                          
                          <Button 
                            variant="outline-primary" 
                            size="sm" 
                            className="w-100"
                            onClick={() => router.push(`/shop/${project.slug || project.id}`)}
                          >
                            View Details
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>

              {/* Pagination */}
              {totalPages > 1 && (
                <Row className="mt-5">
                  <Col xs={12}>
                    <Pagination className="justify-content-center">
                      <Pagination.First 
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                      />
                      <Pagination.Prev 
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      />
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Pagination.Item
                          key={page}
                          active={page === currentPage}
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </Pagination.Item>
                      ))}
                      
                      <Pagination.Next 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      />
                      <Pagination.Last 
                        onClick={() => handlePageChange(totalPages)}
                        disabled={currentPage === totalPages}
                      />
                    </Pagination>
                  </Col>
                </Row>
              )}
            </>
          ) : (
            <div className="text-center py-5">
              <h4>No projects found</h4>
              <p className="text-muted">
                {searchTerm || categoryFilter !== 'all' || budgetRange.min || budgetRange.max
                  ? 'Try adjusting your search criteria or browse all categories.'
                  : 'Check back soon for new projects!'
                }
              </p>
              {(searchTerm || categoryFilter !== 'all' || budgetRange.min || budgetRange.max) && (
                <Button 
                  variant="primary" 
                  onClick={() => {
                    setSearchTerm('');
                    setCategoryFilter('all');
                    setBudgetRange({ min: '', max: '' });
                    setSortBy('newest');
                  }}
                >
                  View All Projects
                </Button>
              )}
            </div>
          )}
        </Container>
      </div>
    </LayoutTwo>
  );
};

export default ShopPage;
