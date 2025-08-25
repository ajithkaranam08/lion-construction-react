// Admin Helper Functions
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

export const validateForm = (formData, requiredFields) => {
  const errors = {};
  requiredFields.forEach(field => {
    if (!formData[field] || formData[field].trim() === '') {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }
  });
  return errors;
};

export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

export const loadFromLocalStorage = (key, defaultValue = []) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
};

export const deleteFromLocalStorage = (key, id) => {
  try {
    const data = loadFromLocalStorage(key);
    const filteredData = data.filter(item => item.id !== id);
    saveToLocalStorage(key, filteredData);
    return true;
  } catch (error) {
    console.error('Error deleting from localStorage:', error);
    return false;
  }
};

export const updateInLocalStorage = (key, id, updatedData) => {
  try {
    const data = loadFromLocalStorage(key);
    const updatedItems = data.map(item => 
      item.id === id ? { ...item, ...updatedData } : item
    );
    saveToLocalStorage(key, updatedItems);
    return true;
  } catch (error) {
    console.error('Error updating localStorage:', error);
    return false;
  }
};

export const getStatusBadgeVariant = (status) => {
  const variants = {
    published: 'success',
    draft: 'warning',
    archived: 'secondary',
    pending: 'info'
  };
  return variants[status] || 'secondary';
};

export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const generateId = () => {
  return Date.now() + Math.random().toString(36).substr(2, 9);
};
