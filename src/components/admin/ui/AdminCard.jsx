import React from 'react';
import { Card } from 'react-bootstrap';

const AdminCard = ({ 
  children, 
  title, 
  subtitle, 
  className = '', 
  headerAction,
  footer,
  loading = false 
}) => {
  return (
    <Card className={`admin-card shadow-sm border-0 ${className}`}>
      {(title || headerAction) && (
        <Card.Header className="bg-white border-bottom d-flex justify-content-between align-items-center py-3">
          <div>
            {title && <Card.Title className="mb-0 fw-bold text-dark">{title}</Card.Title>}
            {subtitle && <small className="text-muted">{subtitle}</small>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </Card.Header>
      )}
      
      <Card.Body className="p-4">
        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          children
        )}
      </Card.Body>
      
      {footer && (
        <Card.Footer className="bg-light border-top py-3">
          {footer}
        </Card.Footer>
      )}
    </Card>
  );
};

export default AdminCard;
