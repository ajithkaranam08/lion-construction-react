import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '@/store/slices/auth-slice';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  
  const { isLoading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  // Demo credentials - in production, this should be handled by a proper authentication system
  const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    // Simulate API call delay
    setTimeout(() => {
      if (
        formData.username === ADMIN_CREDENTIALS.username && 
        formData.password === ADMIN_CREDENTIALS.password
      ) {
        dispatch(loginSuccess({
          id: 1,
          name: 'Admin User',
          username: formData.username,
          role: 'admin'
        }));
        router.push('/admin');
      } else {
        dispatch(loginFailure('Invalid username or password'));
      }
    }, 1000);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <Card className="shadow">
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <img src="/img/logo.png" alt="Logo" width="80" height="80" className="mb-3" />
                  <h3>Admin Login</h3>
                  <p className="text-muted">Sign in to access the admin panel</p>
                </div>

                {error && (
                  <Alert variant="danger" className="mb-3">
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter username"
                        required
                        className="ps-5"
                      />
                      <FaUser className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        required
                        className="ps-5 pe-5"
                      />
                      <FaLock className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                      <button
                        type="button"
                        className="btn btn-link position-absolute top-50 end-0 translate-middle-y me-2 p-0 border-0"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </Form.Group>

                  <Button 
                    type="submit" 
                    variant="primary" 
                    className="w-100 mb-3"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </Form>

                {/* <div className="text-center">
                  <small className="text-muted">
                    Demo credentials: admin / admin123
                  </small>
                </div> */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminLogin;