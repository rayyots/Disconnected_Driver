
import React from 'react';
import Logo from '@/components/Logo';
import PhoneLoginForm from '@/components/PhoneLoginForm';

const AuthPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#1A252F] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto flex flex-col items-center">
        <div className="mb-8 animate-fade-in">
          <Logo size="lg" />
        </div>
        
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full">
          <h1 className="text-2xl font-bold text-white text-center mb-6">Driver Login</h1>
          <PhoneLoginForm />
        </div>
        
        <p className="mt-8 text-gray-400 text-sm text-center">
          The driver app for Disconnected ride-hailing platform
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
