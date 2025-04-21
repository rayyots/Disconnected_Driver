
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// The AuthPage is now unreachable, but if landed here by accident, redirect to /
const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => { navigate('/', { replace: true }); }, [navigate]);
  return null;
};

export default AuthPage;
