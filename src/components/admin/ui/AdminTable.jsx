import React from 'react';
import { Table, Badge, Button, Dropdown } from 'react-bootstrap';
import { FaEdit, FaTrash, FaEye, FaEllipsisV } from 'react-icons/fa';

const AdminTable = ({ 
  data, 
  columns, 
  actions = [], 
  onEdit, 
  onDelete, 
  onView,
  loading = false,
  emptyMessage = "No data available"
}) => {
  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-4 text-muted">
        <i className="fas fa-inbox fa-3x mb-3"></i>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <Table className="admin-table mb-0">
        <thead className="bg-light">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="border-0 py-3 px-3">
                {column.label}
              </th>
            ))}
            {actions.length > 0 && (
              <th className="border-0 py-3 px-3 text-end" style={{ width: '100px' }}>
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={row.id || rowIndex} className="border-bottom">
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="py-3 px-3 align-middle">
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
              {actions.length > 0 && (
                <td className="py-3 px-3 text-end">
                  <Dropdown>
                    <Dropdown.Toggle 
                      variant="outline-secondary" 
                      size="sm"
                      className="border-0 bg-transparent"
                    >
                      <FaEllipsisV />
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="end">
                      {onView && (
                        <Dropdown.Item onClick={() => onView(row)}>
                          <FaEye className="me-2" />
                          View
                        </Dropdown.Item>
                      )}
                      {onEdit && (
                        <Dropdown.Item onClick={() => onEdit(row)}>
                          <FaEdit className="me-2" />
                          Edit
                        </Dropdown.Item>
                      )}
                      {onDelete && (
                        <Dropdown.Item 
                          onClick={() => onDelete(row.id || rowIndex)}
                          className="text-danger"
                        >
                          <FaTrash className="me-2" />
                          Delete
                        </Dropdown.Item>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminTable;
