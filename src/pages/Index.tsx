
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Logo from '@/components/Logo';

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1A252F] bg-gradient-to-br from-[#1A252F] to-[#0F1923]">
      <div className="text-center animate-pulse">
        <Logo size="lg" />
        <div className="mt-8 text-white">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#00C4CC] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-gray-300">Loading...</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
