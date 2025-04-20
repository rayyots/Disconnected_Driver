
import React from 'react';
import AppLayout from '@/components/AppLayout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { User, Settings } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { driver, logout } = useAuth();
  
  if (!driver) {
    return <div>Loading...</div>;
  }
  
  return (
    <AppLayout title="Profile">
      <div className="space-y-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <div className="bg-gray-700 p-4 rounded-full">
              <User className="h-8 w-8 text-[#00C4CC]" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white">{driver.name}</h3>
              <p className="text-gray-400">{driver.phone}</p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-3 bg-gray-700 rounded-lg">
                <p className="text-gray-400 text-sm">Driver Rating</p>
                <p className="text-white font-bold text-xl">{driver.rating}★</p>
              </div>
              <div className="p-3 bg-gray-700 rounded-lg">
                <p className="text-gray-400 text-sm">Total Rides</p>
                <p className="text-white font-bold text-xl">{driver.totalRides}</p>
              </div>
            </div>
            
            {driver.carDetails && (
              <div className="mt-6">
                <h4 className="text-white font-medium mb-3">Vehicle Information</h4>
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-y-3">
                    <div>
                      <p className="text-gray-400 text-sm">Model</p>
                      <p className="text-white">{driver.carDetails.model}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Color</p>
                      <p className="text-white">{driver.carDetails.color}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Plate Number</p>
                      <p className="text-white">{driver.carDetails.plateNumber}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Button 
          variant="destructive" 
          className="w-full"
          onClick={logout}
        >
          Log Out
        </Button>
      </div>
    </AppLayout>
  );
};

export default ProfilePage;
