
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

// Redirect to the right page based on authentication status
const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    navigate(isAuthenticated ? '/' : '/login', { replace: true });
  }, [isAuthenticated, navigate]);
  
  return null;
};

export default AuthPage;
