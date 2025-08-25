import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import LayoutTwo from '@/layouts/LayoutTwo';
import TitleSection from '@/components/titleSection';

const BlogPage = () => {
  const router = useRouter();
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    loadBlogPosts();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [blogPosts, searchTerm, categoryFilter]);

  const loadBlogPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/blog?status=PUBLISHED');
      if (response.ok) {
        const data = await response.json();
        setBlogPosts(data);
      } else {
        console.error('Failed to fetch blog posts');
        setBlogPosts([]);
      }
    } catch (error) {
      console.error('Error loading blog posts:', error);
      setBlogPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const filterPosts = () => {
    let filtered = blogPosts;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(post => post.category === categoryFilter);
    }

    setFilteredPosts(filtered);
  };

  const getCategories = () => {
    const categories = ['all', ...new Set(blogPosts.map(post => post.category))];
    return categories;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <LayoutTwo>
        <div className="container py-5">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading blog posts...</p>
          </div>
        </div>
      </LayoutTwo>
    );
  }

  return (
    <LayoutTwo>
      <TitleSection
        sectionClasses="text-center"
        subTitle="Our Blog"
        titleSectionData={{
          title: "Latest News & Insights",
          description: "Stay updated with the latest construction trends, tips, and industry insights from our experts."
          
        }}
        
      />

      <div className="ltn__blog-area mb-120">
        <Container>
          {/* Search and Filter Section */}
          <Row className="mb-5">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Search Posts</Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type="text"
                    placeholder="Search by title, content, or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <i className="fas fa-search position-absolute top-50 end-0 translate-middle-y me-3 text-muted"></i>
                </div>
              </Form.Group>
            </Col>
            <Col md={3}>
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
            <Col md={3}>
              <Form.Group>
                <Form.Label>&nbsp;</Form.Label>
                <div className="d-grid">
                  <Button 
                    variant="outline-secondary" 
                    onClick={() => {
                      setSearchTerm('');
                      setCategoryFilter('all');
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </Form.Group>
            </Col>
          </Row>

          {/* Results Count */}
          <div className="mb-4">
            <p className="text-muted">
              Showing {filteredPosts.length} of {blogPosts.length} blog posts
            </p>
          </div>

          {/* Blog Posts Grid */}
          {filteredPosts.length > 0 ? (
            <Row>
              {filteredPosts.map((post) => (
                <Col lg={4} md={6} className="mb-4" key={post.id}>
                  <Card className="blog-card h-100 shadow-sm">
                    {post.featuredImage && (
                      <div className="blog-image-container">
                        <Image
                          src={post.featuredImage}
                          alt={post.title}
                          width={400}
                          height={250}
                          className="card-img-top blog-image"
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    )}
                    <Card.Body className="d-flex flex-column">
                      <div className="mb-3">
                        <Badge bg="primary" className="me-2">
                          {post.category}
                        </Badge>
                        <small className="text-muted">
                          {formatDate(post.publishedAt || post.createdAt)}
                        </small>
                      </div>
                      
                      <Card.Title className="h5 mb-3">
                        <Link href={`/blog/${post.slug}`} className="text-decoration-none">
                          {post.title}
                        </Link>
                      </Card.Title>
                      
                      <Card.Text className="flex-grow-1">
                        {truncateText(post.excerpt || post.content, 120)}
                      </Card.Text>
                      
                      <div className="mt-auto">
                        <div className="d-flex justify-content-between align-items-center">
                          <small className="text-muted">
                            <i className="fas fa-user me-1"></i>
                            {post.author?.name || 'Admin'}
                          </small>
                          <small className="text-muted">
                            <i className="fas fa-eye me-1"></i>
                            {post.views || 0} views
                          </small>
                        </div>
                        <Button 
                          variant="outline-primary" 
                          size="sm" 
                          className="mt-2 w-100"
                          onClick={() => router.push(`/blog/${post.slug}`)}
                        >
                          Read More
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <div className="text-center py-5">
              <h4>No blog posts found</h4>
              <p className="text-muted">
                {searchTerm || categoryFilter !== 'all' 
                  ? 'Try adjusting your search criteria or browse all categories.'
                  : 'Check back soon for new content!'
                }
              </p>
              {(searchTerm || categoryFilter !== 'all') && (
                <Button 
                  variant="primary" 
                  onClick={() => {
                    setSearchTerm('');
                    setCategoryFilter('all');
                  }}
                >
                  View All Posts
                </Button>
              )}
            </div>
          )}
        </Container>
      </div>
    </LayoutTwo>
  );
};

export default BlogPage;
