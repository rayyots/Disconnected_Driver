
import React from 'react';
import Logo from '@/components/Logo';
import PhoneLoginForm from '@/components/PhoneLoginForm';

const AuthPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#1A252F] bg-gradient-to-br from-[#1A252F] to-[#0F1923] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto flex flex-col items-center">
        <div className="mb-8 animate-fade-in">
          <Logo size="lg" />
        </div>
        
        <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-xl p-8 w-full">
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
