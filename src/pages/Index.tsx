
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      // Redirect based on authentication status
      navigate(isAuthenticated ? '/home' : '/auth');
    }
  }, [isLoading, isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1A252F]">
      <div className="text-center text-white">
        <p>Redirecting...</p>
      </div>
    </div>
  );
};

export default Index;
