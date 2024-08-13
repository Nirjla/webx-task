import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component }) => {
      const isAuthenticated = !!localStorage.getItem('token'); // Check for token or authentication status

      return isAuthenticated ? Component : <Navigate to="/login" />;
};

export default ProtectedRoute;
