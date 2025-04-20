
import React, { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import Logo from './Logo';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Navigation, Calendar, Settings, Bell } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface AppLayoutProps {
  children: ReactNode;
  title: string;
  showBottomNav?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ 
  children, 
  title,
  showBottomNav = true 
}) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const handleNavigation = (path: string) => {
    navigate(path);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-[#1A252F]">
      {/* Header */}
      <header className="bg-gray-900 p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center">
          <Logo size="sm" />
        </div>
        
        <div className="flex items-center gap-2">
          {!isMobile && (
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white hover:bg-gray-800"
              onClick={() => handleNavigation('/profile')}
            >
              <User className="h-5 w-5 mr-2" />
              Profile
            </Button>
          )}
          <Button 
            variant="ghost" 
            size="sm"
            className="text-white hover:bg-gray-800"
            onClick={logout}
          >
            Log Out
          </Button>
        </div>
      </header>
      
      {/* Page content */}
      <main className="flex-1 p-4 max-w-3xl mx-auto w-full">
        <h1 className="text-2xl font-bold text-white mb-4">{title}</h1>
        {children}
      </main>
      
      {/* Bottom navigation for mobile */}
      {showBottomNav && (
        <nav className="bg-gray-900 px-2 py-3 shadow-lg">
          <div className="flex justify-around items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex flex-col items-center text-gray-400 hover:text-white hover:bg-transparent px-1"
              onClick={() => handleNavigation('/')}
            >
              <Navigation className="h-5 w-5 mb-1" />
              <span className="text-xs">Home</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex flex-col items-center text-gray-400 hover:text-white hover:bg-transparent px-1"
              onClick={() => handleNavigation('/earnings')}
            >
              <Calendar className="h-5 w-5 mb-1" />
              <span className="text-xs">Earnings</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex flex-col items-center text-gray-400 hover:text-white hover:bg-transparent px-1"
              onClick={() => handleNavigation('/profile')}
            >
              <User className="h-5 w-5 mb-1" />
              <span className="text-xs">Profile</span>
            </Button>
          </div>
        </nav>
      )}
    </div>
  );
};

export default AppLayout;
