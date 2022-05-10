import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAdmin }) => {
  const state = useSelector((state) => state.userAuthReducer);
  console.log(state);
  const { isAuthenticated, user } = state;

  if (isAdmin && user.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  return <>{isAuthenticated ? children : <Navigate to="/login" />}</>;
};

export default ProtectedRoute;
