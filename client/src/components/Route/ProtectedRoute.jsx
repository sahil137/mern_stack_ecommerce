import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const state = useSelector((state) => state.userAuthReducer);
  const { isAuthenticated } = state;

  return <>{isAuthenticated ? children : <Navigate to="/login" />}</>;
};

export default ProtectedRoute;
