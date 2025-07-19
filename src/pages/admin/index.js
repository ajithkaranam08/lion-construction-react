import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, Row, Col, Table } from 'react-bootstrap';
import { FaUsers, FaNewspaper, FaImages, FaEye, FaChartLine } from 'react-icons/fa';

const AdminDashboard = () => {
  const { products } = useSelector((state) => state.product);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    setStats({
      totalProducts: products.length,
      totalOrders: cartItems.length,
      totalUsers: 150, // Demo data
      totalRevenue: 25000 // Demo data
    });
  }, [products, cartItems]);

  const recentActivities = [
    { id: 1, action: 'New product added', time: '2 hours ago', type: 'product' },
    { id: 2, action: 'SEO updated for homepage', time: '4 hours ago', type: 'seo' },
    { id: 3, action: 'New user registered', time: '6 hours ago', type: 'user' },
    { id: 4, action: 'Blog post published', time: '1 day ago', type: 'blog' },
  ];

  const StatCard = ({ title, value, icon: Icon, color = "primary" }) => (
    <Card className="h-100">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h6 className="text-muted mb-1">{title}</h6>
            <h3 className="mb-0">{value}</h3>
          </div>
          <div className={`text-${color}`}>
            <Icon size={24} />
          </div>
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <AdminLayout title="Dashboard">
      <Row className="mb-4">
        <Col md={3} className="mb-3">
          <StatCard 
            title="Total Products" 
            value={stats.totalProducts} 
            icon={FaImages} 
            color="primary" 
          />
        </Col>
        <Col md={3} className="mb-3">
          <StatCard 
            title="Total Orders" 
            value={stats.totalOrders} 
            icon={FaChartLine} 
            color="success" 
          />
        </Col>
        <Col md={3} className="mb-3">
          <StatCard 
            title="Total Users" 
            value={stats.totalUsers} 
            icon={FaUsers} 
            color="info" 
          />
        </Col>
        <Col md={3} className="mb-3">
          <StatCard 
            title="Revenue" 
            value={`$${stats.totalRevenue.toLocaleString()}`} 
            icon={FaChartLine} 
            color="warning" 
          />
        </Col>
      </Row>

      <Row>
        <Col lg={8} className="mb-4">
          <Card>
            <Card.Header>
              <h5 className="mb-0">Recent Products</h5>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Location</th>
                    <th>Price</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {products.slice(0, 5).map((product) => (
                    <tr key={product.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <img 
                            src={product.productImg} 
                            alt={product.title}
                            width="40" 
                            height="40" 
                            className="rounded me-2"
                            style={{ objectFit: 'cover' }}
                          />
                          <span>{product.title}</span>
                        </div>
                      </td>
                      <td>{product.locantion}</td>
                      <td>${product.price}</td>
                      <td>
                        <span className={`badge ${product.featured ? 'bg-success' : 'bg-secondary'}`}>
                          {product.featured ? 'Featured' : 'Regular'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4} className="mb-4">
          <Card>
            <Card.Header>
              <h5 className="mb-0">Recent Activities</h5>
            </Card.Header>
            <Card.Body>
              <div className="list-group list-group-flush">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="list-group-item border-0 px-0">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <p className="mb-1">{activity.action}</p>
                        <small className="text-muted">{activity.time}</small>
                      </div>
                      <span className={`badge bg-${
                        activity.type === 'product' ? 'primary' :
                        activity.type === 'seo' ? 'info' :
                        activity.type === 'user' ? 'success' : 'warning'
                      }`}>
                        {activity.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default AdminDashboard;