
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the appropriate route
    navigate('/auth');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1A252F]">
      <div className="text-center text-white">
        <p>Redirecting...</p>
      </div>
    </div>
  );
};

export default Index;
