
import React from 'react';
import AppLayout from '@/components/AppLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Car, 
  Map, 
  MapPin, 
  Phone, 
  Mail, 
  Star, 
  Clock, 
  LogOut
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

const ProfilePage: React.FC = () => {
  const { driver, logout } = useAuth();
  
  if (!driver) {
    return <div>Loading...</div>;
  }
  
  const handleLogout = () => {
    logout();
  };
  
  return (
    <AppLayout title="Profile">
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-[#00C4CC] flex items-center justify-center">
            <span className="text-xl font-bold text-white">
              {driver.name.charAt(0)}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{driver.name}</h2>
            <div className="flex items-center text-yellow-400">
              <Star className="w-4 h-4 mr-1" />
              <span>{driver.rating} Rating</span>
            </div>
          </div>
        </div>
        
        {/* Driver Info Card */}
        <Card className="bg-gray-800 border-gray-700 text-white">
          <CardHeader>
            <CardTitle>Driver Information</CardTitle>
            <CardDescription className="text-gray-400">
              Your personal and vehicle details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <p>{driver.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p>{driver.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Total Rides</p>
                    <p>{driver.totalRides}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Car className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Vehicle Model</p>
                    <p>{driver.vehicle?.model || 'Not specified'}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 rounded-full bg-gray-400" style={{backgroundColor: driver.vehicle?.color.toLowerCase()}} />
                  <div>
                    <p className="text-sm text-gray-400">Vehicle Color</p>
                    <p>{driver.vehicle?.color || 'Not specified'}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">License Plate</p>
                    <p>{driver.vehicle?.plateNumber || 'Not specified'}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              variant="destructive" 
              className="w-full" 
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log Out
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
};

export default ProfilePage;
