import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Badge, ProgressBar, Button } from 'react-bootstrap';
import { 
  FaUsers, 
  FaProjectDiagram, 
  FaBlog, 
  FaEnvelope, 
  FaShoppingCart,
  FaChartLine,
  FaEye,
  FaEdit,
  FaTrash
} from 'react-icons/fa';
import AdminCard from './ui/AdminCard';
import { formatDate } from '@/lib/admin-helpers';

const Dashboard = () => {
  const [stats, setStats] = useState({
    projects: { total: 0, active: 0, completed: 0 },
    blogPosts: { total: 0, published: 0, draft: 0 },
    contacts: { total: 0, new: 0, responded: 0 }
  });
  const [recentData, setRecentData] = useState({
    projects: [],
    blogPosts: [],
    contacts: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
    // Set up real-time updates every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch all data in parallel
      const [projects, blogPosts, contacts] = await Promise.all([
        fetch('/api/projects').then(res => res.json()),
        fetch('/api/blog').then(res => res.json()),
        fetch('/api/contacts').then(res => res.json())
      ]);

      // Calculate statistics
      const projectStats = {
        total: projects.length,
        active: projects.filter(p => p.status === 'IN_PROGRESS').length,
        completed: projects.filter(p => p.status === 'COMPLETED').length
      };

      const blogStats = {
        total: blogPosts.length,
        published: blogPosts.filter(p => p.status === 'PUBLISHED').length,
        draft: blogPosts.filter(p => p.status === 'DRAFT').length
      };

      const contactStats = {
        total: contacts.length,
        new: contacts.filter(c => c.status === 'NEW').length,
        responded: contacts.filter(c => c.status === 'RESPONDED').length
      };

      setStats({
        projects: projectStats,
        blogPosts: blogStats,
        contacts: contactStats
      });

      // Get recent data (last 5 items)
      setRecentData({
        projects: projects.slice(0, 5),
        blogPosts: blogPosts.slice(0, 5),
        contacts: contacts.slice(0, 5)
      });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeVariant = (status) => {
    const variants = {
      'IN_PROGRESS': 'warning',
      'COMPLETED': 'success',
      'DRAFT': 'secondary',
      'PUBLISHED': 'success',
      'NEW': 'info',
      'RESPONDED': 'success',
      'ACTIVE': 'success',
      'OUT_OF_STOCK': 'danger'
    };
    return variants[status] || 'secondary';
  };

  const StatCard = ({ title, value, icon, color, subtitle }) => (
    <Card className="h-100 border-0 shadow-sm">
      <Card.Body className="d-flex align-items-center">
        <div className={`bg-${color} bg-opacity-10 p-3 rounded me-3`}>
          <div className={`text-${color}`}>
            {icon}
          </div>
        </div>
        <div>
          <h3 className="mb-1 fw-bold">{value}</h3>
          <p className="text-muted mb-0 small">{title}</p>
          {subtitle && <small className="text-muted">{subtitle}</small>}
        </div>
      </Card.Body>
    </Card>
  );

  const RecentItem = ({ item, type, onView, onEdit, onDelete }) => (
    <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
      <div className="flex-grow-1">
        <h6 className="mb-1 fw-semibold">{item.title || item.name}</h6>
        <small className="text-muted">
          {type === 'contact' ? item.email : item.category}
        </small>
        <br />
        <small className="text-muted">
          {formatDate(item.createdAt)}
        </small>
      </div>
      <div className="d-flex gap-1">
        <Button size="sm" variant="outline-primary" onClick={() => onView(item)}>
          <FaEye />
        </Button>
        <Button size="sm" variant="outline-warning" onClick={() => onEdit(item)}>
          <FaEdit />
        </Button>
        <Button size="sm" variant="outline-danger" onClick={() => onDelete(item.id)}>
          <FaTrash />
        </Button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="mb-4">
        <h1 className="h3 mb-1">Admin Dashboard</h1>
        <p className="text-muted mb-0">Real-time overview of your Lion Construction platform</p>
      </div>

      {/* Statistics Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <StatCard
            title="Total Projects"
            value={stats.projects.total}
            icon={<FaProjectDiagram size={24} />}
            color="primary"
            subtitle={`${stats.projects.active} active, ${stats.projects.completed} completed`}
          />
        </Col>
        <Col md={3}>
          <StatCard
            title="Blog Posts"
            value={stats.blogPosts.total}
            icon={<FaBlog size={24} />}
            color="success"
            subtitle={`${stats.blogPosts.published} published, ${stats.blogPosts.draft} drafts`}
          />
        </Col>
        <Col md={3}>
          <StatCard
            title="Contact Messages"
            value={stats.contacts.total}
            icon={<FaEnvelope size={24} />}
            color="info"
            subtitle={`${stats.contacts.new} new, ${stats.contacts.responded} responded`}
          />
        </Col>

      </Row>

      {/* Progress Overview */}
      <Row className="mb-4">
        <Col md={6}>
          <AdminCard title="Project Progress" className="h-100">
            <div className="mb-3">
              <div className="d-flex justify-content-between mb-2">
                <span>Active Projects</span>
                <span className="fw-bold">{stats.projects.active}</span>
              </div>
              <ProgressBar 
                variant="warning" 
                now={(stats.projects.active / stats.projects.total) * 100} 
                className="mb-3"
              />
            </div>
            <div className="mb-3">
              <div className="d-flex justify-content-between mb-2">
                <span>Completed Projects</span>
                <span className="fw-bold">{stats.projects.completed}</span>
              </div>
              <ProgressBar 
                variant="success" 
                now={(stats.projects.completed / stats.projects.total) * 100} 
                className="mb-3"
              />
            </div>
            <div className="text-center">
              <Button variant="outline-primary" size="sm" href="/admin/projects">
                View All Projects
              </Button>
            </div>
          </AdminCard>
        </Col>
        <Col md={6}>
          <AdminCard title="Content Overview" className="h-100">
            <div className="mb-3">
              <div className="d-flex justify-content-between mb-2">
                <span>Published Posts</span>
                <span className="fw-bold">{stats.blogPosts.published}</span>
              </div>
              <ProgressBar 
                variant="success" 
                now={(stats.blogPosts.published / stats.blogPosts.total) * 100} 
                className="mb-3"
              />
            </div>
            <div className="mb-3">
              <div className="d-flex justify-content-between mb-2">
                <span>Draft Posts</span>
                <span className="fw-bold">{stats.blogPosts.draft}</span>
              </div>
              <ProgressBar 
                variant="secondary" 
                now={(stats.blogPosts.draft / stats.blogPosts.total) * 100} 
                className="mb-3"
              />
            </div>
            <div className="text-center">
              <Button variant="outline-success" size="sm" href="/admin/blog">
                Manage Blog
              </Button>
            </div>
          </AdminCard>
        </Col>
      </Row>

      {/* Recent Data */}
      <Row>
        <Col md={6}>
          <AdminCard title="Recent Projects" className="h-100">
            {recentData.projects.length > 0 ? (
              recentData.projects.map((project) => (
                <RecentItem
                  key={project.id}
                  item={project}
                  type="project"
                  onView={(item) => console.log('View project:', item)}
                  onEdit={(item) => console.log('Edit project:', item)}
                  onDelete={(id) => console.log('Delete project:', id)}
                />
              ))
            ) : (
              <p className="text-muted text-center py-3">No projects yet</p>
            )}
          </AdminCard>
        </Col>
        <Col md={6}>
          <AdminCard title="Recent Blog Posts" className="h-100">
            {recentData.blogPosts.length > 0 ? (
              recentData.blogPosts.map((post) => (
                <RecentItem
                  key={post.id}
                  item={post}
                  type="blog"
                  onView={(item) => console.log('View post:', item)}
                  onEdit={(item) => console.log('Edit post:', item)}
                  onDelete={(id) => console.log('Delete post:', id)}
                />
              ))
            ) : (
              <p className="text-muted text-center py-3">No blog posts yet</p>
            )}
          </AdminCard>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={6}>
          <AdminCard title="Recent Contacts" className="h-100">
            {recentData.contacts.length > 0 ? (
              recentData.contacts.map((contact) => (
                <RecentItem
                  key={contact.id}
                  item={contact}
                  type="contact"
                  onView={(item) => console.log('View contact:', item)}
                  onEdit={(item) => console.log('Edit contact:', item)}
                  onDelete={(id) => console.log('Delete contact:', id)}
                />
              ))
            ) : (
              <p className="text-muted text-center py-3">No contacts yet</p>
            )}
          </AdminCard>
        </Col>

      </Row>

      {/* Quick Actions */}
      <Row className="mt-4">
        <Col md={12}>
          <AdminCard title="Quick Actions">
            <Row>
              <Col md={3}>
                <Button variant="outline-primary" className="w-100 mb-2" href="/admin/projects">
                  <FaProjectDiagram className="me-2" />
                  Manage Projects
                </Button>
              </Col>
              <Col md={3}>
                <Button variant="outline-success" className="w-100 mb-2" href="/admin/blog">
                  <FaBlog className="me-2" />
                  Manage Blog
                </Button>
              </Col>
              <Col md={3}>
                <Button variant="outline-info" className="w-100 mb-2" href="/admin/contacts">
                  <FaEnvelope className="me-2" />
                  View Contacts
                </Button>
              </Col>

            </Row>
          </AdminCard>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
