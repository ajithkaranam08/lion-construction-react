import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Form, Badge, Alert } from 'react-bootstrap';
import { FaPlus, FaSearch, FaFilter } from 'react-icons/fa';
import AdminCard from './ui/AdminCard';
import AdminTable from './ui/AdminTable';
import AdminModal from './ui/AdminModal';
import { formatDate, truncateText } from '@/lib/admin-helpers';

const BlogManagement = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [viewPost, setViewPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: '',
    status: 'DRAFT',
    featuredImage: '',
    metaDescription: '',
    seoTitle: ''
  });

  useEffect(() => {
    loadBlogPosts();
  }, []);

  const loadBlogPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/blog');
      if (response.ok) {
        const data = await response.json();
        setBlogPosts(data);
      } else {
        console.error('Failed to fetch blog posts');
      }
    } catch (error) {
      console.error('Error loading blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateBlogForm = () => {
    const requiredFields = ['title', 'content', 'excerpt', 'category'];
    const validationErrors = {};
    
    requiredFields.forEach(field => {
      if (!formData[field] || formData[field].trim() === '') {
        validationErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });
    
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateBlogForm()) return;
    
    setLoading(true);
    
    try {
      const postData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        authorId: 'admin-user-id', // This should come from authentication
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        publishedAt: formData.status === 'PUBLISHED' ? new Date().toISOString() : null
      };

      const url = editingPost ? `/api/blog/${editingPost.id}` : '/api/blog';
      const method = editingPost ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        await loadBlogPosts(); // Reload data
        handleCloseModal();
        alert(editingPost ? 'Blog post updated successfully!' : 'Blog post created successfully!');
      } else {
        throw new Error('Failed to save blog post');
      }
    } catch (error) {
      console.error('Error saving blog post:', error);
      alert('Error saving blog post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      category: post.category,
      tags: post.tags.join(', '),
      status: post.status,
      featuredImage: post.featuredImage || '',
      metaDescription: post.metaDescription || '',
      seoTitle: post.seoTitle || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      try {
        const response = await fetch(`/api/blog/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          await loadBlogPosts(); // Reload data
          alert('Blog post deleted successfully!');
        } else {
          throw new Error('Failed to delete blog post');
        }
      } catch (error) {
        console.error('Error deleting blog post:', error);
        alert('Error deleting blog post. Please try again.');
      }
    }
  };

  const handleView = (post) => {
    setViewPost(post);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingPost(null);
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      category: '',
      tags: '',
      status: 'DRAFT',
      featuredImage: '',
      metaDescription: '',
      seoTitle: ''
    });
    setErrors({});
  };

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getCategories = () => {
    const categories = ['all', ...new Set(blogPosts.map(post => post.category))];
    return categories;
  };

  const tableColumns = [
    {
      key: 'title',
      label: 'Post',
      render: (value, row) => (
        <div>
          <div className="fw-bold">{value}</div>
          <small className="text-muted">{truncateText(row.excerpt, 60)}</small>
        </div>
      )
    },
    {
      key: 'category',
      label: 'Category'
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <Badge bg={value === 'PUBLISHED' ? 'success' : value === 'DRAFT' ? 'secondary' : 'warning'}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      )
    },
    {
      key: 'author',
      label: 'Author',
      render: (value) => value?.name || 'Admin'
    },
    {
      key: 'createdAt',
      label: 'Created',
      render: (value) => formatDate(value)
    }
  ];

  return (
    <div className="admin-blog-management">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-1">Blog Management</h1>
          <p className="text-muted mb-0">Manage your blog posts and content</p>
        </div>
        <Button 
          variant="primary" 
          onClick={() => setShowModal(true)}
          className="d-flex align-items-center"
        >
          <FaPlus className="me-2" />
          New Post
        </Button>
      </div>

      {/* Filters */}
      <AdminCard className="mb-4">
        <Row>
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
                <FaSearch className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted" />
              </div>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Category Filter</Form.Label>
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
                  <FaFilter className="me-2" />
                  Clear Filters
                </Button>
              </div>
            </Form.Group>
          </Col>
        </Row>
      </AdminCard>

      {/* Blog Posts Table */}
      <AdminCard 
        title={`Blog Posts (${filteredPosts.length})`}
        subtitle={`Showing ${filteredPosts.length} of ${blogPosts.length} total posts`}
      >
        <AdminTable
          data={filteredPosts}
          columns={tableColumns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
          loading={loading}
          emptyMessage="No blog posts found. Create your first post to get started!"
        />
      </AdminCard>

      {/* Blog Post Form Modal */}
      <AdminModal
        show={showModal}
        onHide={handleCloseModal}
        title={editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}
        size="xl"
        onSave={handleSubmit}
        saveText={editingPost ? 'Update Post' : 'Create Post'}
        loading={loading}
      >
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={8}>
              <Form.Group className="mb-3">
                <Form.Label>Post Title *</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  isInvalid={!!errors.title}
                  placeholder="Enter post title"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Content *</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={8}
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  isInvalid={!!errors.content}
                  placeholder="Write your blog post content here..."
                />
                <Form.Control.Feedback type="invalid">
                  {errors.content}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Excerpt *</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange('excerpt', e.target.value)}
                  isInvalid={!!errors.excerpt}
                  placeholder="Brief summary of the post"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.excerpt}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Category *</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  isInvalid={!!errors.category}
                  placeholder="e.g., Construction, Interior Design"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.category}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                >
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                  <option value="ARCHIVED">Archived</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Tags</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.tags}
                  onChange={(e) => handleInputChange('tags', e.target.value)}
                  placeholder="Separate tags with commas"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Featured Image URL</Form.Label>
                <Form.Control
                  type="url"
                  value={formData.featuredImage}
                  onChange={(e) => handleInputChange('featuredImage', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Meta Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={formData.metaDescription}
                  onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                  placeholder="SEO meta description"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>SEO Title</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.seoTitle}
                  onChange={(e) => handleInputChange('seoTitle', e.target.value)}
                  placeholder="SEO optimized title"
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </AdminModal>

      {/* View Blog Post Modal */}
      <AdminModal
        show={!!viewPost}
        onHide={() => setViewPost(null)}
        title={viewPost?.title}
        size="lg"
        showFooter={false}
      >
        {viewPost && (
          <div>
            <Row>
              <Col md={6}>
                <h6>Basic Information</h6>
                <p><strong>Title:</strong> {viewPost.title}</p>
                <p><strong>Category:</strong> {viewPost.category}</p>
                <p><strong>Status:</strong> 
                  <Badge bg={viewPost.status === 'PUBLISHED' ? 'success' : 'secondary'} className="ms-2">
                    {viewPost.status}
                  </Badge>
                </p>
                <p><strong>Author:</strong> {viewPost.author?.name || 'Admin'}</p>
                <p><strong>Created:</strong> {formatDate(viewPost.createdAt)}</p>
              </Col>
              <Col md={6}>
                <h6>SEO & Meta</h6>
                <p><strong>Meta Description:</strong> {viewPost.metaDescription || 'Not set'}</p>
                <p><strong>SEO Title:</strong> {viewPost.seoTitle || 'Not set'}</p>
                <p><strong>Tags:</strong> {viewPost.tags.join(', ') || 'No tags'}</p>
                <p><strong>Views:</strong> {viewPost.views || 0}</p>
              </Col>
            </Row>
            <hr />
            <div>
              <h6>Content</h6>
              <p>{viewPost.content}</p>
              
              {viewPost.excerpt && (
                <>
                  <h6>Excerpt</h6>
                  <p>{viewPost.excerpt}</p>
                </>
              )}
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  );
};

export default BlogManagement;
