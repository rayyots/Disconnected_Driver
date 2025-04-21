
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useRide } from '@/contexts/RideContext';

const EarningsSummary: React.FC = () => {
  const { driver } = useAuth();
  const { rideHistory } = useRide();
  
  // Calculate earnings for different time periods
  const todayEarnings = rideHistory
    .filter(ride => {
      const today = new Date();
      const rideDate = new Date(ride.endTime || new Date());
      return (
        rideDate.getDate() === today.getDate() &&
        rideDate.getMonth() === today.getMonth() &&
        rideDate.getFullYear() === today.getFullYear()
      );
    })
    .reduce((sum, ride) => sum + ride.fare, 0);
    
  const weekEarnings = rideHistory
    .filter(ride => {
      const today = new Date();
      const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const rideDate = new Date(ride.endTime || new Date());
      return rideDate >= lastWeek;
    })
    .reduce((sum, ride) => sum + ride.fare, 0);
  
  // Default value if driver.earnings is undefined
  const totalEarnings = driver?.earnings || 0;
  
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="pb-2">
        <h3 className="text-lg font-medium text-white">Earnings Summary</h3>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-gray-700 rounded-lg">
            <p className="text-gray-400 text-sm">Today</p>
            <p className="text-white font-bold text-xl">${todayEarnings.toFixed(2)}</p>
          </div>
          <div className="p-3 bg-gray-700 rounded-lg">
            <p className="text-gray-400 text-sm">This Week</p>
            <p className="text-white font-bold text-xl">${weekEarnings.toFixed(2)}</p>
          </div>
          <div className="p-3 bg-gray-700 rounded-lg">
            <p className="text-gray-400 text-sm">Total Earnings</p>
            <p className="text-white font-bold text-xl">${totalEarnings.toFixed(2)}</p>
          </div>
          <div className="p-3 bg-gray-700 rounded-lg">
            <p className="text-gray-400 text-sm">Completed Rides</p>
            <p className="text-white font-bold text-xl">{driver?.totalRides || 0}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EarningsSummary;
