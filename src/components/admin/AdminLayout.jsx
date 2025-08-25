import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { logout } from '@/store/slices/auth-slice';
import { 
  FaHome, 
  FaUsers, 
  FaCog, 
  FaSignOutAlt, 
  FaBars, 
  FaTimes,
  FaSearch,
  FaNewspaper,
  FaImages,
  FaTools
} from 'react-icons/fa';

const AdminLayout = ({ children, title = "Admin Dashboard" }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/admin/login');
  };

  const menuItems = [
    { href: '/admin', icon: FaHome, label: 'Dashboard' },
    { href: '/admin/seo', icon: FaSearch, label: 'SEO Management' },
    { href: '/admin/projects', icon: FaImages, label: 'Projects' },
    { href: '/admin/blog', icon: FaNewspaper, label: 'Blog Posts' },
    { href: '/admin/settings', icon: FaCog, label: 'Settings' },
  ];

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-vh-100 d-flex">
      {/* Sidebar */}
      <div className={`bg-dark text-white ${sidebarOpen ? 'd-block' : 'd-none d-lg-block'}`} style={{ width: '250px', minHeight: '100vh' }}>
        <div className="p-3 border-bottom border-secondary">
          <h5 className="mb-0 text-white">Admin Panel</h5>
        </div>
        
        <nav className="p-3">
          <ul className="list-unstyled">
            {menuItems.map((item) => (
              <li key={item.href} className="mb-2">
                <Link 
                  href={item.href}
                  className={`d-flex align-items-center text-decoration-none text-white p-2 rounded ${
                    router.pathname === item.href ? 'bg-primary' : 'hover-bg-secondary'
                  }`}
                  style={{ transition: 'background-color 0.2s' }}
                  onMouseEnter={(e) => {
                    if (router.pathname !== item.href) {
                      e.target.style.backgroundColor = '#495057';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (router.pathname !== item.href) {
                      e.target.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <item.icon className="me-2" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto p-3 border-top border-secondary">
          <button 
            onClick={handleLogout}
            className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center"
          >
            <FaSignOutAlt className="me-2" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1">
        {/* Header */}
        <header className="bg-white shadow-sm border-bottom p-3 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <button 
              className="btn btn-outline-secondary d-lg-none me-3"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
            <h4 className="mb-0">{title}</h4>
          </div>
          
          <div className="d-flex align-items-center">
            <span className="me-3">Welcome, {user?.name || 'Admin'}</span>
            <div className="dropdown">
              <button 
                className="btn btn-outline-secondary dropdown-toggle" 
                type="button" 
                data-bs-toggle="dropdown"
              >
                Profile
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#" onClick={handleLogout}>Logout</a></li>
              </ul>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-lg-none"
          style={{ zIndex: 1040 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;