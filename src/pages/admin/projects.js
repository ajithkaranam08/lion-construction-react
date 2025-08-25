import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ProjectManagement from '@/components/admin/ProjectManagement';

const ProjectsPage = () => {
  return (
    <AdminLayout title="Project Management">
      <ProjectManagement />
    </AdminLayout>
  );
};

export default ProjectsPage; 