
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Logo from '@/components/Logo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { LogIn } from 'lucide-react';

const LoginPage: React.FC = () => {
  const { allDrivers, login } = useAuth();
  const navigate = useNavigate();
  const [hoveredDriver, setHoveredDriver] = useState<string | null>(null);
  
  const handleLogin = (driverId: string) => {
    login(driverId);
    navigate('/');
  };
  
  return (
    <div className="min-h-screen bg-[#1A252F] flex flex-col items-center justify-center p-4">
      <div className="mb-8 animate-fade-in">
        <Logo size="lg" />
      </div>
      
      <Card className="w-full max-w-2xl border-none overflow-hidden animate-scale-in shadow-lg" style={{background: "linear-gradient(102.3deg, #9379fa 5.9%, #6E59A5 100%)"}}>
        <CardHeader className="text-center text-white pb-2">
          <CardTitle className="text-2xl font-bold">Driver Login</CardTitle>
          <p className="text-gray-200">Select a driver profile to continue</p>
        </CardHeader>
        
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          {allDrivers.map(driver => (
            <div 
              key={driver.id}
              className={`
                bg-white/10 backdrop-blur-sm rounded-lg p-4 cursor-pointer 
                transition-all duration-300 hover:bg-white/20 hover:shadow-xl 
                ${hoveredDriver === driver.id ? 'scale-105' : ''}
              `}
              onMouseEnter={() => setHoveredDriver(driver.id)}
              onMouseLeave={() => setHoveredDriver(null)}
              onClick={() => handleLogin(driver.id)}
            >
              <div className="flex flex-col items-center text-white">
                <Avatar className="h-20 w-20 mb-4 ring-4 ring-white/20">
                  <AvatarImage src={driver.avatarUrl} alt={driver.name} />
                  <AvatarFallback className="bg-primary">{driver.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <h3 className="font-bold text-lg">{driver.name}</h3>
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-yellow-300">★</span>
                  <span>{driver.rating}</span> 
                  <span className="text-xs text-gray-300">({driver.totalRides} rides)</span>
                </div>
                
                <p className="text-xs text-gray-300 mb-4">{driver.carDetails?.model}</p>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full bg-white/20 border-white/30 hover:bg-white/30 text-white"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      
      <p className="mt-8 text-sm text-gray-400 animate-fade-in">
        This is a demo app. Select any driver profile to explore.
      </p>
    </div>
  );
};

export default LoginPage;
