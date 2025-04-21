
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useRide } from '@/contexts/RideContext';

const EarningsSummary: React.FC = () => {
  const { driver } = useAuth();
  const { rideHistory } = useRide();
  const [animateCounts, setAnimateCounts] = useState(false);
  
  // Trigger animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateCounts(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Calculate earnings for different time periods
  const todayEarnings = rideHistory
    .filter(ride => {
      const today = new Date();
      const rideDate = new Date(ride.date || new Date());
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
      const rideDate = new Date(ride.date || new Date());
      return rideDate >= lastWeek;
    })
    .reduce((sum, ride) => sum + ride.fare, 0);
  
  // Default value if driver.earnings is undefined
  const totalEarnings = driver?.earnings || 0;
  
  return (
    <Card className="bg-gradient-to-br from-[#191F2C] to-[#1A252F] border-gray-700 overflow-hidden shadow-lg">
      <CardHeader className="pb-2">
        <h3 className="text-lg font-medium text-white relative">
          Earnings Summary
          <span className="absolute bottom-0 left-0 w-1/4 h-1 bg-[#9b87f5] rounded-full"></span>
        </h3>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div 
            className={`p-4 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg transform transition-all duration-500 ${
              animateCounts ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <p className="text-gray-400 text-sm">Today</p>
            <p className="text-white font-bold text-xl">EGP {todayEarnings.toFixed(2)}</p>
          </div>
          <div 
            className={`p-4 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg transform transition-all duration-500 ${
              animateCounts ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <p className="text-gray-400 text-sm">This Week</p>
            <p className="text-white font-bold text-xl">EGP {weekEarnings.toFixed(2)}</p>
          </div>
          <div 
            className={`p-4 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg transform transition-all duration-500 ${
              animateCounts ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <p className="text-gray-400 text-sm">Total Earnings</p>
            <p className="text-white font-bold text-xl"> EGP {totalEarnings.toFixed(2)}</p>
          </div>
          <div 
            className={`p-4 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg transform transition-all duration-500 ${
              animateCounts ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <p className="text-gray-400 text-sm">Completed Rides</p>
            <p className="text-white font-bold text-xl">{driver?.totalRides || 0}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EarningsSummary;
