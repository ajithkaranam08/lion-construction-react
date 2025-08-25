import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import BlogManagement from '@/components/admin/BlogManagement';

const BlogPage = () => {
  return (
    <AdminLayout title="Blog Management">
      <BlogManagement />
    </AdminLayout>
  );
};

export default BlogPage;