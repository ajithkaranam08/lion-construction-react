import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const AdminModal = ({
  show,
  onHide,
  title,
  children,
  size = 'lg',
  footer,
  loading = false,
  onSave,
  saveText = 'Save',
  cancelText = 'Cancel',
  saveVariant = 'primary',
  showFooter = true
}) => {
  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      size={size}
      centered
      backdrop="static"
    >
      <Modal.Header closeButton className="bg-light">
        <Modal.Title className="fw-bold">{title}</Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="p-4">
        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          children
        )}
      </Modal.Body>
      
      {showFooter && (
        <Modal.Footer className="bg-light border-top">
          {footer ? (
            footer
          ) : (
            <>
              <Button variant="outline-secondary" onClick={onHide}>
                {cancelText}
              </Button>
              {onSave && (
                <Button 
                  variant={saveVariant} 
                  onClick={onSave}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Saving...
                    </>
                  ) : (
                    saveText
                  )}
                </Button>
              )}
            </>
          )}
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default AdminModal;
