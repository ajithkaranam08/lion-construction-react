import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, Row, Col, Table, Button, Modal, Form, Badge } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';

const BlogManagement = () => {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    status: 'draft',
    category: '',
    tags: '',
    featuredImage: ''
  });

  useEffect(() => {
    // Load blog posts from localStorage or API
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      // Demo data
      setPosts([
        {
          id: 1,
          title: 'Construction Best Practices',
          excerpt: 'Learn about the best practices in modern construction...',
          status: 'published',
          category: 'Construction',
          author: 'Admin',
          createdAt: '2024-01-15',
          views: 150
        },
        {
          id: 2,
          title: 'Interior Design Trends 2024',
          excerpt: 'Discover the latest trends in interior design...',
          status: 'draft',
          category: 'Interior Design',
          author: 'Admin',
          createdAt: '2024-01-10',
          views: 0
        }
      ]);
    }
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newPost = {
      ...formData,
      id: editingPost ? editingPost.id : Date.now(),
      author: 'Admin',
      createdAt: editingPost ? editingPost.createdAt : new Date().toISOString().split('T')[0],
      views: editingPost ? editingPost.views : 0
    };

    let updatedPosts;
    if (editingPost) {
      updatedPosts = posts.map(post => post.id === editingPost.id ? newPost : post);
    } else {
      updatedPosts = [...posts, newPost];
    }

    setPosts(updatedPosts);
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    
    setShowModal(false);
    setEditingPost(null);
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      status: 'draft',
      category: '',
      tags: '',
      featuredImage: ''
    });
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setFormData(post);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      const updatedPosts = posts.filter(post => post.id !== id);
      setPosts(updatedPosts);
      localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      published: 'success',
      draft: 'warning',
      archived: 'secondary'
    };
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
  };

  return (
    <AdminLayout title="Blog Management">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Blog Posts</h4>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          <FaPlus className="me-2" />
          Add New Post
        </Button>
      </div>

      <Card>
        <Card.Body>
          <Table responsive>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Author</th>
                <th>Date</th>
                <th>Views</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>
                    <div>
                      <strong>{post.title}</strong>
                      <br />
                      <small className="text-muted">{post.excerpt}</small>
                    </div>
                  </td>
                  <td>{post.category}</td>
                  <td>{getStatusBadge(post.status)}</td>
                  <td>{post.author}</td>
                  <td>{post.createdAt}</td>
                  <td>{post.views}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button size="sm" variant="outline-primary" onClick={() => handleEdit(post)}>
                        <FaEdit />
                      </Button>
                      <Button size="sm" variant="outline-danger" onClick={() => handleDelete(post.id)}>
                        <FaTrash />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingPost ? 'Edit Post' : 'Add New Post'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Excerpt</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={formData.excerpt}
                onChange={(e) => handleInputChange('excerpt', e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                  >
                    <option value="">Select Category</option>
                    <option value="Construction">Construction</option>
                    <option value="Interior Design">Interior Design</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Tips">Tips</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

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
                type="text"
                value={formData.featuredImage}
                onChange={(e) => handleInputChange('featuredImage', e.target.value)}
                placeholder="/img/blog/example.jpg"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {editingPost ? 'Update Post' : 'Create Post'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </AdminLayout>
  );
};

export default BlogManagement;